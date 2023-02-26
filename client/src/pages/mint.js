import React, { useState } from 'react'
import { ethers } from 'ethers';
import Head from 'next/head';
import { contractAddress, contractABI, BEARER } from '@/constants';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import Loader from '@/components/Loader';

const mint = () => {
  const [formData, setFormData] = useState({ title: '', category: '', description: '', price: '', fileURI: '' });
  const [imgBase64, setImgBase64] = useState();
  const [FileUrl, setFileUrl] = useState()

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const makeId = async (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const pinFileToIPFS = async () => {
    const formsData = new FormData();

    formsData.append('file', FileUrl)

    const result = await makeId(10);

    console.log(result);

    const metadata = JSON.stringify({
      name: result,
    });

    formsData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })

    formsData.append('pinataOptions', options);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formsData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formsData._boundary}`,
          Authorization: BEARER
        }
      });

      console.log("This is the response: " + res.data.IpfsHash);
      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;

    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    const { title, category, description, price, fileURI } = formData;
    e.preventDefault();
    try {
      setIsLoading(true);
      const uploadedUrl = await pinFileToIPFS()

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(contractAddress, contractABI, provider);
      const parsedAmount = ethers.utils.parseEther(price);
      const transactionHash = await Contract.connect(signer).mintNFT(title, category, description, uploadedUrl, parsedAmount, { value: parsedAmount });
      await transactionHash.wait();
      setIsLoading(false);
      window.location = '/shop';
    } catch (error) { setIsLoading(false); }
  }

  const changeImage = async (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result
      setImgBase64(file)
      setFileUrl(e.target.files[0])
    }
  }

  return (
    <>
      <Head>
        <title>CodeLek - Buy NFT</title>
      </Head>
      <div className='text-gray-800 overflow-y-auto'>
        {isLoading && <Loader />}
        <div className="text-gray-800">
          <div className='text-gray-800 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
            {/* {isLoading && <Loader />} */}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#2a2a2b] dark:bg-gray-300 rounded-[10px]">

              <h1 className="font-sans font-bold sm:text-[25px] text-[18px] leading-[38px] text-white dark:text-black">Start Creating a Product</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">

              <div className="flex flex-wrap gap-[40px]">
                <CustomInput name={'title'} text={'Set NFT Title'} type={'text'} handleChange={handleChange} />
                <CustomInput name={'category'} text={'Set NFT Category'} type={'text'} handleChange={handleChange} />
              </div>

              <CustomInput name={'description'} text={'Set NFT Description'} type={'text'} handleChange={handleChange} isTextarea />

              <div className="flex flex-col justify-center items-center">
                <img
                  alt="NFT"
                  className="w-40 h-40 object-cover cursor-pointer rounded-md mt-3"
                  src={imgBase64 || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-wrap gap-[40px]">
                <CustomInput name={'price'} text={'Set NFT Price'} type={'number'} handleChange={handleChange} />

                <label className="flex-1 w-full flex flex-col">
                  <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">NFT File *</span>

                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#b3b3b4] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#6d7077] rounded-[10px] sm:min-w-[300px] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400"
                    onChange={changeImage}
                    required
                  />
                </label>
              </div>

              <div className="flex justify-center items-center mt-[40px]">
                <CustomButton handleClick={() => { }} text={'Submit'} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default mint