import style from "./Picker.module.scss";
import Scene from "../../webgl/Scene";
import React, { useState } from "react"; // Importer useState depuis React

const Picker = () => {
    const [activeIndex, setActiveIndex] = useState(null); // État pour suivre l'élément actif

    const pickVisualizer = (index) => {
        Scene.changeVisualizer(index);

        // Mettre à jour l'élément actif lorsque vous changez de sélection
        setActiveIndex(index);
    }

    return <div className={style.picker}>
        <div onClick={() => pickVisualizer(0)} className={activeIndex === 0 ? style.active : ""}>Cube</div>
        <div onClick={() => pickVisualizer(1)} className={activeIndex === 1 ? style.active : ""}>Line</div>
        <div onClick={() => pickVisualizer(2)} className={activeIndex === 2 ? style.active : ""}>Logo IUT</div>
        <div onClick={() => pickVisualizer(3)} className={activeIndex === 3 ? style.active : ""}>Board</div>
    </div>
};

export default Picker;


