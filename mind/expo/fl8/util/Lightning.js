//const THREE = require('three');

export class Lightning {
    lines = [];
    height = 0;
    uniforms;
    pointsGeometry = null;
    constructor(rad) {
        // console.log('creating lightning');
        this.lineRoot = new THREE.Object3D();
        this.maxStep = .3;
        this.pointsGeometry = new THREE.BufferGeometry();
        // console.log('created line root');
        this.lines = [];
        this.start = new THREE.Vector3(-1, 0, -2.3);
        this.end = new THREE.Vector3(0, 0, -2.3);
        // console.log('start and end');
        this.radius = this.rand(.5, 3.0) | 0;
        // console.log('radius');
        this.kofStep = 10 / this.radius;
        // console.log('created lighting');
    }
    rand(min, max) {
        return Math.random() * (max - min) + min
    }
    generatePoints(lines, kof) {
        var me = this;
        let positions = []
        let colors = []
        let result = {
            positions,
            colors
        }

        if (!lines) {
            return result
        }

        let k = lines.length
        let line
        let vec3s, vec3e, vec3n
        let size
        let s, dist
        while (k--) {
            line = lines[k]

            let pos = me.getPositions(line.lPos, line.drawRange.count, kof)
            positions.push.apply(positions, pos)

            let color = line.color
            let l = pos.length / 3
            while (l--) {
                colors.push(color.r, color.g, color.b)
            }
        }

        return result
    }

    getPositions(points, count, alpha) {
        let positions = []
        if (!points)
            return positions

        let l = count
        let index = 0
        let vec3s = new THREE.Vector3()
        let vec3e = vec3s.clone()
        let vec3n = vec3s.clone()
        let dist, size, i
        while (l--) {
            vec3s.set(points.getX(l), points.getY(l), points.getZ(l))
            vec3n.set(vec3s.x, vec3s.y, vec3s.z)
            if (l < 1) {
                positions.push(vec3n.x, vec3n.y, vec3n.z)
                break;
            }
            vec3e.set(points.getX(l - 1), points.getY(l - 1), points.getZ(l - 1));

            dist = vec3n.distanceTo(vec3e);
            size = dist * alpha | 0;

            for (i = 0; i < size; i++) {
                vec3n.set(vec3s.x, vec3s.y, vec3s.z)
                vec3n.lerp(vec3e, i / size)
                positions.push(vec3n.x, vec3n.y, vec3n.z)
            }
        }

        return positions
    }

    lighting(start, end, iterations, max) {
        let result = [start, end];
        var me = this;
        let temp = [];
        var maxStep = this.maxStep;
        let mid, thrid, normal, randVec, l;
        max = max || maxStep;
        // console.log('iterations');
        if (iterations < 1) {
            return result;
        }

        while (iterations--) {
            l = result.length;
            while (l--) {
                start = result[l];
                if (l < 1) {
                    temp.push(start);
                    break;
                }
                // console.log('inside iter');
                end = result[l - 1];

                // console.log('start clone lerp');
                mid = start.clone().lerp(end, .5);

                // console.log('mid');
                randVec = new THREE.Vector3(
                    me.rand(-maxStep, maxStep),
                    me.rand(-maxStep, maxStep),
                    me.rand(-maxStep, maxStep));
                // console.log('randVec.cross');

                normal = randVec.cross(end.clone().sub(start).normalize());
                // console.log('normal multiply scalar');

                mid.add(normal.multiplyScalar(me.rand(-max, max)));

                temp.push(start, mid);

            }
            result = temp.splice(0);
            max /= 2;
            // console.log(iterations);
            //break;
        }

        return result;
    }

