import getURL from '@/middleware/getUrl'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useUserStore } from './users'

export const useCartStore = create(persist(
	(set, get) => ({
		cartItems: [],
		cartId: null,
		setCartId: (data) => set({ cartId: data }),
		addToCartItems: (item) => {
			set({ cartItems: item })
			UpdateDatabase(item)
		},
	}),
	{
		name: 'cart', // name of the item in the storage (must be unique)
		storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
	}
))

const UpdateDatabase = async (cartItems) => {
	const user = useUserStore.getState().user;
	if (user) {
		const res = await fetch(getURL("/api/v1/public/carts"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: cartItems, userdata: user }),
			next: {
				revalidate: 0,
			},
		});
	}
};