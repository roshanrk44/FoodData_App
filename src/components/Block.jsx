import React from 'react'
import {Link} from 'react-router-dom'
import "./Block.css"
export default function ({data}) {
  return (

        <div className='cont'>
            <div className='photo'><img  src={data.image}/></div>
            <div className='text'>
            <h2>{data.name}</h2>
            <p>Category: {data.category}</p>
            <p>Nutrition grade: {data.grade.toUpperCase()}</p>
            </div>
          <div className='but'><Link to={`/info/${data.id}`}><button>View Details</button></Link></div>
            
        </div>
  )
}
