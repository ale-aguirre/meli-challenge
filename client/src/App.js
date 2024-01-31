import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SearchBox from './components/Searchbox/SearchBox';
import SearchResults from './components/SearchResults/SearchResults';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/items' || location.pathname.startsWith('/items/');

  return (
    <div className={`container ${isSearchPage ? 'search-page' : ''}`}>
      <SearchBox />
      <div className='content'>
        <Routes>
          <Route path='/' element={<SearchResults />} />
          <Route path='/items/*' element={<SearchResults />} />
          <Route path='/items/:id' element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
