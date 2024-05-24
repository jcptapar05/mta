'use client';
import React, { useState, useEffect, useRef } from 'react';
import CheckoutCard from './partials/CheckoutCard';

const CheckoutCardComponent = ({
	showFull,
	cards,
	quantities,
	setQuantities,
	cardsLength,
}) => {
	const [maxHeight, setMaxHeight] = useState(null);
	const firstCardRef = useRef(null);

	useEffect(() => {
		if (maxHeight === null && firstCardRef.current) {
			setMaxHeight(`${firstCardRef.current.offsetHeight}px`);
		} else if (showFull) {
			setMaxHeight('1000px');
		} else if (!showFull && firstCardRef.current) {
			setMaxHeight(`${firstCardRef.current.offsetHeight}px`);
		}
	}, [showFull, maxHeight]);

	const overflowStyle =
		showFull || cardsLength > 1 ? 'overflow-y-auto' : 'overflow-y-hidden';

	const offScreenStyle =
		maxHeight === null
			? {
					position: 'absolute',
					top: '-9999px',
					left: '-9999px',
			  }
			: {};

	const handleQuantityChange = (index, quantity) => {
		const newQuantities = [...quantities];
		newQuantities[index] = quantity;
		setQuantities(newQuantities);
	};

	// Add a check to ensure that 'cards' is defined before mapping over it
	return (
		<div
			className={`grid gap-8 w-fit ${overflowStyle} transition-all duration-500 ease-in-out`}
			style={{ ...offScreenStyle, maxHeight: maxHeight || 'auto' }}
		>
			{cards?.map((card, index) => (
				<CheckoutCard
					title={card.title}
					price={card.price}
					materials={card.materials}
					size={card.sizesAvailable}
					colorPalette={card.primaryColors}
					key={index}
					imageSrc={card.img}
					ref={index === 0 ? firstCardRef : null}
					onQuantityChange={(quantity) => handleQuantityChange(index, quantity)}
				/>
			))}
		</div>
	);
};

export default CheckoutCardComponent;
