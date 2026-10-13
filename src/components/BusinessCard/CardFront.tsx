import { PersonalInfo } from '@/types/personal-info';

interface CardFrontProps {
  info: PersonalInfo;
}

export default function CardFront({ info }: CardFrontProps) {
  const name = `${info.name.first} ${info.name.last}`;
  const srcset = (ext: string) => `${info.profileImage}-400.${ext} 400w, ${info.profileImage}-800.${ext} 800w`;
  const sizes = '(min-width: 768px) 224px, 100vw';

  return (
    <div className="w-full h-full p-0 flex md:flex-row flex-col relative">
      <div className="relative md:w-1/3 w-full md:h-full h-1/2">
        <picture>
          <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
          <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
          <img
            src={`${info.profileImage}-800.jpg`}
            srcSet={srcset('jpg')}
            sizes={sizes}
            alt={name}
            width={800}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl"
          />
        </picture>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center bg-[#111111]/95">
        <div className="flex flex-col">
          <h1 className="text-[3rem] md:text-[6rem] leading-[0.85] font-bold pb-[0.12em] bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {name}
          </h1>

          <div className="flex flex-col mt-2">
            <p className="text-xl md:text-2xl font-medium text-white">{info.title}</p>
            <p className="text-lg md:text-xl text-white/60">
              {info.company}, {info.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
