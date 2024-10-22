'use client';
import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';

import {
  getWarehouses,
  getContragents,
  getOrganizations,
  postContragent,
  postDocsSales,
  patchDocsSales,
} from 'src/lib/api';

import { getDocsSalesById } from 'src/lib/api';
import {
  getLocalOrderId,
  calcTotalGoods,
  setLocalOrderId,
  clearLocalOrderId,
} from 'src/lib/utils';
import {
  TypeDocs,
  TypeGood,
  TypeOrganization,
  TypeProduct,
  TypeWarehouse,
} from 'src/types';

export type TypeStoreContext = {
  order: null | TypeDocs;
  totalAmount: number;
  goods: TypeGood[];
  contacts: {
    name: string | null;
    phone: string | null;
    utm_source: string | null;
  };
  updateGoods: (data: TypeGood[]) => void;
  handleClear: () => void;
  createOrder: (
    goods: TypeGood[],
    phone: string,
    name: string | null,
    utm_source?: string | null,
  ) => Promise<TypeDocs | null>;
  updateOrder: (data: TypeDocs) => void;
};

export const StoreContext = createContext<TypeStoreContext | null>(null);

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contacts, setContacts] = useState<TypeStoreContext['contacts']>({
    name: null,
    phone: null,
    utm_source: null,
  });

  const [organizations, setOrganizations] = useState<TypeOrganization[]>([]);
  const [warehouses, setWarehouses] = useState<TypeWarehouse[]>([]);

  const [order, setOrder] = useState<TypeDocs | null>(null);

  const [goods, setGoods] = useState<TypeGood[]>([]);

  const totalAmount = useMemo(() => {
    if (goods) {
      const result = calcTotalGoods(goods);

      return result;
    } else return 0;
  }, [goods]);

  const getHelpersData = async () => {
    let result = {
      organizations,
      warehouses,
    };

    if (!organizations.length) {
      const response = await getOrganizations();

      result.organizations = response.result;

      setOrganizations(response.result);
    }

    if (!warehouses.length) {
      const response = await getWarehouses();

      result.warehouses = response.result;

      setWarehouses(response.result);
    }

    return result;
  };

  const createOrder = async (
    goods: TypeGood[],
    phone: string,
    name: string | null,
    utm_source?: string | null,
  ): Promise<TypeDocs | null> => {
    try {
      let contragent_id = null;
      const helpersData = await getHelpersData();

      const { result: responseContragents } = await getContragents(phone);

      const isExistsContragents = responseContragents.length;

      if (isExistsContragents) {
        const findContragentById = responseContragents.find(
          (contragent) => contragent.id,
        );

        if (findContragentById) {
          contragent_id = findContragentById.id;
        }
      }

      if (!isExistsContragents) {
        const responseNewContragent = await postContragent({
          phone,
          name: name ?? '',
        });

        if (responseNewContragent) {
          contragent_id = responseNewContragent.id;
        }
      }

      const totalAmountGoods = calcTotalGoods(goods);

      const data = {
        dated: 1707764248,
        operation: 'Заказ',
        contragent: contragent_id,
        tax_included: true,
        tax_active: true,
        organization: helpersData.organizations[0].id ?? null,
        paid_rubles: totalAmountGoods,
        paid_lt: totalAmountGoods,
        ...(utm_source ? { utm_source } : {}),
        sum: totalAmountGoods,
        warehouse: helpersData.warehouses[0].id ?? null,
        status: true,
        goods,
      } as TypeDocs;

      const responseCreateOrder: [TypeDocs] = await postDocsSales([data]).then(
        (res) => res.json(),
      );
      const isSuccessCreateOrder = !!responseCreateOrder.length;

      const responseCreateOrderData = responseCreateOrder[0];

      const createdOrderId = responseCreateOrderData.id;

      if (isSuccessCreateOrder && createdOrderId) {
        setLocalOrderId(createdOrderId);
      }

      return { ...data, id: createdOrderId };
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
  };

  const updateOrder = async (data: TypeDocs) => {
    try {
      setOrder(data);

      if (data.id) {
        await patchDocsSales(data.id, [data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateGoods = async (data: TypeGood[]) => {
    setGoods(data);

    if (!order) {
      if (contacts.phone) {
        return await createOrder(
          data,
          contacts.phone,
          contacts.name,
          contacts.utm_source,
        );
      }

      return null;
    }

    await updateOrder({ ...order, goods: data });
  };

  const handleClear = () => {
    setOrder(null);
    clearLocalOrderId();
    setGoods([]);

    const params = new URLSearchParams(window.location.search);

    const contactsParams = {
      name: params.get('name') ?? null,
      phone: params.get('phone') ?? null,
      utm_source: params.get('utm_source') ?? null,
    };

    setContacts(contactsParams);
  };

  const values = useMemo(
    () => ({
      order,
      goods,
      updateGoods,
      totalAmount,
      contacts,
      handleClear,
      createOrder,
      updateOrder,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, totalAmount, contacts, goods],
  );

  useEffect(() => {
    const initial = async (id: number) => {
      try {
        const response = await getDocsSalesById(id).then((res) => res.json());

        const data = response as TypeDocs;

        setOrder(data);
        setGoods(data.goods);
      } catch (error) {
        console.log(error);
      }
    };

    const params = new URLSearchParams(window.location.search);

    const contactsParams = {
      name: params.get('name') ?? null,
      phone: params.get('phone') ?? null,
      utm_source: params.get('utm_source') ?? null,
    };

    setContacts(contactsParams);

    const id = getLocalOrderId();

    if (id) {
      initial(id);
    }
  }, []);

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
