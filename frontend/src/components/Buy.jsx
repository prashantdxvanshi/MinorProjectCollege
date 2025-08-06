import React from 'react'
import { useParams } from 'react-router-dom';

const Buy = () => {
    const courseId=useParams();
   
  return (
    <div>
       buy component
    </div>
  )
}

export default Buy
