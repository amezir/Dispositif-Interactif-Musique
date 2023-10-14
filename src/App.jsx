import './index.scss';
import Canvas from './components/Canvas/Canvas';
import Search from './components/search/Search';
import Song from './components/Song/Song';
import useCustomStore from './CostumStore';

function App() {

  const songs = useCustomStore((state) => state.songs);

  return (
    <>


      <div className='ctnsong'
      >
        {songs.map((song, key) => (
          <Song key={key} data={song} />
        ))}
      </div>
      <Canvas />
      <Search />
    </>
  );
}

export default App;
