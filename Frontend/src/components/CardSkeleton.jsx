import React from 'react'
import ElectricBorder from "./ElectricBorder"

function CardSkeleton() {
  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.12}
      thickness={2}
    >
      <div className="border-[2px] my-2 p-3 card bg-base-96 shadow-xl w-full">
        <figure className="w-full h-64 skeleton"></figure>

        <div className="card-body p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="skeleton h-6 w-2/3"></div>
            <div className="skeleton h-6 w-12 rounded-full"></div>
          </div>

          <div className="skeleton h-4 w-full mb-1 mt-2"></div>
          <div className="skeleton h-4 w-5/6 mb-4"></div>

          <div className="card-actions justify-between items-center mt-4">
            <div className="skeleton h-6 w-16 rounded-full"></div>
            <div className="skeleton h-8 w-24 rounded-lg"></div>
          </div>
        </div>
      </div>
    </ElectricBorder>
  )
}

export default CardSkeleton
