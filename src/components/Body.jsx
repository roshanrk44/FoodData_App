import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Block from "./Block";
import "./Body.css";

export default function Body() {
    const [items, setItems] = useState([]);
    const [page, setpage] = useState(1);
    const [category, setCategory] = useState([]);
    const [currcategory, setcurrcategory] = useState("Snacks");
    const [sort,setsort] = useState("Name A-Z")
    const [searchtype,settype] = useState("Name")
    const [name,setname] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://world.openfoodfacts.org/categories.json');
                const data = await res.json();
                setCategory(data.tags);
            } catch (err) {
                console.log({ "error while fetching category": err });
            }
        };
        fetchData();  
    }, []);
    useEffect(()=>{
        let temp=[...items];
        setItems([]);
    if(sort==="Name A-Z")
    {
        const sortedItems = temp.sort((a, b) => a.name.localeCompare(b.name));
        setItems(sortedItems);
    }
    else if(sort==="Name Z-A")
        {
            const sortedItems = temp.sort((a, b) => b.name.localeCompare(a.name));
            setItems(sortedItems);
        }
        else if(sort==="Nutrition Grade")
        {
            const sortedItems = temp.sort((a, b) => a.grade.localeCompare(b.grade));
            setItems(sortedItems);
        }
    },[sort])
    useEffect(()=>{
        setpage(1)
    },[currcategory])
    useEffect(() => {
        setItems([])
        const handleItems = async () => {
            try {
                const res = await fetch(`https://world.openfoodfacts.org/category/${currcategory}.json?page=${page}`);
                const datam = await res.json();
                const products = datam.products.map(item => ({
                    name: item.product_name_en || "No Name",
                    id: item._id,
                    image: item.image_front_url,
                    category: item.compared_to_category,
                    grade: item.nutriscore_grade
                }));
                const sortedItems = products.sort((a, b) => a.name.localeCompare(b.name));

                setItems(sortedItems);
            } catch (err) {
                console.log({ "error while fetching category items": err });
            }
        };
        handleItems();
    }, [currcategory,page]);

    return (
        <>
        <div className='list'>
            <div className="search">
            <div >Category: 
                <br />
               <select onChange={(e)=>setcurrcategory(e.target.value)}>
                   {category.map((item, key) => (
                       <option key={key} value={item.name}>{item.name}</option>
                   ))}
               </select>
               </div>
               <div>
                <label>Sort By:  </label>
                <br />
                <select onChange={(e)=>setsort(e.target.value)}>
                    <option>Name A-Z</option>
                    <option>Name Z-A</option>
                    <option>Nutrition Grade</option>
                </select>
               </div>
            </div>
               <div className='searchby'>
           <label>Search by: </label> 
           <br />
           <select onChange={(e)=>settype(e.target.value)}> 
            <option>Name</option>
            <option>BarCode</option>
           </select>
           <input placeholder='Type name/Barcode' value={name} onChange={(e)=>setname(e.target.value)}/>
           <Link to={`./input/${name}/${searchtype}`}><button>Submit</button></Link>
           </div>
        </div>
            {items.length === 0 ? (
                <div className="loading">
                    <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="loading..." />
                </div>
            ) : (
                <>
                <div className="products">
                    {items.map((item, key) => (
                        <Block key={key} data={item} />
                    ))}  
                </div>
                 <div className='but'>
                        {
                        (page!=1)?(<button className='prev' onClick={()=>setpage(page-1)}>Prev</button>):(<></>)
                        }
                <button className='next' onClick={()=>setpage(page+1)}>Next</button>
            </div>
                </>
            )} 
        </>
    );
}
