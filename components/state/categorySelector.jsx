import React, { useState } from 'react';
import Card from '@/components/card/Home/Card';
import { PiCaretRightLight, PiCaretLeftLight } from 'react-icons/pi';

function CategorySelector({ cards, selectedCategory, selectedSize }) {
	const [currentPage, setCurrentPage] = useState(0);
	const cardsPerPage = 10;

	const filteredCards = cards.filter(
		(card) =>
			(!selectedCategory ||
				(card.categories &&
					card.categories
						.map((category) => category.toLowerCase())
						.includes(selectedCategory))) &&
			(!selectedSize ||
				(card.sizes &&
					card.sizes.map((size) => size.toLowerCase()).includes(selectedSize)))
	);

	const startIndex = currentPage * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;

	const currentCards = filteredCards.slice(startIndex, endIndex);

	return (
		<div className='w-full flex justify-center items-center flex-col'>
			<div className='grid grid-cols-4 items-center justify-center gap-8 w-[80%]'>
				{currentCards.length === 0 ? (
					<p className='col-span-4 text-center'>
						No cards available for the selected categories.
					</p>
				) : (
					currentCards.map((card, index) => (
						<Card
							key={index}
							title={card.title}
							imageSrc={card.img}
							description={card.description}
							categories={card.categories}
							sizes={card.sizes}
						/>
					))
				)}
			</div>
			{filteredCards.length > cardsPerPage && (
				<div className={'flex items-center justify-center col-span-2'}>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 0}
						className={`${currentPage === 0 ? 'invisible' : 'block'}`}
					>
						<PiCaretLeftLight size={40} />
					</button>
					<div className='flex gap-2 items-center'>
						{currentPage < 10 ? (
							<span className='font-extrabold text-xl'>0{currentPage + 1}</span>
						) : (
							<span className='font-extrabold text-xl'>{currentPage + 1}</span>
						)}
						{currentPage < 10 ? (
							<span
								className={`font-light text-xs ${
									endIndex >= filteredCards.length ? 'invisible' : ''
								}`}
							>
								0{currentPage + 2}
							</span>
						) : (
							<span
								className={`font-light text-xs ${
									endIndex >= filteredCards.length ? 'invisible' : ''
								}`}
							>
								{currentPage + 2}
							</span>
						)}
					</div>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={endIndex >= filteredCards.length}
						className={`${endIndex >= filteredCards.length ? 'invisible' : ''}`}
					>
						<PiCaretRightLight size={40} />
					</button>
				</div>
			)}
		</div>
	);
}

export default CategorySelector;
