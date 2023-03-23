import './biblioCSS/index.scss'

import NavBar from './components/NavBar'
import Home from './components/Home'
import AddBook from './components/AddBook'
import Library from './components/Library'
import { AccountProvider } from './components/AccountContext'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <AccountProvider>
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
      </AccountProvider>
    </div>
  );
}

export default App;
