import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import Cube from "./Objects/Cube.js"


class SCENE {
    setup(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = canvas;

        this.setupScene();
        this.setupStats();
        this.setupCamera();
        this.setupControls();
        this.setupRenderer();

        this.addObjects();
        this.addEvents();
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
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            // alpha: true
        });

        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

        this.cube = new Cube();

        this.scene.add(this.cube.mesh);

        this.camera.position.z = 10;
    }

    tick = () => {
        this.stats.begin();
        this.cube.tick();
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
    };

}

const Scene = new SCENE();
export default Scene;