import { API_URL, token } from 'src/config/config';

import type { TypeDefaultResData } from '../utils';
import { TypeOrganization } from 'src/types';

export const getOrganizations = async (): Promise<
  TypeDefaultResData<TypeOrganization>
> => {
  try {
    const response = await fetch(
      `${API_URL}/organizations/?token=${token}&limit=1&offset=0`,
    );

    const data: TypeDefaultResData<TypeOrganization> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      result: [],
      count: 0,
    };
  }
};
