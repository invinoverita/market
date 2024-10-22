import { API_URL, token } from 'src/config/config';

import type { TypeCategory } from 'src/types';
import type { TypeDefaultResData } from '../utils';

export const getCategories = async (): Promise<
  TypeDefaultResData<TypeCategory>
> => {
  try {
    const response = await fetch(`${API_URL}/categories/?token=${token}`);

    const data: TypeDefaultResData<TypeCategory> = await response.json();

    return {
      result: data?.result ?? [],
      count: data?.count ?? 0,
    };
  } catch (error) {
    console.log(error);
    return {
      result: [],
      count: 0,
    };
  }
};
