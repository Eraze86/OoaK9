import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Private } from './Components/Private';
import { Contact } from './Components/Contact';
import { Courses } from './Components/Courses';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="/om-mig" element={<About/>}/>
      <Route path="/kontakta" element={<Contact/>}/>
      <Route path="/privat-coaching" element={<Private/>}/>
      <Route path="/kurser" element={<Courses/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
