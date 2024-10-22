import { FC } from 'react';

import {
  About,
  MainProducts,
  Promotions,
  Stories,
  Banner,
} from 'src/components/Main';
import { TypeCategory, TypeProduct } from 'src/types';

type TypeMainPageProps = {
  products: TypeProduct[];
  categories: TypeCategory[];
};

const MainPage: FC<TypeMainPageProps> = ({
  products = [],
  categories = [],
}) => {
  return (
    <div>
      <Banner />
      {/* <div className="py-8">
        <Stories />
      </div> */}
      {categories.map((category) => {
        const productsByCategory = products.filter(
          (product) => product.category === category.id,
        );

        if (!productsByCategory.length) {
          return null;
        }

        return (
          <section key={category.id} className="mt-4 lg:mt-10">
            <MainProducts data={productsByCategory} category={category} />
          </section>
        );
      })}
      <section className="pt-6 lg:pt-12">
        <div className="container">
          <About />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
