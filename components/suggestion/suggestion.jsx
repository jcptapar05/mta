'use client';
import Card from '@/components/card/Card';
import React, { useState, useEffect } from 'react';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
const cardData = [
	{
		img: '/extrawide.png',
		title: 'Art Title',
		price: '$100',
		description:
			'Enjoy shopping with our exclusive offer free shipping on all purchase over $1000 so hurry to take advantage of the offer.',
		categories: ['Abstract', 'Modern'],
		roomTypes: ['Fitness', 'Living'],
		designer: 'John Doe',
		artist: null,
		primaryColors: ['FF5733', '33FF57', '3357FF'],
		stock: 50,
		sizesAvailable: 'extra wide',
	},
	{
		img: 'https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg',
		price: '$100',
		title: 'Art Title',
		description:
			'Enjoy shopping with our exclusive offer free shipping on all purchase over $1000 so hurry to take advantage of the offer.',
		categories: ['Abstract', 'Modern'],
		roomTypes: ['Bedroom'],
		designer: 'John Doe',
		artist: null,
		primaryColors: ['3358FF', 'FF3333', 'F0FF33'],
		stock: 50,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		price: '$100',
		title: 'Art Title',
		description:
			'Enjoy shopping with our exclusive offer free shipping on all purchase over $1000 so hurry to take advantage of the offer.',
		categories: ['Abstract', 'Modern'],
		roomTypes: ['Living', 'Bedroom'],
		designer: 'Jack',
		artist: null,
		primaryColors: ['3358FF', 'FF3333', 'F0FF33'],
		stock: 50,
		sizesAvailable: 'portrait',
	},
	{
		img: '/wallart.png',
		price: '$100',
		title: 'Art Title',
		description:
			'Enjoy shopping with our exclusive offer free shipping on all purchase over $1000 so hurry to take advantage of the offer.',
		categories: ['Abstract', 'Modern'],
		roomTypes: ['Living', 'Fitness'],
		designer: 'John Doe',
		artist: null,
		primaryColors: ['3358FF', 'FF3333', 'FFC5EA'],
		stock: 50,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		title: 'Entrance Elegance',
		price: '$100',
		description: 'A modern take on abstract art, perfect for a grand entrance.',
		categories: ['Abstract', 'Animals'],
		roomTypes: ['Entrance'],
		designer: 'John Doe',
		artist: 'null',
		primaryColors: ['FF5733', 'D1E8E2', '33FF57'],
		stock: 50,
		sizesAvailable: 'portrait',
	},
	{
		img: '/painting.png',
		title: 'Wild Lobby',
		price: '$120',
		description:
			'Experience the wilderness from the comfort of your lobby with this animal-themed masterpiece.',
		categories: ['Animals'],
		roomTypes: ['Lobby'],
		designer: 'Julius',
		artist: 'Jane Smith',
		primaryColors: ['3358FF', 'FF3333', 'F0FF33'],
		stock: 30,
		sizesAvailable: 'landscape',
	},
	{
		img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
		title: 'Corridor Calmness',
		price: '$140',
		description:
			'An architectural art piece that brings serenity to your corridors.',
		categories: ['Architectural'],
		roomTypes: ['Corridor'],
		designer: 'Alice',
		artist: 'Bob Smith',
		primaryColors: ['D1E8E2', 'FFC3A0', 'FF5733'],
		stock: 40,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		title: 'Elevator Escapade',
		price: '$110',
		description: 'A cartoonish delight to lighten up your elevator lobby!',
		categories: ['Cartoon'],
		roomTypes: ['Elevator Lobby'],
		designer: 'Charlie',
		artist: 'David',
		primaryColors: ['FFC3A0', 'D1E8E2', 'FF5733'],
		stock: 45,
		sizesAvailable: 'landscape',
	},
	{
		img: '/wallart.png',
		title: 'Fitness Finesse',
		price: '$130',
		description: 'A creative blend of colors to motivate your fitness routines.',
		categories: ['Creative'],
		roomTypes: ['Fitness'],
		designer: 'Eva',
		artist: 'Frank',
		primaryColors: ['D1E8E2', 'FFC3A0', 'FF5733'],
		stock: 35,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		title: 'Elevator Escapade',
		price: '$110',
		description: 'A cartoonish delight to lighten up your elevator lobby!',
		categories: ['Cartoon'],
		roomTypes: ['Elevator Lobby'],
		designer: 'Charlie',
		artist: 'David',
		primaryColors: ['FFC3A0', 'D1E8E2', 'FF5733'],
		stock: 45,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		title: 'Elevator Escapade',
		price: '$110',
		description: 'A cartoonish delight to lighten up your elevator lobby!',
		categories: ['Cartoon'],
		roomTypes: ['Elevator Lobby'],
		designer: 'Charlie',
		artist: 'David',
		primaryColors: ['FFC3A0', 'D1E8E2', 'FF5733'],
		stock: 45,
		sizesAvailable: 'landscape',
	},
	{
		img: '/painting.png',
		title: 'Elevator Escapade',
		price: '$110',
		description: 'A cartoonish delight to lighten up your elevator lobby!',
		categories: ['Cartoon'],
		roomTypes: ['Elevator Lobby'],
		designer: 'Charlie',
		artist: 'David',
		primaryColors: ['FFC3A0', 'D1E8E2', 'FF5733'],
		stock: 45,
		sizesAvailable: 'landscape',
	},
];
const Suggestion = () => {
	const [imageRatios, setImageRatios] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 3; // Number of cards to display per page
	useEffect(() => {
		// Function to calculate and set aspect ratios for card images
		const calculateImageRatios = () => {
			const ratios = {};
			cardData.forEach((item) => {
				const img = new Image();
				img.src = item.img;
				img.onload = () => {
					const aspectRatio = img.height > 0 ? img.width / img.height : 1;
					ratios[item.img] = aspectRatio;
					setImageRatios((prevRatios) => ({ ...prevRatios, ...ratios }));
				};
			});
		};

		// Calculate image aspect ratios when the component mounts
		calculateImageRatios();
	}, []);

	// Filter the cardData array to get only portrait images
	const portraitImages = cardData.filter((item) => {
		const aspectRatio = item.img in imageRatios ? imageRatios[item.img] : 1;
		return aspectRatio < 1;
	});

	// Calculate the total number of pages
	const totalPages = Math.ceil(portraitImages.length / pageSize);

	// Function to handle "Next Page" button click
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// Function to handle "Previous Page" button click
	const previousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Calculate the start and end indices of the cards to display on the current page
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	return (
		<div>
			<p className='text-2xl font-bold'>You May also like</p>
			<div className='grid grid-cols-6 gap-4'>
				{portraitImages.slice(startIndex, endIndex).map((item, index) => {
					return (
						<div key={index} className='col-span-2 row-span-2'>
							<Card
								data={item}
								hideCategories
								hideRoomType
								hideStock
								hideDescription
								hideArtist
								hideDesigner
								hideSizesAvailable
								hideLearnMore
								hideAddToCart
							/>
						</div>
					);
				})}
			</div>
			{totalPages > 1 && (
				<div className='flex justify-center gap-2 items-center mt-4'>
					<button onClick={previousPage} disabled={currentPage === 1}>
						<MdOutlineKeyboardArrowLeft size={30} />
					</button>
					<p className='font-bold text-2xl'>0{currentPage}</p>
					{currentPage === pageSize ? (
						''
					) : (
						<p className='text-xs'>0{currentPage + 1}</p>
					)}
					<button onClick={nextPage} disabled={currentPage === totalPages}>
						<MdOutlineKeyboardArrowRight size={30} />
					</button>
				</div>
			)}
		</div>
	);
};

export default Suggestion;
