import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	activeId: number;
	setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>()(
	devtools(set => ({
		activeId: 1,
		setActiveId: (activeId: number) =>
			set({ activeId }, false, 'category/setActiveId'),
	}))
);
