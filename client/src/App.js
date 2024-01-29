import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <SearchBox />
      <Routes>
        <Route path='/' element={<SearchResults />} />
        <Route path='/items' element={<SearchResults />} />
        <Route path='/items/:id' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
