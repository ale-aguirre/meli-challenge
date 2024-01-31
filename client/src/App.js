import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/Searchbox/SearchBox';
import SearchResults from './components/SearchResults/SearchResults';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import styles from './App.scss';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <SearchBox />
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<SearchResults />} />
            <Route path='/items' element={<SearchResults />} />
            <Route path='/items/:id' element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
