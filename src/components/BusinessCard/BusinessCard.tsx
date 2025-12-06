'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types/personal-info';
import CardFront from '@/components/BusinessCard/CardFront';
import CardBack from '@/components/BusinessCard/CardBack';
import styles from './BusinessCard.module.css';

interface BusinessCardProps {
  info: PersonalInfo;
}

export default function BusinessCard({ info }: BusinessCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative ${styles.metalBackground}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl aspect-[3/5] md:aspect-[1.618/1]"
      >
        <div
          className={`${styles.card} ${isFlipped ? `${styles.flipped} ${styles.notClickable}` : ''}`}
          onClick={handleCardClick}
          role="button"
          aria-label={isFlipped ? 'Back of card (click disabled). Use back button to flip.' : 'Front of card (click to flip to back)'}
        >
          <div className={styles.cardInner}>
            <div className={`${styles.cardFace} ${styles.cardFront}`}>
              <CardFront info={info} />
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`}>
              <CardBack info={info} onBack={() => setIsFlipped(false)} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 