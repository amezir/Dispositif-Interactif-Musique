import style from "./Picker.module.scss";
import Scene from "../../webgl/Scene";

const Picker = () => {

    const pickVisualizer = (index) => {
        Scene.changeVisualizer(index);
    }

    return <div className={style.picker}>
        <div onClick={() => pickVisualizer(0)}>Cube</div>
        <div onClick={() => pickVisualizer(1)}>Line</div>
        <div onClick={() => pickVisualizer(2)}>Logo IUT</div>
        <div onClick={() => pickVisualizer(3)}>Board</div>
    </div>
};

export default Picker;

