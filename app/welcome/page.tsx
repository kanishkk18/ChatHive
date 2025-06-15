'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const Welcome = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/auth');
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-white border-none md:w-[100%]">
      <div className="bg-blue-950 h-[100%] w-[100%] border-none rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-12 h-[50%] border-none bg-white rounded-br-[50px] ">
          <img
            className="mx-auto w-[100%] h-[100%] border-none"
            src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1722763372/Kanishkk/wyijlznceiujzdmehyzf.png" 
            alt="illustration"
          />
        </div>
        <div className='bg-white h-[50%] w-[100%]'>
          <div className='bg-blue-950 h-[100%] w-[100%] border-none justify-center grid items-center rounded-tl-[50px]'>
            <h1 className="text-3xl font-500 text-center text-white mb-2">
              Let's connect<br/>with each other
            </h1>
            <p className="text-center text-xl text-gray-400 mb-2">
              chatting endless limitless,<br/> keep your loved one's closer
            </p>
            <button className="w-[70%] flex ml-auto mr-auto justify-center self-center bg-red-600 text-white font-semibold py-4 px-4 rounded-2xl hover:bg-white hover:text-black transition duration-300" onClick={handleNext}>
              Let's Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;