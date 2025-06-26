import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import Checked from "@/assets/checked.json"

const status = () => {
    const [key, setKey] = useState(0);

    const options = {
        loop: false,  
        autoplay: true, 
        animationData: Checked,  
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };

      useEffect(() => {
        setKey(prevKey => prevKey + 1);  
      }, []);

      
  return (
    <div className='mt-[-5px] mb-[-9px]'>
      <Lottie key={key} options={options} height={50} width={50} />
    </div>
  )
}

export default status
