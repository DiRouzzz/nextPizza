import { Ingredient } from '@prisma/client';
import { axiosInstance } from './instance';
import { APiRoutes } from './constants';

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(APiRoutes.INGREDIENTS);

	return data;
};
