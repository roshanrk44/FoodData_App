import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Block from "./Block.jsx";
import React from 'react';

export default function Input() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [sortType, setSortType] = useState("");
    const [stype, setStype] = useState("");
    const location = useLocation();
    const navigate = useNavigate(); 
    let path = location.pathname;

    useEffect(() => {
        setPage(1)
        const parts = path.split("/");
        const names = parts[2]?.toLowerCase() || "";
        const searchType = parts[3] || "Name";
        const sort = "Name A-Z"
        setName(names);
        setStype(searchType);
        setSortType(sort);
        handleItems(names, searchType, sort, page);
    }, [path]);
    useEffect(() => {
        let temp = [...items];
        if (sortType === "Name A-Z") {
            temp.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "Name Z-A") {
            temp.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortType === "Nutrition Grade") {
            temp.sort((a, b) => a.grade.localeCompare(b.grade));
        }
        setItems(temp);
    }, [sortType]);
    useEffect(() => {
        setItems([])
        const sort = "Name A-Z"
        setSortType(sort)
        handleItems(name, stype, sort, page);
    }, [page]);
    const handleItems = async (name, stype, sortType, page) => {
        try {
            let res;
            if (stype === "Name") {
                res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&json=true&page=${page}`);
                const data = await res.json();
                if(data.products)
                {
                    const products = data.products.map(item => ({
                        name: item.product_name_en || "No Name",
                        id: item._id,
                        image: item.image_front_url,
                        category: item.compared_to_category,
                        grade: item.nutriscore_grade || "No Grade",
                    }));
                    setItems(products);
                }
                
            } else {
                res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${name}.json`);
                const data = await res.json();
                if(data.product)
                {
                    let arr=[{
                        name: data.product.product_name_en || "No Name",
                        id: data.product._id,
                        image: data.product.image_front_url,
                        category: data.product.compared_to_category,
                        grade: data.product.nutriscore_grade || "No Grade",
                    }]
                    setItems(arr)
                }
               
            }
          
            
        } catch (err) {
            console.log({ "error while fetching category items": err });
        }
    };
    const updateURL = () => {
        setItems([])
        navigate(`/input/${name}/${stype}`);
    };

    return (
        <>
            <div className='list'>
                <div className="search">
                    <div>
                        <label>Sort By: </label>
                        <br />
                        <select value={sortType} onChange={(e) => {
                            setSortType(e.target.value);
                        }}>
                            <option value="Name A-Z">Name A-Z</option>
                            <option value="Name Z-A">Name Z-A</option>
                            <option value="Nutrition Grade">Nutrition Grade</option>
                        </select>
                    </div>
                </div>

                <div className='searchby'>
                    <label>Search by: </label>
                    <br />
                    <select value={stype} onChange={(e) => {
                        setStype(e.target.value);
                    }}>
                        <option value="Name">Name</option>
                        <option value="BarCode">BarCode</option>
                    </select>

                    <input
                        placeholder='Type name/Barcode'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={updateURL}>Submit</button>
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
                        stype === "Name" && (
                            <div>
                                {page !== 1 && (
                                    <button className='prev' onClick={() => setPage(page - 1)}>Prev</button>
                            )}
                                <button className='next' onClick={() => setPage(page + 1)}>Next</button>
                    </div>
                    )
                    } 
                    </div>
                </>
            )}
        </>
    );
}
