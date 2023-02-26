import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SiEthereum } from 'react-icons/si';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/constants';
import CustomButton from '@/components/CustomButton';
import Head from 'next/head';
import Loader from '@/components/Loader';

const truncate = (str) => {
  try {
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  } catch (error) { }
}


const Nft = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [NFTData, setNFTData] = useState({});
  const [NFTOwner, setNFTOwner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { nft } = router.query;
  const NFTId = nft;
  const price = router.query.price;

  const checkIfWalletIsConnected = async () => {
    try {
      setIsLoading(true);
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, contractABI, signer);

        const AllNFTs = await Contract.getAllNFTs();

        const structuredNFTs = await AllNFTs.map((items) => ({
          tokenId: parseInt(items.tokenId._hex),
          nftOwner: items.nftOwner,
          title: items.title,
          category: items.category,
          description: items.description,
          price: ethers.utils.formatEther(parseInt(items.price._hex).toString()),
          fileURI: items.fileURI,
          timestamp: new Date(items.timestamp.toNumber() * 1000).toLocaleString(),
          isOnSale: items.isOnSale
        }));
        setNFTData(structuredNFTs[NFTId]);
        setNFTOwner(structuredNFTs[NFTId].nftOwner);
      } else {
        alert("Connect your Wallet first.");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const purchaseNFT = async () => {
    // Initialize Loader...
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(contractAddress, contractABI, signer);

      const parsedAmount = ethers.utils.parseEther(price.toString());
      const transactionHash = await Contract.connect(signer).buyNFT(parseInt(nft), { value: parsedAmount });
      await transactionHash.wait();
      // Stop the Loader...
      setIsLoading(false);
      window.location = '/shop';
    } catch (error) {
      setIsLoading(false);
      if (error.code == 'ACTION_REJECTED') {
        window.location = '/shop';
      } else if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
        alert("You cannot Purchase this NFT!");
      }
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <>
      <Head>
        <title>CodeLek - NFTs</title>
      </Head>
      <div>
        {isLoading && <Loader />}
        {currentAccount && !NFTData && (
          <h2>No NFT found with this Token ID</h2>
        )}
        {!currentAccount && (
          <h2>connect your wallet to see This NFT.</h2>
        )}

        {currentAccount && NFTData && (
          <section className="text-gray-700 body-font bg-black">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded-lg" src={NFTData.fileURI} />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{NFTData.category}</h2>
                  <span className='flex flex-row justify-between'>
                    <h1 className="text-white text-3xl title-font font-medium mb-1">{NFTData.title}</h1>
                    {NFTData.isOnSale ? (
                      <div className='text-white font-bold p-2 bg-green-600 rounded-sm'>
                        On Sale
                      </div>
                    ) : !NFTData.isOnSale ? (
                      <div className='text-white font-bold p-2 bg-red-600 rounded-sm'>
                        Not On Sale
                      </div>
                    ) : (
                      <h1>Another</h1>
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

                    {currentAccount.toString().toLowerCase() == NFTOwner.toLowerCase() ? (
                      <CustomButton text={'You Own This Product'} handleClick={() => { }} styles={'bg-pink-500 hover:bg-pink-300'} />
                    ) : currentAccount.toString().toLowerCase() != NFTOwner.toLowerCase() ? (
                      <CustomButton text={'Purchase'} handleClick={purchaseNFT} />
                    ) : (
                      <h1>Something Went Wrong!</h1>
                    )}

                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        )}
      </div>
    </>
  )
}

export default Nft