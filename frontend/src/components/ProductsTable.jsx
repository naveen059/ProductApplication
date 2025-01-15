import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  var productId = null;
  const [showMessage, setShowMessage] = useState({success: false, message: ""})

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://productapplication.onrender.com/api/allProducts");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const deleteProduct = async (product_id) => {
    var status = prompt("Are you sure you want to delete this product");

    console.log(status);

    if(status === "yes"){
        await axios.delete(`https://productapplication.onrender.com/api/deleteProduct/${product_id}`)
            .then(res => {
                setProducts(products.filter((product) => product._id != product_id))

                console.log(products)

                setShowMessage({success: true, message: "deleted Successfully"})
            })
            .catch(err => {
                console.log("error deleting product")
                setShowMessage({success: false, message: "Could not delete the product"})
            })
    }
  }

  return (
    <>
    <table className="table">
        <thead>
            <tr>
                <th scope="col">id</th> 
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th colSpan={2} scope="col">Action</th>
            </tr>
        </thead>
        <tbody>

            {products.map((product, index) => (
                <tr key={product._id}>
                   <td>{index}</td> 
                   <td>{product.name}</td> 
                   <td>💰{product.price}</td> 
                   <td>{product.description}</td> 
                   <td>{product.category}</td> 
                   <td><button className="btn btn-secondary btn-sm" onClick={() => navigate(`/update`, {state: product._id})}>update</button></td> 
                   <td><button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>


    {showMessage.success == true ? (
        <div className='container mt-5 bg-success text-white'>
            {showMessage.message}
        </div>
        ) : (
        <div className='container mt-5 bg-danger text-white'>
            {showMessage.message}
        </div>
        )
    }
    </>
  );
}

export default ProductsTable;
