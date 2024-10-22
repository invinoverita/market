import { API_URL, token } from 'src/config/config';

import type { TypeDefaultResData } from '../utils';
import { TypeWarehouse } from 'src/types';

export const getWarehouses = async (): Promise<
  TypeDefaultResData<TypeWarehouse>
> => {
  try {
    const response = await fetch(
      `${API_URL}/warehouses/?token=${token}&limit=1&offset=0`,
    );

    const data: TypeDefaultResData<TypeWarehouse> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      result: [],
      count: 0,
    };
  }
};
