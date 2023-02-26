import Link from 'next/link';
import React from 'react'
import { SiEthereum } from 'react-icons/si';

const truncate = (str) => {
  return str.length > 15 ? str.substring(0, 60) + "..." : str;
}


const SingleCard = ({ nfts }) => {
  return (
    <Link href={`/nft/${nfts.tokenId - 1}?price=${nfts.price}`}>
      <div className="sm:w-[288px] w-full rounded-[15px] bg-[#121218] cursor-pointer">
        <img src={nfts.fileURI} alt="fund" className="w-full h-[200px] object-cover rounded-[15px]" />

        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center mb-[18px]">
            {/* <img src="../../assets/placeholder.png" alt="tag" className="w-[17px] h-[17px] object-contain" /> */}
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{nfts.category}</p>
          </div>

          <div className="block">
            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{nfts.title}</h3>
            {/* <p title={product.owner} className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{product.owner}</p> */}
          </div>
          <div className='text-white font-light font-sans'>
            {truncate(nfts.description)}
          </div>

          <div className="align-middle mt-[15px] gap-2">
            <div className="flex flex-row ">
              <SiEthereum fontSize={18} color="#FFF" />
              <h3 className="font-epilogue mx-2 font-semibold text-[14px] text-[#b2b3bd] leading-[22px]"> {nfts.price}</h3>
              {/* <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate"></p> */}
            </div>
            <br />

          </div>
          <div className='mt-3 flex w-full justify-center items-center'>
            {/* <CustomButton
            title={ValidateUser() ? ("Sell"):("Purchase")}
            btnType="button"
            styles={ValidateUser() ? ("bg-[#0f1fce]"):("bg-[#ce0e77]")}
            handleClick={() => {}} /> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SingleCard