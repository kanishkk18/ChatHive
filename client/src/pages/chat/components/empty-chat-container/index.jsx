import React, { useState, useEffect } from "react";



const EmptyChatContainer = () => {
  const [wallpaper, setWallpaper] = useState('');

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('chatWallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);


  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex  flex-col justify-center items-center hidden duration-1000 transition-all" 
    style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-1000 text-center">
        
        <p className="poppins text-[16px] p-[2px] bg-black/45 rounded-[30px] ">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
