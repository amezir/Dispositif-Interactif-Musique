import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Line {
    constructor() {
        this.colors = [0x891180, 0xEEA1EB, 0xCB22D7, 0xFFF6F6, 0xA80038, 0xFD0054];

        this.group = new THREE.Group();

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial();

        this.materials = [];

        // this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.colors.forEach(color => {

            const material = new THREE.MeshBasicMaterial({
                color: color,
            });
            this.materials.push(material);

        });

        this.spacing = 1.5;

        let n = -1;

        const Modulo = Math.ceil(256 / this.colors.length);


        for (let i = 0; i < 256; i++) {

            if (i % Modulo === 0) {
                // console.log(i);
                n++;
                // console.log(n);
            }


            this.mesh = new THREE.Mesh(this.geometry, this.materials[n]);
            this.mesh.position.x = i * this.spacing - 256 * this.spacing / 2;
            // this.mesh.scale.y = 0.5;
            this.group.add(this.mesh);
        }

    }

    tick() {

        for (let i = 0; i < this.group.children.length; i++) {
            const child = this.group.children[i];
            child.scale.y = AudioController.fdata[i] + 0.5;
        }

    }
}