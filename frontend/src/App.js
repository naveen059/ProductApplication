import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import ViewProducts from './components/ViewProducts.jsx'
import InsertProduct from './components/InsertProduct.jsx';
import ProductsTable from './components/ProductsTable.jsx';
import UpdateProduct from './components/UpdateProduct.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ViewProducts />}></Route>
        <Route path='/insert' element={<InsertProduct />}></Route>
        <Route path='/table' element={<ProductsTable />}></Route>
        <Route path='/update' element={<UpdateProduct />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </div>
  )
}

export default App