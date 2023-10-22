import './index.scss';
import Canvas from './components/Canvas/Canvas';
import Search from './components/search/Search';
import Song from './components/Song/Song';
import useCustomStore from './CostumStore';
import { useState } from 'react';
import Picker from './components/Picker/Picker';

function App() {

  const songs = useCustomStore((state) => state.songs);

  const [currentSong, setCurrentSong] = useState(null);


  return (
    <>
      <head>
        <title>Dispositif-interactif-musique-by-amezir</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Dispositif interactif de musique" />
        <meta name="keywords" content="Dispositif interactif de musique" />
        <meta name="author" content="Amezir" />
      </head>
      {currentSong && (
        <div style={{ position: 'fixed', top: 0, left: 0, background: `url(${currentSong.album.cover_big})` }} className='currentsong'>
          {/* <div className='currentsong__info'>
            <h2>{currentSong.title}</h2>
          </div> */}
        </div>
      )}
      <div className='ctnsong'
      >
        {songs.map((song, key) => (
          <Song key={key} data={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>
      <Canvas />
      <Search />
      <Picker />
    </>
  );
}

export default App;
