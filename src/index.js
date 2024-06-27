import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import Home from './pages/Home';
import About from './pages/About';
import Implementation from './pages/Implementation';
import ImplementationDetail from './pages/ImplementationDetail';
import SearchList from './pages/SearchList';
import RecordListPage from './pages/RecordListPage';
import CreateRecordPage from './pages/CreateRecordPage';
import RecordDetailPage from './pages/RecordDetailPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/blog">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="implementationPage" element={<Implementation />} />
        <Route path="implementationPage/:pagePath" element={<ImplementationDetail />} />
        <Route path="searchList/:searchWord" element={<SearchList />} />
        <Route path="recordList" element={<RecordListPage />} />
        <Route path="recordCreate" element={<CreateRecordPage />} />
        <Route path="record/:recordId" element={<RecordDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
