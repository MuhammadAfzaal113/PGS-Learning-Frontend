import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const location = useLocation();
  
 

  return (
    <div className="fixed h-30 rounded-lg left-3 right-3 bottom-3 bg-[#E5DDEE]">
      <div className="flex justify-around p-2">
       <p className="">Copyrights Futuro 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default BottomBar;