import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import Cover from "./Objects/Cover.js";
import Cube from "./Objects/Cube.js"
import Line from "./Objects/Line.js"
import LogoIUT from "./Objects/LogoIUT.js"
import Board from "./Objects/Board.js"
import Amezir from "./Objects/Amezir.js";

import Pane from "../utils/Pane.js";

class SCENE {

    setup(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = canvas;
        // this.changeVisualizer(4);

        this.setupScene();
        this.setupStats();
        this.setupCamera();
        this.setupControls();
        this.setupRenderer();
        this.setupPostprocessing();
        this.setupGLTFLoader();
        this.setTextureLoader();

        this.addObjects();
        this.addEvents();
    }

    setTextureLoader() {
        this.textureLoader = new THREE.TextureLoader();
    }

    setupGLTFLoader() {
        this.gltfLoader = new GLTFLoader();

    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupStats() {
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            28,
            this.width / this.height,
            0.1,
            10000
        );
        this.camera.position.set(0, 0, 100);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.enableZoom = true;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            alpha: true
        });


        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;


        // this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setupPostprocessing() {

        this.BLOOM_PARAMS = {
            strength: 1,
            radius: 0,
            threshold: 0
        };

        this.composer = new EffectComposer(this.renderer);
        this.scenePass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.width, this.height),
            this.BLOOM_PARAMS.strength,
            this.BLOOM_PARAMS.radius,
            this.BLOOM_PARAMS.threshold
        );

        this.composer.addPass(this.scenePass);
        this.composer.addPass(this.bloomPass);

        this.postProcessFolder = Pane.addFolder({
            title: "Blom",
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "strength", {
            min: 0,
            max: 2,
            step: 0.1,
            label: "Strength",
        }).on("change", () => {
            this.bloomPass.strength = this.BLOOM_PARAMS.strength;
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "radius", {
            min: 0,
            max: 2,
            step: 0.1,
            label: "Radius",
        }).on("change", () => {
            this.bloomPass.radius = this.BLOOM_PARAMS.radius;
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "threshold", {
            min: 0,
            max: 2,
            step: 0.01,
            label: "Threshold",
        }).on("change", () => {
            this.bloomPass.threshold = this.BLOOM_PARAMS.threshold;
        });
    }

    addEvents() {
        gsap.ticker.add(this.tick);
        window.addEventListener("resize", () => {
            this.resize();
        });
    }

    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
    }

    addObjects() {
        this.cover = new Cover();
        this.cube = new Cube();
        this.line = new Line();
        this.board = new Board();
        this.logoIUT = new LogoIUT();
        this.amezir = new Amezir();
        this.selectedObject = this.cover;
        this.bloomPass.strength = 0;
        this.scene.add(this.selectedObject.group);
        // this.camera.position.z = 10;
    }

    changeVisualizer(index) {
        // console.log(index);
        this.scene.remove(this.selectedObject.group);
        switch (index) {
            case 0:
                this.selectedObject = this.cube
                this.camera.position.set(0, 0, 10);
                this.bloomPass.strength = 1;
                break;
            case 1:
                this.selectedObject = this.line
                this.camera.position.set(0, 0, 800);
                this.bloomPass.strength = 0.5;
                break;
            case 2:
                this.selectedObject = this.logoIUT
                this.camera.position.set(0, 0, 20);
                this.bloomPass.strength = 1;
                break;
            case 3:
                this.selectedObject = this.board
                this.camera.position.set(0, 0, 80);
                this.bloomPass.strength = 0.5;
                break;
            case 4:
                this.selectedObject = this.amezir
                this.camera.position.set(0, 0, 50);
                this.bloomPass.strength = 0.5;
                // console.log(this.selectedObject);
                break;
            case 5:
                this.selectedObject = this.cover
                this.camera.position.set(0, 0, 300);
                this.bloomPass.strength = 0;
                break;

            default:
                break;

        }
        this.scene.add(this.selectedObject.group);
    }

    tick = (time, deltaTime, frame) => {
        this.stats.begin();
        // this.cube.tick();
        // this.line.tick();
        this.selectedObject.tick(deltaTime);
        this.composer.render();

        this.controls.update();
        this.stats.end();
    };

}

const Scene = new SCENE();
export default Scene;