'use client';
import React, { useState, useEffect } from 'react';
import YourSelection from './YourSelection';
import CardSummary from './CardSummary';

const YourSelectionPage = () => {
	const [allQuantities, setAllQuantities] = useState([]);
	const [uniqueCartData, setUniqueCartData] = useState([]);

	useEffect(() => {
		const getUniqueCartItems = () => {
			try {
				if (typeof window !== 'undefined' && window.localStorage) {
					const cartItemsJSON = window.localStorage.getItem('cart');
					if (cartItemsJSON !== null) {
						const cartItems = JSON.parse(cartItemsJSON);

						// Create an object to track unique cards by ID
						const uniqueCards = {};

						// Filter out duplicate cards based on their IDs
						cartItems.forEach((cartItem) => {
							const { id, quantity } = cartItem;
							if (!uniqueCards[id]) {
								uniqueCards[id] = {
									...cartItem,
									quantity,
								};
							} else {
								// If a card with the same ID exists, update its quantity
								uniqueCards[id].quantity += quantity;
							}
						});

						// Convert the object of unique cards back to an array
						const uniqueCartItems = Object.values(uniqueCards);

						setUniqueCartData(uniqueCartItems);
					}
				}
			} catch (error) {
				console.error('Error parsing cart data:', error);
			}
		};

		getUniqueCartItems();
	}, []);

	return (
		<div>
			<p className='py-2'>
				Home Page - Animals - About Product - <strong>Your Selection</strong>
			</p>
			<div className='grid grid-cols-2'>
				<p className='text-3xl font-bold py-4'>Your Selection</p>
				<p className='text-base font-bold py-4'>Cart Summary</p>
			</div>
			<div className='grid grid-cols-2'>
				{/* Conditionally render YourSelection based on whether uniqueCartData is available */}
				{uniqueCartData.length > 0 ? (
					<YourSelection
						cardsData={uniqueCartData}
						quantities={allQuantities}
						setQuantities={setAllQuantities}
					/>
				) : (
					<p>Loading...</p>
				)}
				<CardSummary cardsData={uniqueCartData} quantities={allQuantities} />
			</div>
		</div>
	);
};

export default YourSelectionPage;
