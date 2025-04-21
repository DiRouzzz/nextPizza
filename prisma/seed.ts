import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const up = async () => {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Vasya Test',
				email: 'vasyatest@mail.ru',
				password: hashSync('qwerty111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin Test',
				email: 'admintest@mail.ru',
				password: hashSync('qwerty222', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({ data: categories });

	await prisma.ingredient.createMany({ data: ingredients });

	await prisma.product.createMany({ data: products });

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Бургер',
			imageUrl: './burger.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl: './chickenPizza.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Диабло',
			imageUrl: './diabloPizza.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	});

	await prisma.productItem.createMany({
		data: [
			{
				productId: pizza1.id,
				pizzaType: 1,
				price: 390,
				size: 20,
			},
			{
				productId: pizza1.id,
				pizzaType: 2,
				price: 490,
				size: 30,
			},
			{
				productId: pizza1.id,
				pizzaType: 2,
				price: 590,
				size: 40,
			},
			{
				productId: pizza2.id,
				pizzaType: 1,
				price: 410,
				size: 20,
			},
			{
				productId: pizza2.id,
				pizzaType: 1,
				price: 510,
				size: 30,
			},
			{
				productId: pizza2.id,
				pizzaType: 1,
				price: 610,
				size: 40,
			},
			{
				productId: pizza2.id,
				pizzaType: 2,
				price: 440,
				size: 20,
			},
			{
				productId: pizza2.id,
				pizzaType: 2,
				price: 540,
				size: 30,
			},
			{
				productId: pizza2.id,
				pizzaType: 2,
				price: 640,
				size: 40,
			},
			{
				productId: pizza3.id,
				pizzaType: 1,
				price: 470,
				size: 20,
			},
			{
				productId: pizza3.id,
				pizzaType: 2,
				price: 579,
				size: 30,
			},
			{
				productId: pizza3.id,
				pizzaType: 2,
				price: 639,
				size: 40,
			},
			{
				productId: 1,
				price: 330,
			},
			{
				productId: 2,
				price: 369,
			},
			{
				productId: 3,
				price: 190,
			},
			{
				productId: 4,
				price: 280,
			},
			{
				productId: 5,
				price: 210,
			},
			{
				productId: 6,
				price: 180,
			},
			{
				productId: 7,
				price: 330,
			},
			{
				productId: 8,
				price: 340,
			},
			{
				productId: 9,
				price: 210,
			},
			{
				productId: 10,
				price: 230,
			},
			{
				productId: 11,
				price: 340,
			},
			{
				productId: 12,
				price: 280,
			},
			{
				productId: 13,
				price: 240,
			},
			{
				productId: 14,
				price: 230,
			},
			{
				productId: 15,
				price: 230,
			},
			{
				productId: 16,
				price: 190,
			},
			{
				productId: 17,
				price: 200,
			},
		],
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '222222',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	});
};

const down = async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
};

const main = async () => {
	try {
		await down();
		await up();
	} catch (error) {
		console.log('Error main', error);
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async error => {
		console.log('Error ', error);
		await prisma.$disconnect();
		process.exit(1);
	});
