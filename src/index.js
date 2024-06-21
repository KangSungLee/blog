import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import About from './pages/About';
import Record from './pages/Record';
import './css/index.css';
import Implementation from './pages/Implementation';
import ImplementationDetail from './pages/ImplementationDetail';
import SearchList from './pages/SearchList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/blog">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="record" element={<Record />} />
        <Route path="implementationPage" element={<Implementation/>} />
        <Route path="implementationPage/:pagePath" element={<ImplementationDetail />} />
        <Route path="SearchList/:searchWord" element={<SearchList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
