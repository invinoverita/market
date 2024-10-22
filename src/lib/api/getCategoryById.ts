import { API_URL, token } from 'src/config/config';

import type { TypeCategory } from 'src/types';

export const getCategoryById = async (
  id: number,
): Promise<TypeCategory | null> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}/?token=${token}`);

    const data: TypeCategory = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
