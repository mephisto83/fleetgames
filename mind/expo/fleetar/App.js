import React from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions } from 'react-native';
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
import { Lightning } from './util/Lightning';
var { windowWidth: width, windowHeight: height } = Dimensions.get('window');
export default class App extends React.Component {
  state = {
    visible: false,
  }
  render() {

    return this.state.loaded ? (
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <Expo.GLView
          {...this.panResponder.panHandlers}
          ref={(ref) => this._glView = ref}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
      </View>
    ) : <Expo.AppLoading />;
  }
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    //this.setState({ size: { width: layout.width, height: layout.height } });
    windowWidth = layout.width;
    windowHeight = layout.height;
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.touching = true;
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.touching = false;
        //this.setState({ touchX: gestureState.x0, touchY: gestureState.y0 })
        this.currentGesture = Object.assign({}, {
          x: (gestureState.x0 / windowWidth) * 2 - 1,
          y: - (gestureState.y0 / windowHeight) * 2 + 1
        });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.touching = false;
      },
      onShouldBlockNativeResponder: () => false,
    });
    this.preloadAssetsAsync();
  }

  async preloadAssetsAsync() {
    var me = this;
    await Promise.all([
      require('./assets/Shipwright.0007.obj'),
      require('./assets/wooden-duck.obj'),
      require('./assets/wooden-duck.png'),
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()))
      .then(() => {
        var cc = 0;
        console.log('start download');
        return new Promise((resolve, fail) => {
          var loader = new THREE.OBJLoader();
          loader.load('http://192.168.1.109/Resources/Model/Shipwright.0007.obj', (res) => {
            me.shipModel = res;
            resolve();
            console.log('complete');
          }, () => {
            console.log('in progress ' + cc); cc++;
          }, (e) => {
            console.log(e);
            fail();
          });
        });
      });
    this.setState({ loaded: true });
  }
  _onGLContextCreate = async (gl) => {
    var me = this;
    const arSession = await this._glView.startARSessionAsync();
    // Do graphics stuff here!
    var onRenderFcts = [];
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
    var diffuseColor = new THREE.Color().setHSL(alpha, 0.7, 0.45);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);


    directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    var material = new THREE.MeshPhysicalMaterial({
      color: diffuseColor,
      metalness: .4,
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
    var shipMesh2;
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
          const model = me.shipModel;// loader.parse(res)
          console.log('parsed model');
          const textureAsset = Asset.fromModule(require('./assets/wooden-duck.png'));
          const ballTexture = new THREE.Texture();
          ballTexture.image = {
            data: textureAsset,
            width: textureAsset.width,
            height: textureAsset.height,
          };
          ballTexture.needsUpdate = true;
          ballTexture.isDataTexture = true; // send to gl.texImage2D() verbatim
          const ballMaterial = new THREE.MeshPhongMaterial({ map: ballTexture });
          scaleLongestSideToSize(model, 1);
          var mesh = model.clone();
          mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = ballMaterial;
            }

          });
          var mesh2 = model.clone();
          mesh2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = ballMaterial;
            }

          });
          mesh.position.z = -1.4;
          mesh.position.x = -.4;

          mesh2.position.z = -1.4;
          mesh2.position.x = .4;
          scene.add(mesh);
          scene.add(mesh2);
          shipMesh = mesh;
          shipMesh2 = mesh2;
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
    var time = 0;
    var r = 1;
    var speed = 1000;

    var lightning = new Lightning();
    try {
      const textureAsset = Asset.fromModule(require('./assets/blue_particle.jpg'));
      lightning.init(scene, textureAsset);
    } catch (e) {
      console.log(e);
    }
    var raycaster = new THREE.Raycaster();
    // var lastTimeMsec = null;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;
      lightning.height = windowHeight;
      lightning.update();
      if (shipMesh) {
        // shipMesh.rotation.x += 0.007;
        // shipMesh.rotation.y += 0.004;
        time++;
        shipMesh.position.x = r * Math.cos(time / speed) + 1;
        shipMesh.position.z = r * Math.sin(time / speed) + .3;
      }
      if (me.touching) {
        var mouse = me.currentGesture;
        // update the picking ray with the camera and mouse position
        if (mouse) {
          raycaster.setFromCamera(mouse, camera);// { x: 0, y: 0 }
          //  console.log('mouse');
          // calculate objects intersecting the picking ray
          var intersects = raycaster.intersectObjects([cube, ...shipMesh.children, ...shipMesh2.children]);
          //   console.log(intersects.length);
          for (var i = 0; i < intersects.length; i++) {

            intersects[i].object.material.color.set(0xff0000);
            console.log('hit something');
          }
        }
      }
      renderer.render(scene, camera);

      // lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
      // var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      // onRenderFcts.forEach(function (updateFn) {
      //   updateFn(deltaMsec / 1000, nowMsec / 1000)
      // })
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
