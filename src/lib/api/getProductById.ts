import { API_URL, token } from 'src/config/config';

import { TypeProduct } from 'src/types';

export const getProductById = async (
  id: number,
): Promise<TypeProduct | null> => {
  try {
    const response = await fetch(
      `${API_URL}/nomenclature/${id}/?token=${token}`,
    );

    const data: TypeProduct = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
