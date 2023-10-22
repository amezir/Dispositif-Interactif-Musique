import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

export default class Amezir {
    constructor() {
        this.group = null;

        this.material = new THREE.MeshNormalMaterial({});

        Scene.gltfLoader.load('/model-3d/amezir.glb', (gltf) => {
            this.group = gltf.scene;

            this.group.traverse((object) => {
                if (object.type === "Mesh") {
                    object.material = this.material;
                }
            });

        });
    }

    tick() {
        if (this.group) {

            const remap = AudioController.fdata[0] / 255;

            this.group.scale.set(

                1 + remap,
                1 + remap,
                1 + remap
            )
        }
    }

}
