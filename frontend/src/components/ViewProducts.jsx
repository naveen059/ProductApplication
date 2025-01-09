import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiAddCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/allProducts");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Product List</h3>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Price: </strong>${product.price}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Category: {product.category}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="card col-md-1 text-center mb-3 bg-warning" onClick={() => navigate("/insert")} style={{cursor: 'pointer'}}>
          <div className="card-body">
              <span style={{fontSize: '48px'}}>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
