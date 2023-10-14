import styles from './Canvas.module.scss';
import Scene from '../../webgl/Scene';
import { useEffect } from 'react';
import { useRef } from 'react';

const Canvas = () => {

    const canvasRef = useRef(null);

    // console.log(Scene);

    useEffect(() => {
        Scene.setup(canvasRef.current);
    }, []);

    return (
        <canvas className={styles.canvas} ref={canvasRef}
        />
    );
}

export default Canvas;