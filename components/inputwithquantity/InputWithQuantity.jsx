'use client';
import * as React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const InputWithQuantity = ({ onQuantityChange }) => {
	const [quantity, setQuantity] = React.useState(0);

	const handleIncrement = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		onQuantityChange && onQuantityChange(newQuantity);
	};

	const handleDecrement = () => {
		const newQuantity = Math.max(quantity - 1, 0);
		setQuantity(newQuantity);
		onQuantityChange && onQuantityChange(newQuantity);
	};

	return (
		<div className='w-full flex h-10 rounded-md border-2 justify-between border-gray-300 px-3 py-2 text-sm'>
			Quantity
			<div className='flex gap-2 items-center'>
				<button onClick={handleDecrement}>
					<AiOutlineMinusCircle />
				</button>
				<span className='w-4 text-center'>{quantity}</span>
				<button onClick={handleIncrement}>
					<AiOutlinePlusCircle />
				</button>
			</div>
		</div>
	);
};

export default InputWithQuantity;
