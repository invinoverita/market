'use client';

import { FC, Fragment, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useStore } from 'src/lib/hooks/useStore';

import { TypeGood } from 'src/types';

import { Toast } from 'src/components/Toast/Toast';
import { CartProducts } from 'src/modules/CartProducts/CartProducts';
import { Checkout } from 'src/modules/Checkout/Checkout';
import { EmptyCard } from 'src/components/EmptyCard/EmptyCard';

type Status = 'error' | 'success' | 'loading';

const CartPage: FC = () => {
  const {
    order,
    goods,
    totalAmount,
    updateGoods,
    contacts,
    createOrder,
    handleClear,
  } = useStore();

  const router = useRouter();

  const [status, setStatus] = useState<Status | null>(null);

  const handleRemove = useCallback(
    async (data: TypeGood) => {
      const result = goods.filter(
        (good) => good.nomenclature !== data.nomenclature,
      );
      await updateGoods(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goods],
  );

  const handleChange = useCallback(
    async (data: TypeGood) => {
      const result = goods.map((good) => {
        if (good.nomenclature === data.nomenclature) {
          return data;
        } else return good;
      });

      await updateGoods(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goods],
  );

  const handleSubmit = useCallback(
    async (name: string, phone: string) => {
      try {
        setStatus('loading');
        if (!order) {
          const data = await createOrder(
            goods,
            phone,
            name,
            contacts.utm_source,
          );

          if (data?.id) {
            router.push(`/cart/thanks/${data.id}`);
            setStatus('success');
            return handleClear();
          }
        }

        if (order?.id) {
          router.push(`/cart/thanks/${order.id}`);
          handleClear();
          setStatus('success');
        }
      } catch (error) {
        setStatus('error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, goods, contacts.utm_source],
  );

  return (
    <Fragment>
      <div className="border-b bg-slate-50">
        <div className="py-12">
          <h1 className="text-center text-4xl font-bold tracking-tight">
            Корзина
          </h1>
        </div>
      </div>
      {goods.length ? (
        <div className="container">
          <div className="mx-auto grid gap-x-16 gap-y-16 pt-12 lg:max-w-none lg:grid-cols-5">
            <div className="sm:mx-auto sm:w-full lg:col-span-3">
              <CartProducts
                data={goods}
                onRemove={handleRemove}
                onChange={handleChange}
              />
              <div className="mt-12">
                <div className="flex items-center justify-between">
                  <dt className="text-lg">Всего</dt>
                  <dt className="text-lg">{totalAmount} ₽</dt>
                </div>
                <p className="mt-2 text-slate-500">
                  Стоимость доставки и налоги будут рассчитаны при оформлении
                  заказа.
                </p>
              </div>
            </div>
            <div className="sm:mx-auto sm:w-full lg:col-span-2">
              <Checkout
                loading={status === 'loading'}
                defaultValue={contacts}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}
      {status === 'error' && (
        <Toast type="error" content="Ошибка отправки заказа" />
      )}
    </Fragment>
  );
};

export default CartPage;
