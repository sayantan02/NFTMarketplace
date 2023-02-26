import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = () => {


  return (
    <>
      <style jsx>
        {`
        .loader{
          z-index: 999;
        }
        `}
      </style>
      <div className="loader fixed inset-0 bg-[#000000cc] h-screen flex items-center justify-center flex-col">
        <div className="bg-[#111111] px-3 py-8 rounded-[15px] flex flex-col items-center justify-center">
          <CircularProgress size={70} thickness={4} color={'warning'} className="w-[100px] h-[100px] object-contain" />
          {/* <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/> */}
          <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">Procssing your request.<br /> Please wait...</p>
        </div>
      </div>
    </>
  )
}

export default Loader