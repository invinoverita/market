import { API_URL, token } from 'src/config/config';

import type { TypeDefaultResData } from '../utils';
import { TypeContragent } from 'src/types';

export const getContragents = async (
  phone: string,
): Promise<TypeDefaultResData<TypeContragent>> => {
  try {
    const response = await fetch(
      `${API_URL}/contragents/?token=${token}&limit=1&offset=0${phone ? `&phone=${phone}` : ''}`,
    );

    const data: TypeDefaultResData<TypeContragent> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      result: [],
      count: 0,
    };
  }
};
