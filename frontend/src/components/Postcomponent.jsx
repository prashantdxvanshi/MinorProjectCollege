import React from 'react'

const Postcomponent = ({title,description,price,imageurl}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{imageurl}</div>
    </div>
  )
}

export default Postcomponent
