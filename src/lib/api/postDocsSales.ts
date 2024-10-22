import { API_URL, token } from 'src/config/config';

import { TypeDocs } from 'src/types';

export const postDocsSales = async (data: TypeDocs[]): Promise<Response> => {
  const response = await fetch(
    `${API_URL}/docs_sales/?token=${token}&generate_out=true`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  return response;
};
