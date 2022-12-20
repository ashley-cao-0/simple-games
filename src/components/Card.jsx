import React from "react";
import { Link } from "react-router-dom";

const Card = ({content}) => {
  const {route, description, img} = content
  return ( 
    <Link to= {route}>
      <div className=" w-80 h-60 hover:shadow-2xl transition-all duration-150 shadow-md shadow-gray-400 bg-white rounded-md overflow-hidden">
        <h1 className=" text-xl p-3"> {description} </h1>
        <img src= {img} className=" object-cover"/>
      </div>
     </Link>
   );
}
 
export default Card;