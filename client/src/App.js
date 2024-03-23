import React from 'react';
import './App.css';
import ListaAmigos from './features/amigo/ListaAmigos';
import Test from './features/Test/Test';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/amigos' element={<ListaAmigos/>}/>
      </Routes>
    </Router>
  );
}

export default App;