    init(scene, textureAsset) {

        // console.log('init lightning');
        var me = this;
        var { lines, start, end, kofStep, lineRoot, pointsGeometry } = me;
        // console.log('buffer geometry');

        // console.log('points geometry');
        let k = 5

        pointsGeometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(3000 * k * 3), 3))
        pointsGeometry.addAttribute("color", new THREE.BufferAttribute(new Float32Array(3000 * k * 3), 3))
        // console.log('pm add attributes');

        while (k--) {

            let geometry = new THREE.BufferGeometry();
            // console.log('new buffer geo');
            let ls = geometry.lSegments = (me.rand(2, 8) | 0);
            let lm = geometry.lMax = me.rand(me.maxStep, me.maxStep + me.maxStep);
            // console.log('lightning');

            let line = me.lighting(start, end, ls, lm);

            if (line[0].equals(end)) {
                line.reverse();
            }
            // console.log('BufferAttribute');
            let poss = new THREE.BufferAttribute(new Float32Array(3000 * 3), 3);
            // console.log('BufferAttribute');
            let color = new THREE.Color(me.rand(Math.random(), .1), me.rand(.6, 1), me.rand(0, .8));
            geometry.color = color;

            poss.setDynamic(true)
                .copyVector3sArray(line);

            geometry.setDrawRange(0, line.length);

            geometry.addAttribute('position', poss);

            geometry.lPos = geometry.attributes.position;

            lines.push(geometry);

            let material = new THREE.LineBasicMaterial({
                color: color,
                blending: THREE.AdditiveBlending
            });

            lineRoot.add(new THREE.Line(geometry, material));
        }

        scene.add(lineRoot)
        // console.log('generate points');
        let attrs = me.generatePoints(lines, kofStep)

        pointsGeometry.attributes.position
            .setDynamic(true)
            .copyArray(attrs.positions)
        pointsGeometry.attributes.color
            .setDynamic(true)
            .copyArray(attrs.colors)

        pointsGeometry.setDrawRange(0, attrs.positions.length / 3)

        pointsGeometry.computeBoundingSphere()

        const shaderPoint = THREE.ShaderLib.points;
        this.uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms)

        // const image = new Image();

        const ballTexture = new THREE.Texture();
        ballTexture.image = {
            data: textureAsset,
            width: textureAsset.width,
            height: textureAsset.height,
        };

        // var texture = ballTexture;
        //var uniforms = this.uniforms;
        // uniforms.map.value = texture;// new THREE.Texture(image);
        // uniforms.map.value.needsUpdate = true
        // image.onload = () => {
        //     // button.classList.remove("hide")
        //     uniforms.map.value.needsUpdate = true
        // };
        //image.src = imageSrc

        // button.addEventListener("click", () => {
        //     if (textarea.value) {
        //         button.classList.add("hide")
        //         image.src = textarea.value
        //     }
        // })
        // var h = this.height || 10;
        // uniforms.size.value = this.radius
        // uniforms.scale.value = h * .5

        // var pointsmaterial = new THREE.PointsMaterial({
        //     color: 0xffffff,
        //     opacity: 0,
        //     size: 15,
        //     // vertexColors: THREE.VertexColors
        // });
        // var shaderaMaterial = new THREE.ShaderMaterial({
        //     uniforms: uniforms,
        //     defines: {
        //         USE_COLOR: ""
        //         , USE_MAP: ""
        //         , USE_SIZEATTENUATION: ""
        //     },
        //     transparent: true,
        //     // alphaTest: .4,
        //     depthWrite: false,
        //     // depthTest: false,
        //     blending: THREE.AdditiveBlending,
        //     vertexShader: shaderPoint.vertexShader,
        //     fragmentShader: shaderPoint.fragmentShader
        // });
        // let points = new THREE.Points(pointsGeometry, pointsmaterial);
        //scene.add(points);

        // let shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x3377cc })
        // let shadowGeo = new THREE.IcosahedronGeometry(10, 2)
        // let mesh = new THREE.Mesh(shadowGeo, shadowMaterial)
        // mesh.position.add(start);
        // scene.add(mesh);

        // mesh = new THREE.Mesh(shadowGeo, shadowMaterial)
        // mesh.position.add(end);
        // scene.add(mesh);

        // var light = new THREE.PointLight(0xffffff, 1, -50)
        // light.position.set(start.x, start.y, start.z)
        // scene.add(light)

        // light = new THREE.PointLight(0xffffff, 1, 50)
        // light.position.set(end.x, end.y, end.z)
        // scene.add(light)

        me.lines = lines;
        //  me.points = points;
        // me.mesh = mesh;
        me.lineRoot = lineRoot;


        return { lines, lineRoot };

    }

    update() {
        var me = this;

        var lines = me.lines;
        // console.log('check lines');
        if (!me.lines) {
            return;
        }
        var { end, start, kofStep, pointsGeometry } = me;
        // console.log('lines here');
        // console.log(me.lines);
        let l = lines.length
            , newLine
            , line
            , count
            , lv, ls, lm, ll
            , nStart
            , kof
            , vecs, vec
        // console.log('while lines');
        while (l--) {
            line = lines[l]
            vecs = line.lPos
            kof = line.lKof || 1

            if (kof < .1) {
                kof = 1
            }

            ls = line.lSegments * kof | 0 || 4;
            if (ls < 4)
                ls = 4;
            lm = line.lMax * kof
            count = line.drawRange.count
            lv = count * kof | 0;// Math.floor(count * kof);
            lv = count - lv

            nStart = new THREE.Vector3(
                vecs.getX(lv),
                vecs.getY(lv),
                vecs.getZ(lv)
            )

            newLine = me.lighting(end, nStart, ls, lm)
            if (newLine[0].equals(nStart)) {
                newLine.reverse()
            }
            ll = newLine.length
            line.setDrawRange(0, lv + ll)
            while (ll--) {
                // if (lv >= count)
                //     break;
                vec = newLine[ll]
                vecs.setXYZ(lv++, vec.x, vec.y, vec.z)
            }
            vecs.version++

            line.lKof = kof - .2
        }
        // console.log('generate points');
        let attrs = me.generatePoints(lines, kofStep)

        pointsGeometry.attributes.position
            .copyArray(attrs.positions)
            .version++
        pointsGeometry.attributes.color
            .copyArray(attrs.colors)
            .version++
        pointsGeometry.setDrawRange(0, attrs.positions.length / 3)
        pointsGeometry.computeBoundingSphere()
    }
}