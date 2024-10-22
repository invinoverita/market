import { API_URL, token } from 'src/config/config';

import { TypePostContragent } from 'src/types';

export type PostContragentResponseData = {
  id: number;
  name: string | null;
  inn?: string;
  phone?: string;
  description?: string;
};

export const postContragent = async (
  data: TypePostContragent,
): Promise<PostContragentResponseData | null> => {
  try {
    const response = await fetch(`${API_URL}/contragents/?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: PostContragentResponseData = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
