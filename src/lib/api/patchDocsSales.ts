import { API_URL, token } from 'src/config/config';

import { TypeDocs } from 'src/types';

export const patchDocsSales = async (
  id: number,
  data: TypeDocs[],
): Promise<Response> => {
  const response = await fetch(`${API_URL}/docs_sales/${id}/?token=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
};
