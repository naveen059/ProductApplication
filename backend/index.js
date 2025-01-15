import express, { request } from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import Product from "./Models/product.model.js"
import userRoute from "./routes/user.route.js";

dotenv.config()


const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

const app = express();
app.use(express.json())
app.use(cors())


app.listen(PORT, () => {
    console.log("Server is running at port :" + PORT)
})


mongoose
    .connect(mongo_url)
    .then( res => console.log("database connected") )
    .catch(err => console.log("database connection error"))



//Insertion

app.post('https://productapplication.onrender.com/api/insertProduct', async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.description || !product.category){
        res.status(400).json({
            success: false,
            data : "Please Provide all the fields"
        })
    }


    


    

    const newProduct = new Product(product);

    try{
        await newProduct.save();

        res.status(200).json({
            success : true,
            data : newProduct,
        })

    }catch(err){
        res.status(500).json({
            success: false,
            data : "Could not Insert the Product"
        })
    }
})


//Getting all products

app.get('https://productapplication.onrender.com/api/allProducts', async (req, res) => {
    try{

        const products = await Product.find({});


        if(!products){
            res.status(404).json({
                success: false,
                data: "No Products found",
            })
        }


        res.status(200).json({
            success: true,
            data: products,
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            data: "Failed to get the Products from the database",
        })
    }
})


app.get('https://productapplication.onrender.com/api/singleProduct/:id', async (req, res) => {
    try{

        const {id} = req.params;

        const product = await Product.find({"_id" : id});


        if(!product){
            res.status(404).json({
                success: false,
                data: "No Products found",
            })
        }


        res.status(200).json({
            success: true,
            data: product,
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            data: "Failed to get the Products from the database",
        })
    }
})


//update a product


app.put('https://productapplication.onrender.com/api/updateProduct/:id', async (req, res) => {
    const {id} = req.params;

    const product = req.body;


    if(!product && !id){
        res.status(400).json({
            success: false,
            data: "product to be updated is not present"
        })
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});

        if(!updatedProduct){
            res.status(404).json({
                success: false,
                data: "No Products found that needs to updated",
            })
        }

        res.status(200).json({
            success: true, 
            data : updatedProduct,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            data: "Failed to Update the Product",
        })
    }
})


//delete the product


app.delete('https://productapplication.onrender.com/api/deleteProduct/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const deleteProduct = await Product.findByIdAndDelete(id);


        if(!deleteProduct){
            res.status(404).json({
                success: false,
                data: "No Products found that needs to deleted",
            })
        }

        res.status(200).json({
            success: true, 
            data : deleteProduct,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            data: "Failed to Delete the Product",
        })
    }
    
})


app.use("https://productapplication.onrender.com/api/users", userRoute);




