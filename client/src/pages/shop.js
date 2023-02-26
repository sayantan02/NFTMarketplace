import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/constants';
import SingleCard from '@/components/SingleCard';
import Loader from '@/components/Loader';

const shop = () => {
  const [tokenData, setTokenData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        getNFTs();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNFTs = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(contractAddress, contractABI, signer);
    const allNFTs = await Contract.getAllNFTs();

    const AllNFTs = await allNFTs.filter((item) => item.isOnSale == true);

    try {
      const structuredNFTs = AllNFTs.map((items) => ({
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
      setTokenData(structuredNFTs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <Head>
        <title>CodeLek - Shop Now</title>
      </Head>
      {isLoading && <Loader />}
      <div className='max-w-full h-full flex relative overflow-y-hidden'>
        <div className='h-full w-full py-4 mx-2 flex flex-wrap items-start justify-center rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-auto'>



          {!currentAccount && (
            <div className='h-full w-full flex flex-row flex-wrap justify-center items-center'>
              <p className='text-white text-lg top-50 left-50'>Please Connect Metamask Wallet to see all Products.</p>
            </div>
          )}

          {tokenData.length <= 0 && currentAccount && (
            <div className='h-full w-full flex flex-row flex-wrap justify-center items-center'>
              <p className='text-white text-lg top-50 left-50'>No Products Found.</p>
            </div>
          )}


          {tokenData.length > 0 && tokenData.map((nft) =>
            <SingleCard
              key={nft.tokenId}
              nfts={nft}
            />
          )}
        </div>
      </div>
    </>
  )
};

export default shop