import { cn } from '@/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
	imageUrl: string;
	name: string;
	onClickAdd?: VoidFunction;
	className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	name,
	imageUrl,
	onClickAdd,
}) => {
	return (
		<div className={cn(className, 'flex flex-1')}>
			<div
				className={cn(
					'flex items-center justify-center flex-1 relative w-full',
					className
				)}>
				<img
					src={imageUrl}
					alt='Logo'
					className={cn(
						'relative left-2 top-2 transition-all z-10 duration-300 w-[400px] h-[400px]'
					)}
				/>
			</div>
			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />
				<p className='text-gray-400'>TextDetails</p>
				<Button className='h-[55px] px-10 text-base rounded-[18px] w-full cursor-pointer mt-10'>
					Добавить в корзину
				</Button>
			</div>
		</div>
	);
};
