import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import useCustomStore from "../../CostumStore";
import styles from "./Search.module.scss";
import AudioController from "../../utils/AudioController";
import { useDropzone } from "react-dropzone";

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore((state) => state.setSongs);

    const onDrop = (audio) => {
        console.log(audio);
        const src = URL.createObjectURL(audio[0]);

        const audioObject = {
            album: {
                cover: "",
            },
            artist: {
                name: "Local",
            },
            preview: src,
            title: audio[0].name,
        };

        setSongs([audioObject]);

    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "audio/mpeg": [".mp3"],
        },
    });

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            getSongs();
        }
    };


    useEffect(() => {
        AudioController.setup();
    }
        , []);

    console.log(isDragActive);

    const getSongs = async () => {
        let response = await fetchJsonp(
            `https://api.deezer.com/search?q=${artist}&output=jsonp`
        );

        response = await response.json();

        console.log(response);

        const data = response.data.slice(0, 6);

        AudioController.ctx.resume();
        setSongs(data);
    };

    return (
        <>
            <div className={styles.search}>
                <input
                    type="text"
                    onChange={(e) => setArtist(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Rechercher un artiste"
                />
                <div {...getRootProps()} className={styles.dropzone}>
                    <input type="submit" value="Drop song"  {...getInputProps} />
                </div>
            </div>
        </>
    );
};

export default Search;