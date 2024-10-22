export type TypeCategory = {
  name: string;
  description: string;
  code: any;
  parent?: number;
  status: boolean;
  id: number;
  updated_at: number;
  created_at: number;
};

export interface TypeProduct {
  id: number;
  name: string;
  type: string;
  description_short: string;
  description_long: string;
  code?: number;
  unit: number;
  category: number;
  manufacturer: any;
  updated_at: number;
  created_at: number;
  unit_name: string;
  pictures: Picture[];
  prices: Price[];
  alt_warehouse_balances: AltWarehouseBalance[];
}

export type Picture = {
  id: number;
  entity: string;
  entity_id: number;
  is_main: boolean;
  url: string;
  size: number;
  updated_at: number;
  created_at: number;
};

export type Price = {
  id: number;
  unit_name: string;
  category_name: string;
  manufacturer_name: any;
  price: number;
  date_from?: number;
  date_to?: number;
  price_types: PriceType[];
};

export type PriceType = {
  name: string;
  id: number;
  updated_at: number;
  created_at: number;
};

export type AltWarehouseBalance = {
  name: string;
  key: number;
  children: Children[];
};

export type Children = {
  organization_id: number;
  organization_name: string;
  current_amount: number;
  plus_amount: number;
  minus_amount: number;
  start_ost: number;
  now_ost: number;
  warehouses: TypeWarehouse[];
};

export type TypePictureProduct = {
  id: number;
  entity: string;
  entity_id: number;
  is_main: boolean;
  url: string;
  size: number;
  updated_at: number;
  created_at: number;
};

export type TypeWarehouse = {
  name: string;
  type?: string;
  description: string;
  address?: string;
  phone?: string;
  parent?: number;
  status: boolean;
  id: number;
  updated_at: number;
  created_at: number;
};

export type TypeOrganization = {
  type: string;
  short_name: string;
  full_name: string;
  work_name: string;
  prefix: string;
  inn: any;
  kpp: any;
  okved: number;
  okved2: any;
  okpo: any;
  ogrn: any;
  org_type: any;
  tax_type: any;
  tax_percent: any;
  registration_date: number;
  id: number;
  updated_at: number;
  created_at: number;
};

export type TypeContragent = {
  id: number;
  name: string;
  external_id: any;
  phone: string;
  inn: any;
  description?: string;
  cashbox: number;
  is_deleted: boolean;
  created_at: number;
  updated_at: number;
};

export type TypePostContragent = {
  name?: string | null;
  external_id?: string;
  phone?: string;
  inn?: string;
  id?: number;
  description?: string;
};

export type TypeDocs = {
  id?: number;
  utm_source?: string;
  paid_lt: number;
  number: string;
  dated: number;
  operation: string;
  tags?: string | null;
  docs_sales: number | null;
  nomenclature_count: number | null;
  paid_doc: number;
  paid_rubles: number;
  paid_loyality: number;
  status: boolean;
  doc_discount: string | number | null;
  comment?: null | string;
  client?: number | null;
  contragent: number;
  contract: number | null;
  organization: number;
  warehouse: number;
  sum: number;
  tax_included: boolean;
  tax_active: boolean;
  sales_manager: number;
  goods: TypeGood[];
  updated_at: number;
  created_at: number;
};

export type TypeGood = {
  price_type: number | string | null;
  price: number;
  quantity: number;
  unit: number;
  unit_name: string;
  tax: number | null;
  discount: number;
  sum_discounted: number;
  status: boolean | string | null;
  nomenclature: number;
  description_short?: string;
  description_long?: string;
  nomenclature_name: string;
};
