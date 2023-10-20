import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Board {
    constructor() {
        this.group = new THREE.Group();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial();

        this.group.position.set(-7.5, -7.5, 0);

        this.whiteMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });

        this.purpleMaterial = new THREE.MeshBasicMaterial({
            color: 0x891180,
        });

        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                let mesh;

                if (x % 2 === y % 2) {
                    mesh = new THREE.Mesh(this.geometry, this.purpleMaterial);
                } else {
                    mesh = new THREE.Mesh(this.geometry, this.whiteMaterial);
                }

                mesh.position.set(x, y, 0);

                this.group.add(mesh);

            }
        }

    }

    tick() {

        for (let i = 0; i < this.group.children.length; i++) {
            const child = this.group.children[i];
            child.scale.z = AudioController.fdata[i] * 0.05;
        }

    }
}