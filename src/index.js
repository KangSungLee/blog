import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import About from './pages/About';
import Implementation from './pages/Implementation';
import Record from './pages/Record';
import './css/index.css'

const router = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/record" element={<Record/>} />
      <Route path="/implementation" element={<Implementation/>} />
    </Route>
  </Routes>
);

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/blog" >
    {router}
  </BrowserRouter>
);

reportWebVitals();
