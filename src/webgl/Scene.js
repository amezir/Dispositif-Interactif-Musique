import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import Cube from "./Objects/Cube.js"
import Line from "./Objects/Line.js"

import Pane from "../utils/Pane.js";

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
        this.setupPostprocessing();

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

        this.line = new Line();

        this.scene.add(this.line.group);

        // this.cube = new Cube();

        // this.scene.add(this.cube.mesh);

        this.camera.position.z = 500;
    }

    tick = () => {
        this.stats.begin();
        // this.cube.tick();
        this.line.tick();
        this.composer.render();
        this.stats.end();
        this.controls.update();
    };

}

const Scene = new SCENE();
export default Scene;