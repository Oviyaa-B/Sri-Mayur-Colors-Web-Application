import { create } from 'zustand';

const useDesignStore = create((set) => ({
  color: '#ffffff',
  material: 'Pure Cotton',
  pattern: 'Plain',

  setColor: (color) => set({ color }),
  setMaterial: (material) => set({ material }),
  setPattern: (pattern) => set({ pattern }),
}));

export default useDesignStore;
