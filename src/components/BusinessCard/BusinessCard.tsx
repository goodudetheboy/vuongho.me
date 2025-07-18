'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types/personal-info';
import { MdFlip } from 'react-icons/md';
import CardFront from '@/components/BusinessCard/CardFront';
import CardBack from '@/components/BusinessCard/CardBack';
import styles from './BusinessCard.module.css';

interface BusinessCardProps {
  info: PersonalInfo;
}

export default function BusinessCard({ info }: BusinessCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative ${styles.metalBackground}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl aspect-[3/5] md:aspect-[1.618/1]"
      >
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          <div className={styles.cardInner}>
            <div className={`${styles.cardFace} ${styles.cardFront}`}>
              <CardFront info={info} />
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`}>
              <CardBack info={info} />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={handleFlip}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm 
                   flex items-center justify-center text-white/80 hover:text-white 
                   hover:bg-white/20 transition-colors shadow-lg z-10"
        style={{ 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.8s'
        }}
      >
        <MdFlip className="text-2xl" />
      </motion.button>
    </div>
  );
} 