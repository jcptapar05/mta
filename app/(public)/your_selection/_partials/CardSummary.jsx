'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useRef, useEffect } from 'react';

const promoCodeActions = {
	DISCOUNT10: (total) => 10,
	'10PERCENTOFF': (total) => (10 / 100) * total,
};
const CardSummary = ({ cardsData, quantities }) => {
	const [promoCode, setPromoCode] = useState('');
	const [discount, setDiscount] = useState(0);
	const [showAlert, setShowAlert] = useState(false);
	const inputRef = useRef(null);

	const totalItems = quantities.reduce((acc, qty) => acc + qty, 0);
	const total = React.useMemo(() => {
		return cardsData.reduce((acc, card, index) => {
			const quantity = quantities[index] || 0;
			return acc + card.price * quantity;
		}, 0);
	}, [cardsData, quantities]);

	const subtotal = React.useMemo(() => {
		return cardsData.reduce((acc, card, index) => {
			const quantity = quantities[index] || 0;
			return acc + card.price * quantity;
		}, 0);
	}, [cardsData, quantities]);

	const finalTotal = total - discount;

	const formatCurrency = (amount) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);

	const formattedSubtotal = formatCurrency(subtotal);
	const formattedTotal = formatCurrency(finalTotal);

	const handleApplyPromo = () => {
		if (totalItems === 0) {
			setDiscount(0);
			alert('You must have items in your cart to apply a promotional code.');
			return;
		}

		const discountAction = promoCodeActions[promoCode];

		if (discountAction) {
			const discountAmount = discountAction(total);
			setDiscount(discountAmount);
			setShowAlert(false);
		} else if (!promoCode) {
			setShowAlert(false);
		} else {
			setShowAlert(true);
			setDiscount(0);
		}
	};
	useEffect(() => {
		if (totalItems === 0) {
			setDiscount(0);
			setPromoCode('');
		}
	}, [totalItems]);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setShowAlert(false);
			}
		};

		const handleFocus = () => {
			if (promoCode && !promoCodeActions[promoCode]) {
				setShowAlert(true);
			}
		};

		document.addEventListener('click', handleOutsideClick);
		if (inputRef.current) {
			inputRef.current.addEventListener('focus', handleFocus);
		}

		return () => {
			document.removeEventListener('click', handleOutsideClick);
			if (inputRef.current) {
				inputRef.current.removeEventListener('focus', handleFocus);
			}
		};
	}, [promoCode, showAlert]);

	return (
		<div className='grid grid-cols-2 gap-4 w-2/3 h-fit'>
			<p className='col-span-2 text-xs'>Total {cardsData.length} items</p>
			<p className='col-span-2 text-xs'>Add promotional code</p>
			<div className='col-span-2 relative'>
				{showAlert && (
					<Alert
						className='absolute flex items-center bg-white bottom-full left-0 mb-2 z-10'
						variant='destructive'
					>
						<AlertDescription>Invalid promotional code.</AlertDescription>
					</Alert>
				)}
				<div className='grid grid-cols-2 gap-4'>
					<Input
						ref={inputRef}
						type='text'
						placeholder='Enter Code'
						value={promoCode}
						onChange={(e) => setPromoCode(e.target.value)}
						disabled={totalItems === 0}
					/>
					<Button onClick={handleApplyPromo} disabled={totalItems === 0}>
						Apply
					</Button>
				</div>
			</div>
			<div className='flex justify-between col-span-2 text-xs'>
				<p>Subtotal</p>
				<p>{formattedSubtotal}</p>
			</div>
			<div className='flex justify-between col-span-2 text-xs'>
				<p>Discount</p>
				<p>${discount.toFixed(2)}</p>
			</div>
			<div className='flex justify-between col-span-2'>
				<p>Total</p>
				<p>
					<strong>{formattedTotal}</strong>
				</p>
			</div>
			<Button className='col-span-2'>Checkout</Button>
			<p className='col-span-2 text-xs'>Accepted payment methods</p>
			<div className='col-span-2 flex h-fit items-center gap-3'>
				<img className='h-[25px]' src='/paymentcards/visa.png' alt='visa image' />
				<img
					className='h-[35px]'
					src='/paymentcards/mastercard.png'
					alt='mastercard image'
				/>
				<img
					className='h-[50px]'
					src='/paymentcards/paypal.png'
					alt='paypal image'
				/>
			</div>
		</div>
	);
};

export default CardSummary;
