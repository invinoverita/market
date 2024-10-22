import { redirect } from 'next/navigation';

const Catalog = async () => {
  return redirect('/catalog/all');
};

export default Catalog;
