'use client';
import Card from '@/components/card/Card';
import React, { useState, useEffect } from 'react';
const cardData = [
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

const Popular = () => {
	const [imageRatios, setImageRatios] = useState({});
	const maxImagesToShow = 5; // Number of images to display

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

	// Get the first 5 card items from the data
	const limitedCardData = cardData.slice(0, maxImagesToShow);

	return (
		<div>
			<div className='grid grid-cols-2'>
				<div className='font-bold text-2xl'>Popular</div>
				<div className='justify-self-end'>View All</div>
			</div>
			<div className='grid grid-cols-6 gap-4'>
				{limitedCardData.map((item, index) => {
					let colSpanClass;
					let rowSpanClass;

					// Calculate col-span and row-span based on image aspect ratio
					const aspectRatio = item.img in imageRatios ? imageRatios[item.img] : 1;
					if (aspectRatio < 1) {
						colSpanClass = 'col-span-2';
						rowSpanClass = 'row-span-2';
					} else if (aspectRatio >= 1 && aspectRatio < 2) {
						colSpanClass = 'col-span-3';
						rowSpanClass = 'row-span-1';
					} else {
						colSpanClass = 'col-span-6';
						rowSpanClass = 'row-span-1';
					}

					return (
						<div key={index} className={`${colSpanClass} ${rowSpanClass}`}>
							<Card
								data={item}
								hideCategories
								hideRoomType
								hideStock
								hideArtist
								hideDesigner
								hideSizesAvailable
								hideAddToCart
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Popular;
