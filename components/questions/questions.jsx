import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Questions = () => {
	return (
		<div className='grid grid-cols-4'>
			<div className='col-span-3 flex justify-center'>
				<div className='w-full mx-32 flex flex-col gap-4'>
					<p className='text-4xl font-bold'>Questions</p>
					<p>
						If you have questions or problems, leave a request. We are here to help
						you every step of the way. Whether you need advice on choosing the perfect
						painting or have questions about our services, we’re here to help.
					</p>
				</div>
			</div>
			<div className='flex flex-col gap-4 mx-10'>
				<Input type='text' placeholder='Name' />
				<Input type='email' placeholder='Email' />
				<Input type='number' placeholder='Number' />
				<Button>Send</Button>
			</div>
		</div>
	);
};

export default Questions;
