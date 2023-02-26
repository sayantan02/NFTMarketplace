import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import CustomButton from './CustomButton';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/constants';
import CustomInput from './CustomInput';
import Loader from './Loader';

const truncate = (str) => {
    try {
        return str.length > 15 ? str.substring(0, 15) + "..." : str;
    } catch (error) { }
}

const ToggleChange = ({ NFTData, currentIndex, currentAccount, close }) => {
    const [formData, setFormData] = useState({ newprice: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const changePrice = async (id) => {
        setIsLoading(true);
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const Contract = new ethers.Contract(contractAddress, contractABI, signer);
            const { newprice } = formData;
            const parsedPrice = ethers.utils.parseEther(newprice);
            const transactionHash = await Contract.changePrice(id, parsedPrice);
            await transactionHash.wait();
            setIsLoading(false);
            window.location.reload();

        } catch (error) { alert("Fill the form correctly!"); window.location = '/profile' }
    }

    return (
        <>
            <style jsx>
                {`
                .product::-webkit-scrollbar {
                    display: none;
                }

                .product {
                    z-index:999;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.7);

                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                  }
                  .under-elm{
                    width: 95vw;
                    height: 95vh;
                    background-color: rgba(0, 0, 0, 0.7);

                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                `}
            </style>
            <div className='product rounded-lg overflow-y-auto'>
                <div className='under-elm'>
                    {!currentAccount && (
                        <h2>connect your wallet to see This NFT.</h2>
                    )}

                    {currentAccount && (
                        <section className="text-gray-700 body-font dark:bg-black">
                            <AiOutlineClose fontSize={28} className="text-white float-right cursor-pointer mt-3 mr-3" onClick={close} />
                            <div className="container px-4 py-20 mx-auto">
                            {isLoading && <Loader /> }
                                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded-lg" src={NFTData.fileURI} />
                                    <div className="lg:w-1/2 w-full lg:pl-7 lg:py-6 mt-6 lg:mt-0">
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{NFTData.category}</h2>
                                        <span className='flex flex-row justify-between'>
                                            <h1 className="text-white text-3xl title-font font-medium mb-1">{NFTData.title}</h1>
                                            {NFTData.isOnSale ? (
                                                <div className='text-white p-2 bg-green-600 rounded-sm'>
                                                    On Sale
                                                </div>
                                            ) : (
                                                <div className='text-white p-2 bg-red-600 rounded-sm'>
                                                    Not On Sale
                                                </div>
                                            )}
                                        </span>
                                        <div className="flex mb-4">


                                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                                <p title={NFTData.nftOwner} className="flex-1 font-epilogue font-normal text-[18px] text-white ">Owner: {truncate(NFTData.nftOwner)}</p>
                                            </span>
                                        </div>
                                        <p className="text-white leading-relaxed">{NFTData.description}</p>
                                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                            <p className='text-gray-300 font-normal'>{NFTData.timestamp}</p>
                                        </div>
                                        <div className="flex">
                                            <div className='flex flex-wrap align-middle items-center'>
                                                <SiEthereum fontSize={18} color="#FFF" /><span className="title-font font-medium text-2xl text-white mx-2">{NFTData.price}</span>
                                            </div>
                                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex mt-4">
                                            <CustomInput
                                                noLabel
                                                text="Set your new Price "
                                                type={'number'}
                                                name={"newprice"}
                                                handleChange={handleChange}
                                            />

                                            {currentAccount.toString().toLowerCase() == NFTData.nftOwner.toLowerCase() ? (
                                                <CustomButton text={'List for Sale'} handleClick={() => changePrice(parseInt(NFTData.tokenId) - 1)} styles={'bg-pink-500 hover:bg-pink-300'} />
                                            ) : (
                                                <CustomButton text={'Login with Your Account'} handleClick={() => { }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    )}
                </div>
            </div>
        </>
    )
}

export default ToggleChange