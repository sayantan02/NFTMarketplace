import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import CustomButton from './CustomButton';
// import { user } from '../../public/user.png';

const Navbar = ({currentAccount, connectAccount}) => {
  // Define States
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style jsx>
        {`      
          .sticky {
              position: fixed;
              top: 0;
              width: 100%;
              z-index:990;
          }
      `}
      </style>

      <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <Link className="text-3xl font-bold font-heading" href={"/"}>CodeLek.com</Link>

              {/* <!-- Mobile menu button --> */}


              <div className="flex lg:hidden">
                {!menuOpen ? (
                  <button type="button" onClick={() => setMenuOpen(true)} className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                    <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                ) : (
                  <button type="button" onClick={() => setMenuOpen(false)} className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                    <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${menuOpen ? 'translate-x-0 opacity-100 h-[100vh]' : 'opacity-0 -translate-x-full'}`}>
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">

                <Link onClick={() => setMenuOpen(false)} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href={'/'}>
                  Home
                </Link>

                <Link onClick={() => setMenuOpen(false)} className='px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700' href={'/mint'}>Mint NFT</Link>

                <Link onClick={() => setMenuOpen(false)} className='px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700' href={'/shop'}>Buy NFT</Link>

                <Link onClick={() => setMenuOpen(false)} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href={'/about'}>
                  About Us</Link>
                  
                <Link onClick={() => setMenuOpen(false)} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href={'/contact'}>
                  Contact Us
                </Link>

              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                <Link onClick={() => setMenuOpen(false)} href={'/notification'}>
                  <button className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Link>

                {currentAccount &&                 
                <Link onClick={() => setMenuOpen(false)} href={'/profile'}>
                  <button type="button" className="flex items-center focus:outline-none">
                    <div className="w-8 h-8 overflow-hidden border-1 border-gray-400 rounded-full">
                      <img src='https://cdn-icons-png.flaticon.com/128/1177/1177568.png' className="object-cover w-full h-full" alt="avatar" />
                    </div>
                  </button>
                </Link>
                }
                {currentAccount ? <Link href={'/mint'}><CustomButton handleClick={()=> {}} text={'Create NFT'} /></Link> : <CustomButton handleClick={connectAccount} text={'connect Wallet'}/>}
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar