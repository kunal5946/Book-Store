import React from 'react'

function Cards({item}) {
    
  return (
   <>
   <a 
   href={`http://localhost:4000${item.pdf}`} 
   target="_blank"
   rel="noopener noreferrer"
   >
   <div>
    <div className="  border-[2px] my-2 p-3 card bg-base-96 shadow-xl w-full shadow-sm">
  <figure>
    <img
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{item.title}</p>
    <div className="card-actions justify-between">
      <div className="badge badge-outline shadow-xl">$ {item.price}</div>
      <div className="border-[2px] cursor-pointer px-2 py-1 rounded-lg bg-base shadow-xl hover:bg-blue-500 ">{item.category}</div>
    </div>
  </div>
</div>
   </div>
   </a> 
   </>
  )
}

export default Cards