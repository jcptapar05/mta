import { create } from 'zustand'

export const useImageStore = create((set) => ({
  selectedImage: null,
  selectImage: (imageData) => set({ selectedImage: imageData }),
}));