"use client"
import React, { useState } from 'react';
import ThreeDComponent from '@/components/threedmodel/threedcomponent';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const ThreeDModelPartial = () => {
  const [isControlling, setIsControlling] = useState(false);
  return (
      <div className='flex flex-col h-full w-full'>
        <div className='flex flex-col gap-4 items-center justify-center flex-grow'>
          <div className='w-[60%] h-[90%]'>
            <Canvas shadows>
              <ambientLight />
              <pointLight position={[10, 10, 10]} castShadow />
              <ThreeDComponent
                url="/sample3D/InSearchOfANewPath.glb"
                position={[0, -2, 0]}
                rotation={[0, Math.PI / 4, 0]}
                scale={[2, 2, 2]}
              />
              <OrbitControls
              onStart={() => setIsControlling(true)}
              onEnd={() => setIsControlling(false)}
              />
            </Canvas>
          </div>
          <div className='flex justify-center'>
          {isControlling ? <img src="3d.svg" alt="3D Image" className=' invisible' /> 
          : <img src="3d.svg" alt="3D Image" className='visible' />
          }
          </div>
          </div>
          <div className='flex flex-col items-end justify-end gap-2'>
          <div className='flex gap-4 justify-center'>
            <span className='py-4 px-4 bg-black rounded-full'></span>
            <span className='py-4 px-4 bg-[#cdb69c] rounded-full'></span>
            <span className='py-4 px-4 bg-[#70abac] rounded-full'></span>
          </div>
          <div className='flex items-center justify-end w-full'>
            <span className='text-sm'>Dominant Color </span>
          </div>
        </div>
      </div>
  );
};

export default ThreeDModelPartial;