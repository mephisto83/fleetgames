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
import * as FL from './service/fleetservice';
import fleetservice from './service/fleetservice';

export default class App extends React.Component {
  state = {
    visible: false,
  }
  render() {
    var error = this.state.error ? <View><Text>Something went wrong</Text></View> : null;
    return this.state.loaded ? (
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        {error}
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
    var me = this;
    FL.mount().then(() => {
      return fleetservice.login().then(res => {
      }).catch(e => {
        me.setState({ error: true })
      });
    });
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

    const scaleLongestSideToSize = (mesh, size) => {
      const { x: width, y: height, z: depth } =
        new THREE.Box3().setFromObject(mesh).size();
      const longest = Math.max(width, Math.max(height, depth));
      const scale = size / longest;
      mesh.scale.set(scale, scale, scale);
    }
    var shipMesh;
    var shipMesh2;

    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.z = -1.4;
    // camera.position.z = 5;
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    var time = 0;
    var r = 1;
    var speed = 1000;

    var raycaster = new THREE.Raycaster();
    // var lastTimeMsec = null;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;
      // lightning.height = windowHeight;
      // lightning.update();
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
