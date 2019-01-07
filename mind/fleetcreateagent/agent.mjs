import fs from 'fs';
import Service from './service';
import path from 'path';
import child_process from 'child_process';
import rimraf from 'rimraf';
let exec = child_process.exec;
let spawn = child_process.spawn;
const AGENT_CONFIG = 'agent.json';
import azure from 'azure-storage'
const AGENT_RENDER_FOLDER = '../blender';
function log(are) {
    console.log(are);
}
export class Agent {
    constructor(id) {
        this.id = id;
        console.log('creating service')
        this.service = Service(null, null, null);
    }
    getShipMaterial(id) {
        var me = this;
        return me.service.post('api/ship/get/ship/material', id);
    }
    getShipModel(id) {
        var me = this;
        return me.service.post('api/ship/get/ship/model', id);
    }
    start() {
        var me = this;
        log("checking if should make a ship");
        return me.service.post("api/ship/should/make", this.id).then(res => {
            var shipResource = null;
            var materialResource = null;
            if (res) {
                return me.createShip().then(shipResult => {
                    log('requesting upload endpoint');
                    return me.service.post('api/shipresource/request/upload', {
                        agentKey: me.id,
                        fileName: shipResult.filename,
                        fileType: 'obj',
                        owner: me.id
                    }).then(resource => {
                        shipResource = resource;
                        log('received upload endpoint');
                        console.log(resource);
                        var host = resource.endpoint.substring(0, resource.endpoint.lastIndexOf(resource.id));
                        return me.upload({
                            host: host,
                            _container: resource.id,
                            endpoint: resource.endpoint,
                            fileName: `${resource.storageId}`,
                            filePath: path.join(path.resolve(path.dirname('')), AGENT_RENDER_FOLDER, shipResult.filename)
                        })
                    }).then(() => {
                        return me.service.post('api/shipresource/request/upload', {
                            agentKey: me.id,
                            fileName: shipResult.materialFile,
                            fileType: 'mtl',
                            owner: me.id
                        }).then(resource => {
                            materialResource = resource;
                            log('received upload endpoint');
                            console.log(resource);
                            var host = resource.endpoint.substring(0, resource.endpoint.lastIndexOf(resource.id));
                            return me.upload({
                                host: host,
                                _container: resource.id,
                                endpoint: resource.endpoint,
                                fileName: `${resource.storageId}`,
                                filePath: path.join(path.resolve(path.dirname('')), AGENT_RENDER_FOLDER, shipResult.filename)
                            })
                        })
                    }).then(() => {
                        var attributes = me.readJson(`${AGENT_RENDER_FOLDER}/${shipResult.attributes}`);
                        // create ship
                        // shipResource.owner = null;
                        // materialResource.upload.owner = null;
                        console.log(attributes);
                        var ship = {
                            agentId: me.id,
                            material: materialResource,
                            maerialResource: materialResource.id,
                            model: shipResource,
                            modelResource: shipResource.id,
                            attributes
                        };
                        return me.service.post('api/ship/create', ship).then(createdship => {
                            console.log(createdship);
                        }).then(() => {
                            return me.deleteFile(`${AGENT_RENDER_FOLDER}/${shipResult.attributes}`)
                        }).then(() => {
                            return me.deleteFile(`${AGENT_RENDER_FOLDER}/${shipResult.filename}`)
                        }).then(() => {
                            return me.deleteFile(`${AGENT_RENDER_FOLDER}/${shipResult.materialFile}`)
                        })

                    })
                });
            }
            console.log(res);
        }).catch(e => {
            console.log(e);
        })
    }
    repeat(waittime) {
        return this.start().catch(e => { console.log(e); }).then(res => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, waittime || 10 * 1000)
            }).then(this.repeat.bind(this, waittime));
        })
    }
    createShip() {
        var me = this;
        return Promise.resolve().then(() => {
            log('read config');
            return me.readConfig();
        }).then(config => {
            if (!config.randomSeed) {
                config.randomSeed = 1;
            }
            else {
                config.randomSeed++;
            }

            log('save updated config');
            return me.writeConfig(config).then(() => {
                return config;
            });
        }).then(config => {
            var cmd = `blender`;
            var filename = 'generated-ship-' + config.randomSeed + '.obj';
            var attributes = 'generated-ship-' + config.randomSeed + '.obj_.json';
            var materialFile = 'generated-ship-' + config.randomSeed + '.mtl';
            var blenderspawnargs = ['-b',
                'Shipwright.0006.blend',
                '--background',
                '-P',
                'generateship.py',
                '--',
                config.randomSeed,
                config.limit || 50,
                config.percentile || 60,
                filename];
            return me.executeSpawnCmd(cmd, blenderspawnargs, { detached: true, cwd: AGENT_RENDER_FOLDER }).then(res => {
                return {
                    filename,
                    attributes,
                    materialFile,
                    randomSeed: config.randomSeed
                }
            });;
        })
    }
    getShips() {
        var seconds = 1000;
        var minutes = seconds * 60;
        var hours = minutes * 60;
        var day = hours * 24;
        return this.service.post('api/ship/get/ships', {
            start: new Date(Date.now() - day),
            end: new Date(Date.now())
        });
    }
    deleteFile(folder) {
        return new Promise(function (resolve, fail) {
            rimraf(folder, { disableGlob: true }, (err) => {
                console.log('deleted  : ' + folder)
                if (err) {
                    console.log('clear target folder error');
                    console.log(err);
                    fail();
                    return;
                }
                console.log('successfully cleared target folder' + folder);
                resolve();
            });
            // console.log('del /s /q "' + folder + '"')
            // return executeCmd('del /s /q "' + folder + '"')
            //return delFiles.promise([foldify(folder) + '*'], { force: true });
        });
    }

    readConfig() {
        var me = this;
        if (me.directoryExists(AGENT_CONFIG)) {
            var file = fs.readFileSync(`./${AGENT_CONFIG}`, "utf8");
            return JSON.parse(file);
        }
        return me.writeFileTo('./', AGENT_CONFIG, JSON.stringify({})).then(() => {
            return {};
        });
    }
    readJson(file) {
        var me = this;
        if (me.directoryExists(file)) {
            var file = fs.readFileSync(file, "utf8");
            return JSON.parse(file);
        }
        return null;
    }
    writeConfig(config) {
        return this.writeFileTo('./', AGENT_CONFIG, JSON.stringify(config));
    }
    writeFileTo(targetFolder, fileName, text) {
        return new Promise(function (resolve, fail) {
            //resolve();
            fs.writeFile(targetFolder ? path.join(targetFolder, fileName) : fileName, text, (err) => {
                if (err) {
                    console.log('couldnt write file ')
                    fail(error);
                }
                console.log('wrote : ' + fileName);
                resolve({ success: true, file: fileName })
            });
            // var wstream = fs.createWriteStream(targetFolder ? targetFolder + fileName : fileName);
            // wstream.write(text);
            // wstream.end();
            // resolve({ success: true, file: fileName })
        });
    }
    directoryExists(dir) {
        if (!fs.existsSync(dir)) {
            console.log('doesnt exist : ' + dir)
            return false;
        }
        return true;
    }
    ensureDirectory(dir) {
        return new Promise(function (resolve, fail) {
            if (!fs.existsSync(dir)) {
                console.log('doesnt exist : ' + dir);
            }
            mkdirp(dir, function (err) {
                if (err) {
                    fail(err);
                    return;
                }
                resolve();
            });
        });
        // if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir);
        // }
    }
    upload(json) {
        console.log('##################################################################################################');
        console.log(json);
        console.log(json.host);
        console.log(json.endpoint);
        var sas = '?' + json.endpoint.split('?')[1];
        console.log(sas);
        var mark = json.endpoint.indexOf('?');
        var container = json._container || json.endpoint.substring(json.host.length, mark);
        // json.endpoint.split(json.host)[0];
        console.log('----------------------');
        console.log(`container: ${container}`);
        console.log('----------------------');
        console.log(`fileName: ${json.fileName}`);
        console.log(`filePath: ${json.filePath}`);
        console.log(`sas: ${sas}`);
        var blobService = azure.createBlobServiceWithSas(`http://localhost:10000/devstoreaccount1/`, sas);
        return new Promise(function (resolve, fail) {
            // blobService.listContainersSegmented(null, function (error, results) {
            //    console.log(error);
            //     console.log(results);
            // });
            blobService.createBlockBlobFromLocalFile(container, json.fileName, json.filePath, function (error, result, response) {
                if (!error) {
                    // file uploaded
                    console.log(result);
                    console.log(response);
                    resolve();
                    return;
                }
                console.log(error);
                fail(error);
            });
        });
    };

    fileIsAccessible(filepath) {
        return new Promise(function (resolve, fail) {
            console.log('check accessibility');
            fs.access(filepath, fs.R_OK | fs.W_OK, function (err) {
                console.log('checked ' + err);
                if (err) {
                    console.log('file is not accessible');
                    fail(err);
                } else {
                    resolve(true);
                }
            });
        });
    };

    executeSpawnCmd(cmd, args, options) {
        console.log('execute spawn cmd');
        return new Promise(function (resolve, fail) {
            console.log(cmd);
            console.log(args);
            options = options || {};
            var child;
            if (process.platform === 'win32') {
                child = spawn(cmd, args, options);
            } else {
                child = spawn('sudo', [cmd].concat(_toConsumableArray(args)), options);
            }
            options._kill = function () {
                child.kill();
            };
            child.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            child.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });
            child.on('error', function (err) {
                console.log(err);
                child.stdin.pause();
                child.kill();
                fail();
            });
            child.on('exit', function (code) {
                console.log('child process exited with code ' + code);
                child.stdin.pause();
                child.kill();
                if (code != 0) {
                    console.log('Failed: ' + code);
                    fail(code);
                    return;
                }
                resolve();
            });
        });
    }

}