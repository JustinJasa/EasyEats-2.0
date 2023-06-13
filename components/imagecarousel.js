import React from 'react'
import { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export default function ImageCarousel({ children: pictures}) {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr(curr => curr === 0 ? pictures.length - 1 : curr - 1)
    const next = () => setCurr(curr => curr === pictures.length - 1 ? 0 : curr + 1)

  return (
    <div className="overflow-hidden relative">
        <div className="flex transition-transform ease-out rounded-xl duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
            {pictures}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                <FaAngleLeft size={15} />
            </button>
            <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                <FaAngleRight size={15} />
            </button>
        </div>
    </div>
  )
}
