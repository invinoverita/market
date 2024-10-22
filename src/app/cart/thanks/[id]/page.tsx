import ThanksPage from 'src/pages/ThanksPage/ThanksPage';

export const metadata = {
  title: 'Заказ успешно отправлен',
  description: 'Благодарим за покупку!',
};

type Props = {
  params: {
    id: string;
  };
};

const Thanks = ({ params: { id } }: Props) => {
  return <ThanksPage id={id} />;
};

export default Thanks;
