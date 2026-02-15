import React from "react"
import ElectricBorder from "./ElectricBorder"

function Cards({ item }) {
  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.12}
      thickness={2}

    >
      <a
        href={`https://docs.google.com/gview?url=${item.pdf}&embedded=true`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="border-[2px] p-3 card bg-base-96 shadow-xl w-full">
          <figure>
            <img src={item.image || "/bookcard.jpg"} alt={item.name} />
          </figure>

          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>

            <p>{item.title}</p>

            <div className="card-actions justify-between">
              <div className="badge badge-outline shadow-xl">
                $ {item.price}
              </div>
              <div className="border-[2px] px-2 py-1 rounded-lg bg-base shadow-xl hover:bg-blue-500">
                {item.category}
              </div>
            </div>
          </div>
        </div>
      </a>
    </ElectricBorder>
  )
}

export default Cards
