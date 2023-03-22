import './biblioCSS/index.scss';

import NavBar from './components/NavBar';

import { BrowserRouter, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
