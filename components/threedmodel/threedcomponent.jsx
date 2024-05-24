"use client"
import React from 'react';
import { useGLTF } from '@react-three/drei';

const ThreeDComponent = ({ url, position, rotation, scale }) => {
  const { scene } = useGLTF(url);

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default ThreeDComponent;