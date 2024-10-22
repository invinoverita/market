import { API_URL, token } from 'src/config/config';

import type { TypeDefaultResData } from '../utils';
import { TypeProduct } from 'src/types';

type ParamsNomenclature = Record<string, any>;

export const getNomenclature = async (
  params?: ParamsNomenclature | undefined,
): Promise<TypeDefaultResData<TypeProduct>> => {
  try {
    const response = await fetch(
      `${API_URL}/webapp/?token=${token}&` + new URLSearchParams(params),
    );

    const data: TypeDefaultResData<TypeProduct> = await response.json();

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
