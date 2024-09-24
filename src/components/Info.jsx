import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./Info.css"
import { useLocation, Link } from 'react-router-dom';
export default function Info() {
    const [id,setid]=useState(0)
    const [data,setdata] = useState({})
    const location = useLocation();
    
  useEffect(()=>{
    let temp= location.pathname;
    let code = Number(temp.substring(6))
    setid(code);
  },[location.pathname])
  useEffect(()=>{
  
    const handledata=async ()=>{
        if(id!==0)
        {
            try {
                let res=await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
                let datam=await res.json();
                console.log(datam)
                setdata(datam); 
            } catch (error) {
                console.log({error:"error while fetching"})
            }
        }
        }
        handledata();
    },[id])
        return (
            <div className='container'>
            { (data.product) ? 
            (
                <div className='main'>
                <div className='imge'><img src={data.product.image_front_url}/></div>
            <div className='details'>
                <h1>{data.product.product_name}</h1>
                <h3>Ingredients: </h3><p>{data.product.ingredients_text || "N/A"}</p>
                <h3>Nutrion value: </h3>
              <ul>
            <li>Energy: {data.product.nutriments.energy} kcal</li>
            <li>Fat: {data.product.nutriments.fat} g</li>
            <li>Carbohydrates: {data.product.nutriments.carbohydrates} g</li>
            <li>Proteins: {data.product.nutriments.proteins} g</li>
              </ul>
              <div className='lable'>
                <h3>Lables: </h3>
                {(data.product.ingredients[0].vegan==="yes") ? (<><img src='https://seeklogo.com/images/V/vegan-logo-ACE43D0D9E-seeklogo.com.png' width="60px"/></>
            ):(
                <>
                </>
            )}
                {(data.product.ingredients[0].vegetarian==="yes") ? (<><img src='https://www.clipartmax.com/png/middle/206-2065891_soups-and-salads-veg-logo-png.png' width="60px"/></>
            ):(
                <>
                <img src='https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png' width="60px"/>
                </>
            )}
              </div>
              <div className='nutrisce'>
            <h3>Nutri Score: </h3>
            
            <div><img src={`https://static.openfoodfacts.org/images/misc/nutriscore-${data.product.ecoscore_grade}.png`} alt={data.product.ecoscore_grade}/></div>
        </div> 
        <div className='but'>
       <Link to="/"><button>Exit</button></Link> 
        </div>
            </div>
                </div>
            ):(
                <div className='loading'><img src='https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif'/></div>
            )
        }
        </div>
       
  )
}
