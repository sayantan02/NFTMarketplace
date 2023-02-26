import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <>
            {/* <style jsx>
                {`
            #hero{
                background-image: url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80');
                
                -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
                
                clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
            }
            `}
            </style> */}
            <div>
                <div className="container px-6 py-16 mx-auto">
                    <div className="items-center lg:flex">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Purchase and Mint <br /> Your own <span className="text-yellow-500 font-bold ">NFT</span></h1>

                                <p className="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>

                                <Link href={'/shop'}>
                                    <button className="w-[10rem] px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-pink-600 rounded-lg lg:w-auto hover:bg-pink-500 focus:outline-none focus:bg-pink-500">Shop Now</button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                            <img loading='lazy' className=" mt-3 w-[30rem] h-[30rem] lg:max-w-3xl" src="https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960" alt="Catalogue-pana.svg" />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Hero