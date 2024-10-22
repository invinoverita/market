import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  localStorageCartProducts,
  localStorageHistoryProducts,
  localStorageNameOrderId,
} from 'src/config/config';
import { TypeProduct, TypeGood } from 'src/types';

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export type TypeDefaultResData<T> = {
  count: number;
  result: T[];
};

export const getHistoryProducts = () => {
  const products = window.localStorage.getItem(localStorageHistoryProducts);

  return products ? (JSON.parse(products) as TypeProduct[]) : [];
};

export const setHistoryProducts = (product: TypeProduct) => {
  const products = getHistoryProducts();

  const isSame = products.find((pr) => pr.id === product.id);

  if (isSame) {
    return;
  }

  window.localStorage.setItem(
    localStorageHistoryProducts,
    JSON.stringify([product, ...products]),
  );
};

export const getQuantityOptions = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => ({
    label: num.toString(),
    value: num,
  }));
};

export const getLocalProductsCart = (): TypeProduct[] => {
  try {
    const products = window.localStorage.getItem(localStorageCartProducts);

    return products ? (JSON.parse(products) as TypeProduct[]) : [];
  } catch (error) {
    return [];
  }
};

export const getLocalOrderId = (): null | number => {
  try {
    const id = window.localStorage.getItem(localStorageNameOrderId);

    return id ? Number(id) : null;
  } catch (error) {
    return null;
  }
};

export const setLocalOrderId = (id: number): number => {
  window.localStorage.setItem(localStorageNameOrderId, JSON.stringify(id));

  return id;
};

export const clearLocalOrderId = () =>
  window.localStorage.removeItem(localStorageNameOrderId);

export const setLocalProductsCart = (
  products: TypeProduct[],
): TypeProduct[] => {
  window.localStorage.setItem(
    localStorageCartProducts,
    JSON.stringify(products),
  );

  return products;
};

export const formattingProductToGoodCartProduct = (
  data: TypeProduct,
): TypeGood => {
  return {
    price_type: null,
    price: data.unit,
    quantity: 1,
    unit: data.unit,
    unit_name: data.unit_name,
    tax: 0,
    discount: 0,
    sum_discounted: data.unit,
    status: null,
    nomenclature: data.id,
    nomenclature_name: data.name,
  };
};

export const calcTotalGoods = (goods: TypeGood[]) => {
  try {
    let result = 0;

    for (const product of goods) {
      const quantity = product?.quantity ?? 1;

      result += product.unit * quantity;
    }

    return result;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
