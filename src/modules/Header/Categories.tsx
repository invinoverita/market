'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Dropdown } from 'src/components/Dropdown/Dropdown';

import type { TypeCategory } from 'src/types';
import { Disclosure } from 'src/components/Disclosure/Disclosure';

import caret from "public/images/caret.svg";

const Link = dynamic(() => import('../../components/Link/Link'), {
  ssr: false,
});

type TypeCategories = {
  data: TypeCategory[];
  onClose?: () => void;
};

const testCategories = [
  {
    id: 0,
    name: "Мед 100",
    subcategories: [
      {
        name: "Мед с добавками",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Мед натуральный",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Био + мед",
        description: "",
        code: 2,
        status: true,
        id: 2,
        updated_at: 0,
        created_at: 0,
      },
    ]
  },
  {
    id: 1,
    name: "Пчелопродукция",
    subcategories: null
  },
  {
    id: 2,
    name: "Сладости Кавказа",
    subcategories: [
      {
        name: "Конфеты с кавказским акцентом",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Казинаки без сахара",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Чучхела",
        description: "",
        code: 2,
        status: true,
        id: 2,
        updated_at: 0,
        created_at: 0,
      },
    ]
  },
  {
    id: 3,
    name: "Балхам (Бронхо)",
    subcategories: null
  },
  {
    id: 4,
    name: "Урбеч-паста",
    subcategories: [
      {
        name: "Урбеч весовой",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Урбеч 300г",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Урбеч-паста 100г",
        description: "",
        code: 2,
        status: true,
        id: 2,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Урбеч порционка 30г",
        description: "",
        code: 2,
        status: true,
        id: 2,
        updated_at: 0,
        created_at: 0,
      },
    ]
  },
  {
    id: 5,
    name: "Бальзамы (пищевые)",
    subcategories: [
      {
        name: "Бальзамы",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Эликсиры",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      }
    ]
  },
  {
    id: 6,
    name: "Специи и приправы",
    subcategories: [
      {
        name: "Моно специи",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Приправы",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      }
    ]
  },
  {
    id: 7,
    name: "Сухофрукты орехи семена",
    subcategories: [
      {
        name: "Сухофрукты",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Орехи",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Семена",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      }
    ]
  },
  {
    id: 8,
    name: "Масло (холодный отжим)",
    subcategories: null
  },
  {
    id: 9,
    name: "Чай и кофе",
    subcategories: [
      {
        name: "Чай с добавками",
        description: "",
        code: 0,
        status: true,
        id: 0,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Кофе",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      },
      {
        name: "Моно чай",
        description: "",
        code: 1,
        status: true,
        id: 1,
        updated_at: 0,
        created_at: 0,
      }
    ]
  },
]

const Categories: FC<TypeCategories> = ({ data, onClose = () => { } }) => {
  return (
    <ul className="flex flex-col tracking-tight lg:flex-row lg:items-center lg:justify-center lg:border-b">
      <li
        onClick={() => onClose()}
        className="px-4 py-2 text-lg transition-opacity border-transparent border-b-2 hover:opacity-80 hover:border-[#179c49] transition-colors sm:px-6 sm:py-3 lg:text-base"
      >
        <Link href={`/catalog/all`}>Все</Link>
      </li>
      {testCategories.slice(0, 6).map((category) => {
        if (category.subcategories === null) {
          return (
            <li
              onClick={() => onClose()}
              key={category.id}
              className="px-4 py-2 text-lg transition-opacity border-transparent border-b-2 hover:opacity-80 hover:border-[#179c49] transition-colors sm:px-6 sm:py-3 lg:text-base"
            >
              <Link href={`/catalog/${category.id}`}>{category.name}</Link>
            </li>
          )
        } else if (category.subcategories.length !== 0) {
          return (
            <div className="hidden lg:block">
              <Dropdown data={category.subcategories}>
                <li className="flex gap-2 items-center px-4 py-2 transition-opacity border-transparent border-b-2 hover:opacity-80 hover:border-[#179c49] transition-colors sm:px-6 sm:py-3">
                  <span className="text-lg lg:text-base">{category.name}</span>
                  <img src={caret.src} className="h-5 pb-1" />
                </li>
              </Dropdown>
            </div>
          )
        }
      })}
      <div className="hidden lg:block">
        {testCategories.length > 6 && (
          <Dropdown data={testCategories.slice(8, data.length - 7)}>
            <li className="px-4 py-2 text-lg text-slate-500 transition-opacity border-transparent border-b-2 last:border-b-0 hover:opacity-80 hover:border-[#179c49] transition-colors sm:px-6 sm:py-3  lg:text-base">
              <span>Остальное</span>
            </li>
          </Dropdown>
        )}
      </div>

      <div className="lg:hidden">
        <Disclosure
          trigger={
            <li className="py-2 pl-4 text-lg text-slate-500 transition-opacity border-transparent border-b-2 last:border-b-0 hover:opacity-80 hover:border-[#179c49] transition-colors sm:py-3 sm:pl-6 lg:text-base">
              <span>Остальное</span>
            </li>
          }
        >
          {data.slice(7, data.length - 1).map((category) => (
            <li
              key={category.id}
              onClick={() => onClose()}
              className="py-2 text-lg text-black transition-opacity border-transparent border-b-2 last:border-b-0 hover:opacity-80 hover:border-[#179c49] transition-colors sm:py-3 lg:text-base lg:last:border-none"
            >
              <Link href={`/catalog/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </Disclosure>
      </div>
    </ul>
  );
};

export { Categories };
