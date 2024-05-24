import { Button } from '@/components/ui/button';
import React from 'react';

const UserCard = ({ imageSrc, value, description, link }) => {
	return (
		<div className='container grid space-x-6'>
			<div className='rounded-lg overflow-hidden shadow-lg p-8 my-5 border-2 border-black border-dashed'>
				<img
					className='w-full rounded-lg bg-black'
					src={imageSrc}
					alt={'img' + value}
				/>
				<div className='flex flex-col py-4 w-full gap-4 justify-center'>
					<div className='flex justify-center'>
						<p className='text-gray-700 text-2xl'>{description}</p>
					</div>
					<Button>Login</Button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
