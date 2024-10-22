import dynamic from 'next/dynamic';
import { FC } from 'react';

const Link = dynamic(() => import('../Link/Link'), {
  ssr: false,
});

export type TypeBreadcrumbsProps = {
  data: {
    name: string;
    link?: string;
  }[];
};

const Breadcrumbs: FC<TypeBreadcrumbsProps> = ({ data }) => {
  return (
    <section className="border-b">
      <div className="container">
        <div className="flex items-center text-xs sm:text-sm">
          {data.map((item, index) => {
            if (item.link) {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className="border-r px-2 py-1.5 transition-opacity first:pl-0 hover:opacity-80 sm:px-4 sm:py-2 lg:px-6"
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <p
                key={index}
                className="truncate text-ellipsis px-2 py-1.5 text-gray-500 sm:px-4 sm:py-2 lg:px-6"
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Breadcrumbs };
