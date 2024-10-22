import MainPage from 'src/pages/MainPage/MainPage';

import { getNomenclature } from 'src/lib/api/getNomenclature';
import { getCategories } from 'src/lib/api';

export const metadata = {
  title: 'Добро пожаловать',
  description: 'Добро пожаловать в интернет-магазин LOGO',
};

export default async function Main() {
  const products = await getNomenclature();
  const categories = await getCategories();

  return <MainPage products={products.result} categories={categories.result} />;
}
