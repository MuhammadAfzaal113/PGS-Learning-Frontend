import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const location = useLocation();

  return (
    <div className="fixed w-[83%] bottom-3 bg-[#E5DDEE] rounded-lg h-12 flex items-center justify-center">
      <p className="text-center text-sm">
        Copyrights Futuro 2024 - All Rights Reserved
      </p>
    </div>

  );
};

export default BottomBar;
