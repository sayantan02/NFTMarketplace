import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { SiEthereum } from 'react-icons/si';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsInfoCircle } from 'react-icons/bs';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/constants';
import MyNFTCard from '@/components/MyNFTCard';
import ToggleChange from '@/components/ToggleChange';
import Loader from '@/components/Loader';

const truncate = (str) => {
  try {
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  } catch (error) { }
}


const profile = ({ currentAccount }) => {
  const [toggleChangePrice, setToggleChangePrice] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [myNFTData, setMyNFTData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getYourNFTs = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        const AllNFTs = await Contract.getAllNFTs();

        const myNFTs = await AllNFTs.filter((item) => item.nftOwner.toLowerCase() == (accounts[0]).toLowerCase());

        const structuredNFTs = myNFTs.map((item) => ({
          tokenId: parseInt(item.tokenId._hex),
          nftOwner: item.nftOwner,
          title: item.title,
          category: item.category,
          description: item.description,
          price: ethers.utils.formatEther(parseInt(item.price._hex).toString()),
          fileURI: item.fileURI,
          timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
          isOnSale: item.isOnSale
        }))
        setMyNFTData(structuredNFTs);
      } else {
        console.log("No accounts found");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const showToggle = (item, id) => {
    setCurrentIndex(id);
    setCurrentItem(item);
    { toggleChangePrice ? setToggleChangePrice(false) : setToggleChangePrice(true) }
  }

  const getTransactions = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);
        const AllTransactions = await Contract.getAllTransactions();


        const myTransactions = await AllTransactions.filter((item) => item.from.toLowerCase() == (accounts[0]).toLowerCase() || item.to.toLowerCase() == (accounts[0]).toLowerCase());

        const structuredTransactions = await myTransactions.map((item) => ({
          transactionID: parseInt(item.transactionID._hex),
          from: item.from,
          to: item.to,
          title: item.nftTitle,
          transactionPrice: ethers.utils.formatEther(parseInt(item.transactionPrice._hex).toString()),
          timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString()
        }));

        setTransactionData(structuredTransactions);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getYourNFTs();
    getTransactions();
  }, [])


  return (
    <>
      <Head>
        <title>CodeLek - My Profile</title>
      </Head>

      <style jsx>
        {`
        /* white glassmorphism */
        .white-glassmorphism {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .eth-card {
          background-color:#a099ff;
          background-image: 
            radial-gradient(at 83% 67%, rgb(152, 231, 156) 0, transparent 58%), 
            radial-gradient(at 67% 20%, hsla(357,94%,71%,1) 0, transparent 59%), 
            radial-gradient(at 88% 35%, hsla(222,81%,65%,1) 0, transparent 50%), 
            radial-gradient(at 31% 91%, hsla(9,61%,61%,1) 0, transparent 52%), 
            radial-gradient(at 27% 71%, hsla(336,91%,65%,1) 0, transparent 49%), 
            radial-gradient(at 74% 89%, hsla(30,98%,65%,1) 0, transparent 51%), 
            radial-gradient(at 53% 75%, hsla(174,94%,68%,1) 0, transparent 45%);
        }
        
        `}
      </style>
      {isLoading && <Loader />}
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">

          <div className='w-full lg:flex justify-between sm:block lg:flex-row-reverse '>

            <div className="p-3 justify-end items-start flex-col rounded-lg h-40 sm:w-72 w-full eth-card white-glassmorphism">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start ">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#FFF" />
                  </div>
                  <BsInfoCircle title={currentAccount} fontSize={17} color="#FFF" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {truncate(currentAccount)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-5'>
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Your <span className="text-pink-500">Owned NFTs.</span></h1>

              <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                All your owned NFTs are listed here.
              </p>
            </div>

          </div>


          <div className="mt-20 grid grid-cols-1 gap-8 xl:mt-12 xl:gap-12 md:grid-cols-3 xl:grid-cols-3">

            {myNFTData.length > 0 && myNFTData.map((nft, indexId) => (
              <MyNFTCard
                key={indexId}
                currentAccount={currentAccount}
                nfts={nft}
                handleClick={() => { showToggle(nft, indexId) }}
              />
            ))}

            {myNFTData.length <= 0 && (
              <h1 className='text-red-600 '>You don't have any NFT's purchased, try creating one!</h1>
            )}

            {toggleChangePrice && (
              <ToggleChange
                NFTData={currentItem}
                currentIndex={currentIndex}
                close={() => setToggleChangePrice(false)}
                currentAccount={currentAccount} />
            )}


          </div>

          <div className='mt-5'>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Your <span className="text-pink-500">Transactions.</span></h1>

            <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
              All Incomming and Outgoing Transactions related to your account is listed here.
            </p>
          </div>

          <div className="flex my-5 flex-col space-y-4 inset-0 z-50 outline-none focus:outline-none bg-gray-900">

            {transactionData.map((item) =>
              <div key={item.transactionID} className="flex flex-col p-8 bg-white dark:bg-gray-800 shadow-md hover:shodow-lg rounded-lg">
                <div className="flex items-center justify-between">

                  {item.from.toLowerCase() == currentAccount.toLowerCase() ? (

                    <div className="flex items-center">
                      <div className="flex flex-col ml-3">
                        <div className="flex items-center">
                          <p title={item.from} className='font-medium text-sm leading-none text-gray-100 mr-2'>{truncate(item.from)}</p>
                          <BsFillArrowUpCircleFill className='text-red-500' />
                        </div>
                        <p title={item.to} className="ml-3 text-sm text-gray-500 leading-none mt-1">To: {truncate(item.to)}
                        </p>
                      </div>
                    </div>
                  ) : (

                    <div className="flex items-center">
                      <div className="flex flex-col ml-3">
                        <div className="flex items-center">
                          <p title={item.from} className='font-medium text-sm leading-none text-gray-100 mr-2'>{truncate(item.from)}</p>
                          <BsFillArrowDownCircleFill className='text-green-500' />
                        </div>
                        <p title={item.to} className="ml-3 text-sm text-gray-500 leading-none mt-1">To: {truncate(item.to)}
                        </p>
                      </div>
                    </div>

                  )}

                  <span className="flex items-center bg-pink-500 px-1 ml-1 py-1 text-sm shadow-sm font-medium tracking-wider border-2 border-pink-500 text-white rounded-full">
                    <SiEthereum className='text[10] mr-1' />{item.transactionPrice}</span>

                </div>

                <div className="mt-2 ml-2 flex justify-between items-center">
                  <p className='font-bold text-sm'>{item.title}</p>
                  <p className='font-normal text-xs'>{item.timestamp}</p>
                </div>

              </div>
            )}

            {transactionData.length <= 0 && (
              <h1 className='text-red-600 '>No Transactions Yet!</h1>
            )}

          </div>

        </div>
      </section>


    </>
  )
}

export default profile