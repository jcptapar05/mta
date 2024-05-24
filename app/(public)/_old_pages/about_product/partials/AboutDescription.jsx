import { Button } from '@/components/ui/button';
import React from 'react';

const AboutDescription = () => {
	return (
		<div className='flex flex-col gap-4'>
			<p className='text-4xl font-bold'>Cammy Painting</p>
			<p>
				The art of painting consists of the arrangement of shapes, lines, colours,
				tones, and textures on a two-dimensional surface, thus creating an aesthetic
				image. More than one cannot say.
			</p>
			<div className='flex items-center gap-2'>
				<img src='/Vectorstar.png' alt='' className='w-4 h-4' />
				<img src='/Vectorstar.png' alt='' className='w-4 h-4' />
				<img src='/Vectorstar.png' alt='' className='w-4 h-4' />
				<img src='/Vectorstar.png' alt='' className='w-4 h-4' />
				<img src='/Vectorstar.png' alt='' className='w-4 h-4' />
				<p>4.9</p>
			</div>
			<div className='flex items-center gap-2'>
				<p>Materials: </p>
				<p>Acrylic White</p>
			</div>
			<div className='flex items-center gap-2'>
				<p>Frame Size: </p>
				<p>60" x 80"</p>
			</div>
			<div className='flex flex-col gap-2'>
				<p>Color Palette in Painting</p>
				<div className='flex gap-2'>
					<span className='w-9 h-9 bg-[#eca855] rounded-full'></span>
					<span className='w-9 h-9 bg-[#84bd9b] rounded-full'></span>
					<span className='w-9 h-9 bg-[#005072] rounded-full'></span>
				</div>
			</div>
			<p className='font-bold text-xl'>$549.25</p>
			<div className='flex flex-col gap-4'>
				<Button className='w-1/3'>Add To Order</Button>
				<Button className='w-1/3'>Enter Gallery</Button>
			</div>
		</div>
	);
};

export default AboutDescription;
