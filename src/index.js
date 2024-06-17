import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

const router = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="" element={< />} /> */}
    </Route>
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/blog">
    {router}
  </BrowserRouter>
);

reportWebVitals();
