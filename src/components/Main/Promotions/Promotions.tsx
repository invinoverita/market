import Image from 'next/image';
import LoremIpsum from 'public/images/parfume.webp';

const Promotions = () => {
  return (
    <div className="flex gap-12">
      {[1, 2].map((num) => (
        <a
          href="/"
          key={num}
          className="flex w-1/2 flex-col gap-6 bg-slate-100 px-6 pb-6 pt-4"
        >
          <div className="relative h-[340px]">
            <Image
              src={LoremIpsum}
              className="object-cover"
              fill
              placeholder="blur"
              alt="promotion"
            />
          </div>
          <div>
            <p className="text-blue-700">
              До конца акции осталось: 5 дней 10:00:22
            </p>
            <div className="pt-1">
              <span className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export { Promotions };
