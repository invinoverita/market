'use client';
import { FC, SyntheticEvent } from 'react';

import { Spinner } from 'src/components/Spinner/Spinner';

type TypeCheckoutProps = {
  loading: boolean;
  onSubmit: (name: string, phone: string) => void;
  defaultValue: {
    name: string | null;
    phone: string | null;
  };
};

const Checkout: FC<TypeCheckoutProps> = ({
  loading,
  onSubmit,
  defaultValue,
}) => {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      phone: { value: string };
    };
    const name = target.name.value;
    const phone = target.phone.value;

    onSubmit(name, phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-medium tracking-tight">
        Контактная информация
      </h2>
      <div className="mt-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Имя
        </label>
        <div className="mt-1">
          <input
            required
            defaultValue={defaultValue.name ?? ''}
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700"
        >
          Номер телефона
        </label>
        <div className="mt-1">
          <input
            required
            defaultValue={defaultValue.phone ?? ''}
            id="phone"
            type="number"
            name="phone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 flex">
        <div className="flex h-5 items-center">
          <input
            name="terms"
            id="terms"
            defaultChecked
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
        </div>
        <label htmlFor="terms" className="ml-2 text-sm text-slate-500">
          Я прочитал условия и согласен на продажу моей личной информации тому,
          кто предложит самую высокую цену.
        </label>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        {loading ? <Spinner className="h-6 w-6" /> : 'Завершить'}
      </button>
    </form>
  );
};

export { Checkout };
