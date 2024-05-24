'use client';
import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
	const [selectedFilter, setSelectedFilter] = useState({
		type: null,
		value: null,
	});

	return (
		<ShopContext.Provider value={{ selectedFilter, setSelectedFilter }}>
			{children}
		</ShopContext.Provider>
	);
};

export const useShop = () => {
	return useContext(ShopContext);
};
