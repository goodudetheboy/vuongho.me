import { useState } from 'preact/hooks';
import { PersonalInfo } from '@/types/personal-info';
import CardFront from './CardFront';
import CardBack from './CardBack';
import styles from './BusinessCard.module.css';

interface BusinessCardProps {
  info: PersonalInfo;
}

export default function BusinessCard({ info }: BusinessCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative ${styles.metalBackground}`}>
      <div className={`w-full max-w-2xl aspect-[3/5] md:aspect-[1.618/1] ${styles.enter}`}>
        <div
          className={`${styles.card} ${isFlipped ? `${styles.flipped} ${styles.notClickable}` : ''}`}
          onClick={flip}
          onKeyDown={(e) => {
            if (!isFlipped && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              flip();
            }
          }}
          role={isFlipped ? undefined : 'button'}
          tabIndex={isFlipped ? undefined : 0}
          aria-label={isFlipped ? undefined : 'Front of card (click to flip to back)'}
        >
          <div className={styles.cardInner}>
            <div className={`${styles.cardFace} ${styles.cardFront}`} aria-hidden={isFlipped}>
              <CardFront info={info} />
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`} aria-hidden={!isFlipped} inert={!isFlipped}>
              <CardBack info={info} onBack={() => setIsFlipped(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
