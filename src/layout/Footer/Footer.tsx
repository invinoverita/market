import { FC } from 'react';
import { TypeCategory } from 'src/types';

type TypeFooterProps = {
  categories: TypeCategory[];
};

const Footer: FC<TypeFooterProps> = ({ categories }) => {
  return (
    <footer className="border-t border-t-slate-200">
      <div className="container">
        <div className="py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <a href="/">
              <span className="text-2xl font-bold uppercase">LOGO</span>
            </a>
            <ul className="flex flex-col flex-wrap gap-4 text-sm font-medium uppercase sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-4">
              {categories.slice(0, 10).map((category) => (
                <li key={category.id}>
                  <a href="/">{category.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <hr className="my-4 sm:my-6" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()} Все права защищены.
          </span>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
