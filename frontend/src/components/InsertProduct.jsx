import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function InsertProduct() {

  const [product, setProduct] = useState({name : "", price : 0, description: "", category: ""})

  const [showMessage, setShowMessage] = useState({success: false,  message: ""})

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setProduct({ ...product , [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
          .post("https://productapplication.onrender.com/api/insertProduct", product)
          .then(res => {
              console.log(res.data.data)

              setShowMessage({success: true, message: "Inserted successfully"})

              setProduct({ name : "", price : 0, description: "", category: "" })

            setTimeout(() => {
                navigate('/table')
            }, 3000);

              
          })
          .catch(error => {
            console.log(error)
            setShowMessage({success: false, message: "Could not Insert the product"})
          })
    
  }

  return (
    <div className=''>

      <h1 className='text-center mt-4'>Product Form</h1>

        <form onSubmit={handleSubmit} method="post" className='container mt-5 p-4 col-md-4 flex align-items-center'>
            <label htmlFor="name">Name : </label><input type="text" name="name" id="name" value={product.name} placeholder='Product Name' className='form-control' onChange={handleChange} required/>
            <label htmlFor="price">Price : </label><input type="number" name="price" id="price" value={product.price} className='form-control' placeholder='Product price' onChange={handleChange} required/>
            <label htmlFor="description">Description : </label><input type='text' name="description" id="desc" value={product.description} className='form-control' placeholder='Product description' onChange={handleChange} required/>
            <label htmlFor="category">Category : </label><input type="text" name="category" id="category" value={product.category} className='form-control' placeholder='Product category' onChange={handleChange} required/>

            <button type='submit' className='btn btn-primary mt-5'>Insert</button>
        </form>


        {
          showMessage.success == true ? (
            <div className='container mt-5 bg-success text-white'>
              {showMessage.message}
            </div>
          ) : (
            <div className='container mt-5 bg-danger text-white'>
              {showMessage.message}
            </div>
          )
        }


        
        
    </div>
  )
}

export default InsertProduct
