import { API_URL, token } from 'src/config/config';

import type { TypePictureProduct } from 'src/types';
import type { TypeDefaultResData } from '../utils';

export const getPictureProduct = async (
  id: number,
): Promise<TypeDefaultResData<TypePictureProduct>> => {
  const response = await fetch(
    `${API_URL}/pictures/?token=${token}&entity=nomenclature&entity_id=${id}`,
  );

  const data: TypeDefaultResData<TypePictureProduct> = await response.json();

  return data;
};
