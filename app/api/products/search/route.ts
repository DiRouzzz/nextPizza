import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
	const query = req.nextUrl.searchParams.get('query') || '';

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query, // анадог includes
				mode: 'insensitive', // чуствительность к регистру
			},
		},
		take: 5, // сколько получить при поиске продуктов
	});

	return NextResponse.json(products);
};
