import {
	Title,
	Container,
	TopBar,
	Filters,
	ProductsGroupList,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />
			<Container className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					{/* Фильтрация */}
					<div className='w-[250px]'>
						<Filters />
					</div>
					{/* Список товаров */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пицца'
								items={[
									{
										id: 1,
										name: 'Диабло',
										imageUrl: './chickenPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 2,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 3,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 4,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
								]}
								categoryId={1}
							/>
							<ProductsGroupList
								title='Комбо'
								items={[
									{
										id: 1,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 2,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 3,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
									{
										id: 4,
										name: 'Диабло',
										imageUrl: './diabloPizza.png',
										price: 449,
										items: [{ price: 449 }],
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
