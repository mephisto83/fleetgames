import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, { Asset } from 'expo';
import { MeshPhysicalMaterial } from 'three';
console.disableYellowBox = true;
import AnyLoader from './util/AnyLoader';
// import { OBJLoader } from './util/OBJLoader';
const THREE = require('three');
global.THREE = THREE;
require('./util/OBJLoader');


export default class App extends React.Component {
  state = {
    visible: false,
  }
  render() {

    return this.state.loaded ? (
      <View style={{ flex: 1 }}>
        <Expo.GLView
          ref={(ref) => this._glView = ref}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
      </View>
    ) : <Expo.AppLoading />;
  }
  componentWillMount() {

    this.preloadAssetsAsync();
  }
  async preloadAssetsAsync() {
    await Promise.all([
      require('./assets/ship.obj'),
      require('./assets/Shipwright.0007.obj'),
      require('./assets/wooden-duck.obj'),
      require('./assets/wooden-duck.png'),
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()));
    this.setState({ loaded: true });
  }
  _onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    // Do graphics stuff here!
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //   75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);

    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    var alpha = 1;
    var beta = .4;
    var gamma = .5;
    var diffuseColor = new THREE.Color().setHSL(alpha, 0.5, 0.25);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    var material = new THREE.MeshPhysicalMaterial({
      color: diffuseColor,
      metalness: 0,
      roughness: 0.5,
      clearCoat: 1.0 - alpha,
      clearCoatRoughness: 1.0 - beta,
      reflectivity: 1.0 - gamma
    });

    // var physical = new THREE.MeshPhysicalMaterial({
    //   reflectivity: 1,
    //   clearCoat: 1,
    //   clearCoatRoughness: 1,
    //   color: new THREE.Color(0x123f12)
    //   // defines: any;
    //   // color: Color;
    //   // roughness: number;
    //   // metalness: number;
    //   // map: Texture;
    //   // lightMap: Texture;
    //   // lightMapIntensity: number;
    //   // aoMap: Texture;
    //   // aoMapIntensity: number;
    //   // emissive: Color;
    //   // emissiveIntensity: number;
    //   // emissiveMap: Texture;
    //   // bumpMap: Texture;
    //   // bumpScale: number;
    //   // normalMap: Texture;
    //   // normalScale: number;
    //   // displacementMap: Texture;
    //   // displacementScale: number;
    //   // displacementBias: number;
    //   // roughnessMap: Texture;
    //   // metalnessMap: Texture;
    //   // alphaMap: Texture;
    //   // envMap: Texture;
    //   // envMapIntensity: number;
    //   // refractionRatio: number;
    //   // wireframe: boolean;
    //   // wireframeLinewidth: number;
    //   // skinning: boolean;
    //   // morphTargets: boolean;
    //   // morphNormals: boolean;
    // })
    // var loader = new THREE.ObjectLoader();
    // loader.load( 'assets/ship.json', function ( geometry, materials ) {
    //   const ship = new THREE.Mesh(geometry, material);
    //   scene.add(ship);
    //   ship.position.z = -1.4;
    // });

    const scaleLongestSideToSize = (mesh, size) => {
      const { x: width, y: height, z: depth } =
        new THREE.Box3().setFromObject(mesh).size();
      const longest = Math.max(width, Math.max(height, depth));
      const scale = size / longest;
      mesh.scale.set(scale, scale, scale);
    }
    var shipMesh;
    Promise.resolve().then(() => {

      const modelAsset = Asset.fromModule(require('./assets/Shipwright.0007.obj'));
      console.log('loading model asset');
      return modelAsset.downloadAsync().then(() => {
        console.log('creating objloader');
        console.log(THREE.OBJLoader);
        console.log('type ' + (typeof (THREE.OBJLoader)));
        const loader = new THREE.OBJLoader();
        return Expo.FileSystem.readAsStringAsync(modelAsset.localUri).then(res => {
          console.log('read local file');
          const model = loader.parse(res)
          console.log('parsed model');
          const textureAsset = Asset.fromModule(require('./assets/wooden-duck.png'));
          const ballTexture = new THREE.Texture();
          ballTexture.image = {
            data: textureAsset,
            width: textureAsset.width,
            height: textureAsset.height,
          };
          console.log(textureAsset);
          ballTexture.needsUpdate = true;
          ballTexture.isDataTexture = true; // send to gl.texImage2D() verbatim
          const ballMaterial = new THREE.MeshPhongMaterial({ map: ballTexture });
          scaleLongestSideToSize(model, 1);
          var mesh = model.clone();
          mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = ballMaterial;
            }

          })
          mesh.position.z = -1.4;
          mesh.position.x = -.4;
          scene.add(mesh);
          shipMesh = mesh;
        });
      }).catch(e => {
        console.log('error');
        console.log('---')
        console.log(e.toString());
        console.log('---')
      });
      // AnyLoader(['./assets/wooden-duck.obj'], (obj) => {
      //   scene.add(obj);
      // })
      // var res = async function loadPLY(key = 'ascii') {
      //   /// This works for both `ASCII` & `Binary` `.ply` files
      //   /// PLY files will return a geometry, we must add it to a mesh with a material.

      //   const ascii =  ('./assets/ship.ply');
      //   const models = { ascii };
      //   const geometry = await ExpoTHREE.loadAsync(models[key], onProgress);

      //   geometry.computeVertexNormals();
      //   const material = new THREE.MeshStandardMaterial({
      //     color: 0x0055ff,
      //     flatShading: true,
      //   });
      //   const mesh = new THREE.Mesh(geometry, material);

      //   return mesh;
      // }
      // scene.add(res);
    })
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.z = -1.4;
    // camera.position.z = 5;
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;
      if (shipMesh) {
        shipMesh.rotation.x += 0.007;
        shipMesh.rotation.y += 0.004;
      }
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
