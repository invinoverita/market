import { useContext } from 'react';

import { TypeDocs, TypeGood } from 'src/types';

import { StoreContext } from 'src/Providers/StoreProvider';

const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    const order = null as TypeDocs | null;
    const totalAmount = 0;
    const goods: TypeGood[] = [];
    const contacts = {
      name: null,
      phone: null,
      utm_source: null,
    };

    const updateGoods = async (data: TypeGood[]) => {};
    const handleClear = () => {};
    const createOrder = async (
      goods: TypeGood[],
      phone: string | null,
      name: string | null,
      utm_source?: string | null,
    ) => {};

    console.log('Please use StoreContext in parent component');

    return {
      order,
      totalAmount,
      contacts,
      goods,
      handleClear,
      createOrder,
      updateGoods,
    };
  }

  return store;
};

export { useStore };
