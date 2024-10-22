'use client';
import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';

import Autoplay from 'embla-carousel-autoplay';

const img_url =
  'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c382ef188387547.659bbc03053ac.jpg';

const Banner = () => {
  const [emblaRef] = useEmblaCarousel({}, [Autoplay()]);

  return (
    <div className="border-b border-slate-200">
      <div className="lg:container">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="backface-hidden flex h-[480px] touch-pan-y">
            {[1, 2, 3].map((index) => (
              <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
                <Image
                  src={img_url}
                  className="object-cover"
                  fill
                  quality={100}
                  priority
                  alt="Picture of the author"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Banner };
