import React from 'react';
import { Progress } from '@/components/ui/progress';

const ProductReviews = () => {
	return (
		<div>
			<p className='text-2xl font-extrabold'>Reviews</p>
			<div className='grid grid-cols-6'>
				<div className='col-span-2 flex flex-col gap-2'>
					<div className='flex gap-5 items-center'>
						<p className='text-5xl font-bold'>4.9</p>
						<div className='text-xs font-bold w-full'>
							<div className='flex items-center gap-2'>
								<p>5</p>
								<Progress value={80} className='h-1 w-10' />
							</div>
							<div className='flex items-center gap-2'>
								<p>4</p>
								<Progress value={80} className='h-1 w-10' />
							</div>
							<div className='flex items-center gap-2'>
								<p>3</p>
								<Progress value={10} className='h-1 w-10' />
							</div>
							<div className='flex items-center gap-2'>
								<p>2</p>
								<Progress value={33} className='h-1 w-10' />
							</div>
							<div className='flex items-center gap-2'>
								<p>1</p>
								<Progress value={5} className='h-1 w-10' />
							</div>
						</div>
					</div>
					<div>
						<div className='flex gap-3'>
							<img src='/Vectorstar.png' alt='' className='w-5 h-5' />
							<img src='/Vectorstar.png' alt='' className='w-5 h-5' />
							<img src='/Vectorstar.png' alt='' className='w-5 h-5' />
							<img src='/Vectorstar.png' alt='' className='w-5 h-5' />
							<img src='/Vectorstar.png' alt='' className='w-5 h-5' />
						</div>
					</div>
					<p className='text-xs'>2 comments</p>
				</div>
				<div className='col-span-4 grid gap-4'>
					<div className='flex gap-8'>
						<div>
							<img src='/Ellipse9Jack.png' alt='userImage' />
						</div>
						<div className='flex flex-col gap-2'>
							<p className='font-bold'>Jack Kashani</p>
							<div className='flex gap-1'>
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<p className='text-xs'>5.0</p>
							</div>
							<p className='font-bold'>
								I would like to share my review of the "Cammy Painting"
							</p>
							<p>
								I recently purchased this stunning piece of painting and I must say it
								has exceeded my expectations. Visually appealing and will buy again.
								Very satisfying
							</p>
						</div>
					</div>
					<div className='flex gap-8'>
						<div>
							<img src='/Ellipse9Jeff.png' alt='userImage' />
						</div>
						<div className='flex flex-col gap-2'>
							<p className='font-bold'>Jefferson Mendez</p>
							<div className='flex gap-1'>
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<img src='/Vectorstar.png' alt='' className='w-3 h-3' />
								<p className='text-xs'>5.0</p>
							</div>
							<p className='font-bold'>
								I would like to share my review of the "Cammy Painting"
							</p>
							<p>
								I recently purchased this stunning piece of painting and I must say it
								has exceeded my expectations. Visually appealing and will buy again.
								Very satisfying
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductReviews;
