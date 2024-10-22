'use client';

import { FC, useCallback, useMemo, useState, Fragment } from 'react';
import { TypeProduct } from 'src/types';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'src/components/Spinner/Spinner';
import { useStore } from 'src/lib/hooks/useStore';
import { Toast } from 'src/components/Toast/Toast';
import { formattingProductToGoodCartProduct } from 'src/lib/utils';

import _cloneDeep from 'lodash/cloneDeep';
import Link from 'src/components/Link/Link';

type TypeButtonCartProps = {
  data: TypeProduct;
  type?: 'common' | 'product' | 'cart';
};

const ButtonCart: FC<TypeButtonCartProps> = ({ data, type = 'common' }) => {
  const { goods, updateGoods } = useStore();

  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<'added' | 'error' | 'delete' | null>(
    null,
  );

  const isSome = !!goods.find((pr) => pr.nomenclature === data.id);

  const handleAdd = useCallback(async () => {
    try {
      const good = formattingProductToGoodCartProduct(data);

      await updateGoods([...goods, good]);
      setLoading(true);
      setStatus('added');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods]);

  const handleRemove = useCallback(async () => {
    try {
      const result = goods.filter((good) => good.nomenclature !== data.id);

      await updateGoods(result);

      setLoading(true);
      setStatus('delete');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods]);

  return (
    <Fragment>
      {useMemo(() => {
        if (type === 'product') {
          if (loading) {
            return (
              <button className="flex w-full items-center justify-center rounded-md bg-slate-200 px-8 py-3 font-medium sm:max-w-80">
                <Spinner className="h-6 w-6" />
              </button>
            );
          }

          if (isSome) {
            return (
              <button
                onClick={handleRemove}
                className="group/item flex w-full items-center justify-center rounded-md bg-slate-200 px-8 py-3 font-medium hover:bg-red-100 sm:max-w-80"
              >
                <CheckIcon className="h-6 w-6 text-green-800 group-hover/item:hidden" />
                <XMarkIcon className="hidden h-6 w-6 text-red-800 group-hover/item:block" />
              </button>
            );
          }

          return (
            <button
              onClick={handleAdd}
              className="flex w-full items-center justify-center rounded-md bg-slate-200 px-8 py-3 font-medium sm:max-w-80"
            >
              В корзину
            </button>
          );
        }

        if (type === 'common') {
          if (loading) {
            return (
              <button className="flex w-full items-center justify-center rounded-lg bg-slate-200 px-4 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-slate-100 sm:text-base">
                <Spinner className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            );
          }

          if (isSome) {
            return (
              <button
                onClick={handleRemove}
                className="group/item flex w-full items-center justify-center rounded-lg bg-green-200 px-4 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-red-100 sm:text-base"
              >
                <CheckIcon className="h-5 w-5 text-green-800 group-hover/item:hidden sm:h-6 sm:w-6" />
                <XMarkIcon className="hidden h-5 w-5 text-red-800 group-hover/item:block sm:h-6 sm:w-6" />
              </button>
            );
          }
          return (
            <button
              onClick={handleAdd}
              className="w-full rounded-lg bg-slate-200 px-4 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-slate-100 sm:text-base"
            >
              В корзину
            </button>
          );
        }
      }, [loading, isSome, type, handleAdd, handleRemove])}
      {status === 'added' && (
        <Link href="/cart">
          <Toast
            type="success"
            autoClose={true}
            onHide={() => setStatus(null)}
            onClose={(e: any) => {
              e.preventDefault();
              setStatus(null);
            }}
            content="Товар успешно добавлен в корзину!"
          />
        </Link>
      )}
      {status === 'error' && (
        <Link href="/cart">
          <Toast
            type="error"
            autoClose={true}
            onHide={() => setStatus(null)}
            onClose={(e: any) => {
              e.preventDefault();
              setStatus(null);
            }}
            content="Ошибка, с действием товара"
          />
        </Link>
      )}
      {status === 'delete' && (
        <Link href="/cart">
          <Toast
            type="error"
            autoClose={true}
            onHide={() => setStatus(null)}
            onClose={(e: any) => {
              e.preventDefault();
              setStatus(null);
            }}
            content="Товар удален из корзины!"
          />
        </Link>
      )}
    </Fragment>
  );
};

export { ButtonCart };
