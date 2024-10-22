import Image from 'next/image';
import ProductImage from 'public/images/test-product.jpg';
const data = [
  {
    img: ProductImage,
    link: '/',
    title: 'Спец. предложение',
  },
  {
    img: ProductImage,
    link: '/',
    title: 'Mareve',
  },
  {
    img: ProductImage,
    link: '/',
    title: 'Giorgio Armani',
  },
  {
    img: ProductImage,
    link: '/',
    title: 'Maybelline',
  },
  {
    img: ProductImage,
    link: '/',
    title: 'NYX',
  },
];

const Stories = () => {
  return (
    <div className="container">
      <ul className="flex items-center justify-center gap-10">
        {data.map((story, index) => (
          <li key={index}>
            <a href={story.link}>
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 rounded-full border-2 border-blue-800 p-0.5">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image src={story.img} fill alt="story img" />
                  </div>
                </div>
                <div className="w-20 overflow-hidden">
                  <span className="block truncate text-center text-sm">
                    {story.title}
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Stories };
