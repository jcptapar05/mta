'use client';
import CheckoutCardComponent from '@/components/card/CheckoutCard/CheckoutCard';
import React, { useState } from 'react';

const YourSelection = ({
	cardsData,
	quantities,
	setQuantities,
	cardsLength,
}) => {
	const [showFull, setShowFull] = useState(false);

	const toggleShowFull = () => {
		setShowFull(!showFull);
	};
	return (
		<div>
			<div className='grid grid-cols-3'>
				<div className='col-span-1 w-fit flex flex-col items-center gap-8'>
					<CheckoutCardComponent
						showFull={showFull}
						cards={cardsData}
						quantities={quantities}
						setQuantities={setQuantities}
						cardsLength={cardsLength}
					/>
					<button className=' text-xs' onClick={toggleShowFull}>
						{showFull ? 'See Less' : 'See All'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default YourSelection;
