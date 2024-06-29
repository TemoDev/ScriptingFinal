import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Authentication from './components/Authentication/Authentication';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Profile from './components/Profile/Profile';

function App() {

  useEffect(() => {
    const lan = localStorage.getItem("language");
    if(!lan) {
      localStorage.setItem("language","en")
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/auth" element={<Authentication />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/product/:id" element={<ProductDetail />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
