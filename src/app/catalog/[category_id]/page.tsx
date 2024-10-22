import { getCategories, getCategoryById } from 'src/lib/api';
import { getNomenclature } from 'src/lib/api/getNomenclature';
import CatalogPage from 'src/pages/CatalogPage/CatalogPage';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

type Props = {
  params: {
    category_id: string;
  };
};

export const revalidate = 60;

export async function generateMetadata({
  params: { category_id },
}: Props): Promise<Metadata> {
  if (category_id === 'all') {
    return {
      title: `Каталог | Все`,
      description: 'Каталог | Все товары',
      openGraph: {
        title: `Каталог | Все`,
        description: 'Каталог | Все товары',
      },
    };
  }

  const category = await getCategoryById(Number(category_id));

  if (!category) {
    return notFound();
  }
  return {
    title: `Каталог | ${category.name}`,
    description: category.description ?? `Каталог`,
    openGraph: {
      title: `Каталог | ${category.name}`,
      description: category.description ?? `Каталог`,
    },
  };
}

const Catalog = async ({ params: { category_id } }: Props) => {
  const categories = await getCategories();

  const data = await getNomenclature({
    ...(category_id !== 'all'
      ? {
          category_ids: category_id,
        }
      : {}),
  });

  return (
    <CatalogPage
      data={data}
      categories={categories}
      category_id={category_id}
    />
  );
};

export default Catalog;
