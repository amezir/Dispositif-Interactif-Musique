import './index.scss';
import Canvas from './components/Canvas/Canvas';
import Search from './components/search/Search';
import Song from './components/Song/Song';
import useCustomStore from './CostumStore';
import { useState } from 'react';

function App() {

  const songs = useCustomStore((state) => state.songs);

  const [currentSong, setCurrentSong] = useState(null);


  return (
    <>
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
    </>
  );
}

export default App;
