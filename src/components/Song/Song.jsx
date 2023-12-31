import style from "./Song.module.scss";
import AudioController from "../../utils/AudioController";
import { useRef } from "react";
import Scene from "../../webgl/Scene";

const Song = ({ data, setCurrentSong }) => {
    const songRef = useRef(null);

    const click = () => {
        AudioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_big);
        setCurrentSong(data);

        // Supprimez la classe "active" de l'élément actuellement actif, s'il y en a un
        const activeSong = document.querySelector(`.${style.active}`);
        if (activeSong) {
            activeSong.classList.remove(style.active);
        }

        // Ajoutez la classe "active" à l'élément actuel
        songRef.current.classList.add(style.active);

        // Mettez à jour le titre de la page
        document.title = `${data.title} - ${data.artist.name}`;
    };

    return (
        <div
            className={`${style.song}`}
            onClick={click}
            ref={songRef} // Utilisez la référence pour cibler l'élément
        >
            <span>
                <img src={data.album.cover} alt={data.title} />
            </span>
            <p className={style.title}>{data.title}</p>
        </div>
    );
};

export default Song;
