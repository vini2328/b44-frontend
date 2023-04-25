import React,{useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import { API } from '../global';
import axios from "axios";  
import ProductCard from './ProductCard';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function ProductDisplay() {
  const [productData, setProductData] = useState([]);

  useEffect (()=>{
     getProducts()
  },[])

  // axios call or api call we can say

  const getProducts = () =>{
       axios.get(`${API}/product`).then((res)=>{
        if(res.status === 401){
          console.log("data no found")
        }
        console.log(res.data);
        setProductData(res.data);
      })

    }

   const handleDelete = (id) => {
    axios.delete(`${API}/product/`+id).then((res)=>{
      if(res.status === 200){
        getProducts()
      }
    })

    }
   const navigate =useNavigate()
  
  return (
    <>
        <h1>ProductDisplay</h1>
        <Button sx={{marginBottom:"10px"}} variant='contained' onClick={()=> navigate("/product/Addproduct")}>Create Product</Button>
        <Container>

        <box xs="5" >
        {productData.map((item)=>{
          return <ProductCard key={item.id} value={item} handleDelete={handleDelete}/> 
        })}
        </box>
       </Container>
       </>

  )
}

export default ProductDisplay