import { PersonalInfo } from '@/types/personal-info';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardFrontProps {
  info: PersonalInfo;
}

export default function CardFront({ info }: CardFrontProps) {
  return (
    <div 
      className="w-full h-full p-0 flex md:flex-row flex-col relative"
    >
      <motion.div
        className="relative md:w-1/3 w-full md:h-full h-1/2"
      >
        <Image
          src={info.profileImage}
          alt={`${info.name.first} ${info.name.last}`}
          fill
          className="object-cover md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl"
          priority
        />
      </motion.div>

      <div className="flex-1 p-8 flex flex-col justify-center bg-[#111111]/95">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <h1 className={clsx(
            "text-[3rem] md:text-[6rem] leading-[0.85] font-bold mb-2",
            "bg-gradient-to-r from-white to-white/80",
            "bg-clip-text text-transparent"
          )}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {info.name.first} {info.name.last}
          </h1>

          <div className="flex flex-col mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-medium text-white"
            >
              {info.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/60"
            >
              {info.company}, {info.location}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 