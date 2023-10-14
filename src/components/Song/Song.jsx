import style from "./Song.module.scss";
import AudioController from "../../utils/AudioController";

const Song = ({ data }) => {

    return (
        <div className={style.song} onClick={() => AudioController.updateSong(data.preview)}
        >
            <span>
                <img src={data.album.cover} alt={data.title} />
            </span>
            <p className={style.title}
            >{data.title}</p>
        </div>
    );
};

export default Song;