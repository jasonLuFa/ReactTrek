import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SingleCocktail from './pages/SingleCocktail';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='cocktail'>
            <Route path=':productId' element={<SingleCocktail />}></Route>
          </Route>
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
