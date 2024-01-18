import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./dash.css"
const DashCard = ({title,counts,link}) => {
    const navigate = useNavigate();
    return (
        <div className='dish-card'>
            <h1>{title}</h1>
            <h3>Count: <span>{counts}</span></h3>
            <button onClick={()=>navigate(`${link}`)}>View All</button>
        </div>
    )
}

export default DashCard
