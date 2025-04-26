import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useMemo, useState } from 'react';

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	typeDoughOfPizza: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	typeDoughOfPizza: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
	setTypeDoughOfPizza: (value: string) => void;
}
//Этот хук отвечает за хранение состояния фильрации

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams();

	// Фильтр ингредиентов
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	);

	//Фильтр размеров
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	);

	//Фильтр типа теста пиццы
	const [typeDoughOfPizza, { toggle: toggleTypeDoughOfPizza }] = useSet(
		new Set<string>(
			searchParams.has('typeDoughOfPizza')
				? searchParams.get('typeDoughOfPizza')?.split(',')
				: []
		)
	);

	//Фильтр стоимости
	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({ ...prev, [name]: value }));
	};

	return useMemo(
		() => ({
			sizes,
			typeDoughOfPizza,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setTypeDoughOfPizza: toggleTypeDoughOfPizza,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[sizes, typeDoughOfPizza, selectedIngredients, prices]
	);
};
