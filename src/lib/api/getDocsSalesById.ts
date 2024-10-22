import { API_URL, token } from 'src/config/config';

export const getDocsSalesById = async (
  id: string | number,
): Promise<Response> => {
  const response = await fetch(`${API_URL}/docs_sales/${id}/?token=${token}`);

  return response;
};
