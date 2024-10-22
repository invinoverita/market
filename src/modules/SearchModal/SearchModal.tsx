'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  FC,
  cloneElement,
  useState,
  ReactElement,
  Fragment,
  ChangeEvent,
  useEffect,
} from 'react';

import { Modal } from 'src/components/Modal/Modal';

import { Spinner } from 'src/components/Spinner/Spinner';

import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from 'src/lib/hooks/useDebounce';

import { getNomenclature } from 'src/lib/api';
import { TypeProduct } from 'src/types';
import { emptyUrl } from 'src/config/config';

const Link = dynamic(() => import('src/components/Link/Link'), {
  ssr: false,
});

type TypeSearchModal = {
  trigger: ReactElement;
};

const SearchModal: FC<TypeSearchModal> = ({ trigger }) => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const [data, setData] = useState<TypeProduct[]>([]);

  const [status, setStatus] = useState<'pending' | 'success'>('success');

  const handleToggle = () => setOpen((prev) => !prev);

  const ButtonTriggerModal = cloneElement(trigger, {
    onClick: () => handleToggle(),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const search = async () => {
      setStatus('pending');

      const response = await getNomenclature({
        name: debouncedValue,
      });

      setData(response.result);

      setStatus('success');
    };

    if (debouncedValue) {
      search();
    } else setData([]);
  }, [debouncedValue]);

  return (
    <Fragment>
      {ButtonTriggerModal}
      <Modal open={open} onToggle={handleToggle}>
        <div className="relative">
          {status === 'pending' ? (
            <Spinner className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-500" />
          ) : (
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
          )}
          <input
            value={value}
            onChange={handleChange}
            placeholder="Поиск..."
            type="text"
            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 focus:ring-0 sm:text-sm"
          />
        </div>
        {debouncedValue && status !== 'pending' && (
          <ul className="max-h-96 scroll-my-3 overflow-y-auto border-t p-3">
            {data.map((product) => (
              <Link
                href={`/product/${product.id}`}
                onClick={handleToggle}
                key={product.id}
                className="flex cursor-pointer items-center rounded-md p-3 hover:bg-slate-50"
              >
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                  <Image src={emptyUrl} fill alt={product.name} />
                </div>
                <div className="ml-4 flex-auto">
                  <p className="line-clamp-1 font-medium">{product.name}</p>
                  <p className="line-clamp-1 text-sm text-slate-500">
                    {product.description_short}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        )}
        {!data.length && debouncedValue && status !== 'pending' && (
          <div className="px-6 py-14 text-center">
            <ExclamationCircleIcon className="mx-auto h-6 w-6 text-slate-500" />
            <p className="mt-4 font-medium">Результатов не найдено</p>
            <p className="mt-2 text-slate-500">
              По данному поисковому запросу не найдено. Пожалуйста, попробуйте
              еще раз.
            </p>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export { SearchModal };
