import React from 'react'

const CustomButton = ({ handleClick, styles, text }) => {
  return (
    <button onClick={() => handleClick()} className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-600 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring focus:ring-pink-300 focus:ring-opacity-80 ml-3 ${styles}`}>
      {text}
    </button>
  )
}

export default CustomButton