'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string;
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	onChange,
	defaultValue,
}) => {
	const [showAllIngredients, setShowAllIngredients] = useState(false);
	const [inputSearchValue, setInputSearchValue] = useState('');

	const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputSearchValue(e.target.value);
	};

	const listIngredients = showAllIngredients
		? items.filter(item => item.text.toLocaleLowerCase().includes(inputSearchValue.toLowerCase()))
		: defaultItems?.slice(0, limit);

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAllIngredients && (
				<div className='mb-5'>
					<Input
						onChange={onChangeInputSearch}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{listIngredients.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={id => console.log(id)}
					/>
				))}
			</div>
			{items.length > limit && (
				<div
					className={
						showAllIngredients ? 'border-t border-t-neutral-100 mt-4' : ''
					}>
					<button
						className='text-primary mt-3 cursor-pointer'
						onClick={() => setShowAllIngredients(!showAllIngredients)}>
						{showAllIngredients ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
