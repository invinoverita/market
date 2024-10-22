import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNomenclature } from 'src/lib/api/getNomenclature';
import ProductPage from 'src/pages/ProductPage/ProductPage';

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 10;

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const response = await getNomenclature({
    nomenclature_id: id,
  });

  const exists = response.result.length;

  if (!exists) {
    return notFound();
  }

  const data = response.result[0];

  return {
    title: data.name,
    ...(data.description_short
      ? {
          description: `${data.description_short}`,
        }
      : {}),
  };
}

export async function generateStaticParams() {
  const products = await getNomenclature();

  return products.result.map((product) => ({
    slug: product.id.toString(),
  }));
}

const Product = async ({ params: { id } }: Props) => {
  const product = await getNomenclature({
    nomenclature_id: id,
  });

  const isExist = product.result.length;

  if (!isExist) {
    return notFound();
  }
  const data = product.result[0];

  return <ProductPage data={data} />;
};

export default Product;
