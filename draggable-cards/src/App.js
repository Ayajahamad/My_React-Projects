import './App.css';
import BgComponent from './components/BgComponent';
import FgComponent from './components/FgComponent';

function App() {
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <BgComponent />
      <FgComponent />
    </div>
  );
}

export default App;
