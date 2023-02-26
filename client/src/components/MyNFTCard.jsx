import React from 'react'
import { SiEthereum } from 'react-icons/si';

const MyNFTCard = ({ nfts, handleClick }) => {
  return (
    <div onClick={handleClick} className="cursor-pointer p-8 space-y-3 border-2 border-pink-400 dark:border-pink-300 rounded-xl">
      <img className='rounded-lg w-full h-[200px]' src={nfts.fileURI} alt={nfts.title} />

      <div className='flex flex-wrap justify-between items-center'>
        <h1 className='font-bold'>{nfts.title}</h1>
        <div className='flex flex-row items-center'>
          <div className='border-2 border-gray-500 rounded-full p-1 mr-1'>
            <SiEthereum className='text-[20px]' />
          </div>
          <h3>{nfts.price}</h3>
        </div>
      </div>
    </div>
  )
}

export default MyNFTCard