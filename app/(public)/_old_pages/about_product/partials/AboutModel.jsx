'use client';
import React, { useState } from 'react';
import ThreeDComponent from '@/components/threedmodel/threedcomponent';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

const AboutModel = () => {
	const [currentModelIndex, setCurrentModelIndex] = useState(0);
	const models = [
		'/sample3D/InSearchOfANewPath.glb',
		'/sample3D/TheGoldenAge.glb',
		'/sample3D/InSearchOfANewPath.glb',
		'/sample3D/TheGoldenAge.glb',
	];

	const handleNext = () => {
		setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
	};

	const handlePrev = () => {
		setCurrentModelIndex(
			(prevIndex) => (prevIndex - 1 + models.length) % models.length
		);
	};

	return (
		<div className='flex flex-row items-center h-fit gap-4 w-full'>
			<div className='flex flex-col gap-4 items-center h-[800px] justify-center flex-grow'>
				<div className='w-[100%] h-[90%]'>
					<Canvas shadows>
						<ambientLight />
						<pointLight position={[10, 10, 10]} castShadow />
						<ThreeDComponent
							url={models[currentModelIndex]}
							position={[0, -2, 0]}
							rotation={[0, Math.PI / 4, 0]}
							scale={[2, 2, 2]}
						/>
						<OrbitControls />
					</Canvas>
				</div>
			</div>
			<div className='flex flex-col items-end justify-end gap-2'>
				<div className='flex flex-col items-center gap-2'>
					<button onClick={handlePrev}>
						<MdOutlineKeyboardArrowUp size={30} />
					</button>
					<p className='text-2xl font-bold'>0{currentModelIndex + 1}</p>
					{currentModelIndex === models.length - 1 ? (
						''
					) : (
						<p className='text-sm'>0{currentModelIndex + 2}</p>
					)}
					<button onClick={handleNext}>
						<MdOutlineKeyboardArrowDown size={30} />
					</button>
				</div>
			</div>
		</div>
	);
};
export default AboutModel;
