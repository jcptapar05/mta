import { Button } from '@/components/ui/button';
import React from 'react';

const NewColections = () => {
	return (
		<div className='bg-[#F8F8F8] w-[40%] rounded-tr-[30px]'>
			<div className='px-20 py-20 flex flex-col gap-5'>
				<p className='text-5xl font-extrabold'>New Collections</p>
				<p className='leading-loose'>
					The art of painting consists of the arrangement of shapes, lines, colours,
					tones and textures on a two-dimensional surface, thus creating an aesthetic
					image. More than that one cannot say,
				</p>
				<Button className='w-1/2 py-7 text-lg'>View Collections</Button>
			</div>
		</div>
	);
};

export default NewColections;
