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
import { Policy } from './Components/Policy';
import { LayoutAdmin } from './Components/admin/LayoutAdmin';
import { Admin } from './Components/admin/Admin';
import { Booking } from './Components/admin/Booking';
import { ChangeCourses } from './Components/admin/ChangeCourses';
import { Media } from './Components/admin/Media';

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
      <Route path="/policy" element={<Policy/>}/>
      </Route>
      <Route path="/admin" element={<LayoutAdmin/>}>
      <Route index element={<Admin/>}/>
      <Route path="/admin/hantera-kurser" element={<ChangeCourses/>}/>
      <Route path="/admin/bokningar" element={<Booking/>}/>
      <Route path="/admin/media" element={<Media/>}/>

      </Route>
    </Routes>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
