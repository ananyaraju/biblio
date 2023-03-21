import './biblioCSS/index.scss';

import NavBar from './NavBar';

import { BrowserRouter, Routes } from 'react-router-dom';

function App() {

  // const [loading, setLoading] = useState(true)
  // const [account, setAccount] = useState(null)

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
