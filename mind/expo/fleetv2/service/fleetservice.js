import * as redquick from 'redquicklib';
var ReactNative = require('react-native');
var {
    AsyncStorage
} = ReactNative;

function parameters() {
    var result = '';
    for (var i in args) {
        var add = ''
        if (result) {
            add = `&`;
        }
        result += `${add}${i}=${encodeURI(args[i])}`;
    }
    if (result) {
        result = '?' + result;
    }

    return result;
}

const endpoints = {
}

var promise = Promise.resolve();
var fleetservice = redquick.CreateService('http://192.168.1.109/', null, true);

export default {
    login: () => {
        return promise.then(()=>{
            return fleetservice.post('fleet/user/login', JSON.stringify({
                "isMachine": true,
                "machinePass": machinepass,
                "machineOwned": machinesig
              }));
        })
    }
}
const UNIQUE_MACHINE_SIG = 'UNIQUE_MACHINE_SIG';
const MACHINE_PASS = 'MACHINE_PASS';
let machinesig = null;
let machinepass = null;
export function mount() {
    promise = promise.then(() => {
        return AsyncStorage.getItem(UNIQUE_MACHINE_SIG).then(res => {
            if (res) {
                machinesig = res;
            }
            else {
                var res = makeid(123);
                machinesig = res;
                return AsyncStorage.setItem(UNIQUE_MACHINE_SIG, res);
            }
        }).then(()=>{
            return AsyncStorage.getItem(MACHINE_PASS).then(res => {
                if (res) {
                    machinepass = res;
                }
                else {
                    var res = makeid(123);
                    machinepass = res;
                    return AsyncStorage.setItem(MACHINE_PASS, res);
                }
            })  
        })
    });

    return promise;
}


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}