import './biblioCSS/index.scss'

import NavBar from './components/NavBar'
import Home from './components/Home'
import AddBook from './components/AddBook'
import Library from './components/Library'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/addBook" element={<AddBook />} />
            </Routes>
          </div>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
