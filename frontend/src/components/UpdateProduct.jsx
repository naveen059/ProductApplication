import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProduct() {
  const navigation = useNavigate();
  const location = useLocation();
  const productId = location.state;

  const [showMessage, setShowMessage] = useState({sucess:false, message: ""});


  const [product, setProduct] = useState({name : "", price : 0, description : "", category: ""})


  useEffect(() => {
    const fetchProduct = async (e) => {
          await axios
          .get(`https://product-backend-yxxe.onrender.com/api/singleProduct/${productId}`)
          .then(res => {
              setShowMessage({success: true, message: "Product fetched successfully"})
              setProduct({ name: res.data.data.name, price: res.data.data.price, description: res.data.data.description, category: res.data.data.category })
          })
          .catch(error => {
            console.log(error)
            setShowMessage({success: false, message: "Could not fetch the product"})
          })
    }

    if(productId){
      fetchProduct();
    }

    

  }, productId)



  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setProduct((prevProduct) => ({ ...prevProduct , [name] : value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
          .put(`https://product-backend-yxxe.onrender.com/api/updateProduct/${productId}`, product)
          .then(res => {
              console.log(res.data.data)

              setShowMessage({success: true, message: "Product Updated Successfully"})

              setProduct({ name : product.name, price : product.price, description: product.description, category: product.category })
          })
          .catch(error => {
            console.log(error)
            setShowMessage({success: false, message: "Could not Update the product"})
          })
    
  }


  return (
    <div className='mx-2'>

      <h1 className='text-center mt-4'>Update Product Form</h1>

        <form onSubmit={handleSubmit} method="post" className='container mt-5 p-4 col-md-4 flex align-items-center'>
            <label htmlFor="name">Name : </label><input type="text" name="name" id="name" value={product.name} placeholder='Product Name' className='form-control' onChange={handleChange} required/>
            <label htmlFor="price">Price : </label><input type="number" name="price" id="price" value={product.price} className='form-control' placeholder='Product price' onChange={handleChange} required/>
            <label htmlFor="description">Description : </label><input type='text' name="description" id="desc" value={product.description} className='form-control' placeholder='Product description' onChange={handleChange} required/>
            <label htmlFor="category">Category : </label><input type="text" name="category" id="category" value={product.category} className='form-control' placeholder='Product category' onChange={handleChange} required/>

            <button type='submit' className='btn btn-primary mt-5'>Update</button>
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

export default UpdateProduct
