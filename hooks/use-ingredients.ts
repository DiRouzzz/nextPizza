import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useIngredients = () => {
	const [ingredientsItems, setIngredientsItems] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const ingredients = await Api.ingredients.getAll();
				setIngredientsItems(ingredients);
			} catch (error) {
				console.log('Ошибка useFilterIngredients', error);
			} finally {
				setLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	return {
		ingredientsItems,
		loading,
	};
};
