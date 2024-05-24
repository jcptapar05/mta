import React from 'react';
const Card = ({
	data,
	hideTitle,
	hideDescription,
	hidePrice,
	hideCategories,
	hideRoomType,
	hideDesigner,
	hideArtist,
	hidePrimaryColors,
	hideStock,
	hideLearnMore,
	addToCart,
	hideAddToCart,
}) => {
	const addtoCartFunction = () => {
		addToCart(data);
	};
	return (
		<div className='grid grid-cols-2 w-full h-full overflow-hidden p-8'>
			<img
				src={data.img}
				alt={data.title}
				className='w-full h-auto object-cover mb-4 col-span-2'
			/>
			{!hideTitle && <h2 className='text-xl font-bold mb-2'>{data.title}</h2>}
			{!hidePrice && (
				<p className='font-bold text-xl mb-2 justify-self-end'>{data.price}</p>
			)}
			{!hideDescription && (
				<div className='mb-2 col-span-2 w-4/5'>
					<p className='text-gray-700'>{data.description}</p>
				</div>
			)}
			{!hidePrimaryColors && (
				<div className='grid grid-cols-2 text-sm text-gray-600 mb-2 col-span-2  '>
					<div className='flex space-x-2'>
						{data.primaryColors.map((color, index) => (
							<span
								key={index}
								className='w-6 h-6 rounded-full'
								style={{ backgroundColor: `#${color}` }}
							></span>
						))}
					</div>
					{!hideLearnMore && (
						<div className='justify-self-end'>
							<p>Learn More</p>
						</div>
					)}
				</div>
			)}
			{!hideCategories && (
				<ul className='flex gap-2 mb-2 col-span-2'>
					{data.categories.map((category) => (
						<li key={category}>{category}</li>
					))}
				</ul>
			)}
			{!hideRoomType && (
				<ul className='flex gap-2 mb-2 col-span-2'>
					{data.roomTypes.map((room) => (
						<li key={room}>{room}</li>
					))}
				</ul>
			)}
			{!hideStock && (
				<p className='text-sm text-gray-600 mb-2'>Total Stock: {data.stock}</p>
			)}
			{(!hideArtist || !hideDesigner) && (
				<p className='text-sm text-gray-600 mb-2 justify-self-end'>
					{data.designer || data.artist}
				</p>
			)}
			{!hideAddToCart && (
				<button
					onClick={() => addtoCartFunction()}
					className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer'
				>
					Add to Cart
				</button>
			)}
		</div>
	);
};

export default Card;
