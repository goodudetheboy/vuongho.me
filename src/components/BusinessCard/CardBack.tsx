import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalInfo, Experience } from '@/types/personal-info';
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaInfoCircle, FaTerminal, FaShieldAlt, FaRocket, FaCode, FaFlask, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiMeta, SiGoogle } from 'react-icons/si';
import { IoSchool } from 'react-icons/io5';
import { PiGraduationCap } from 'react-icons/pi';
import Image from 'next/image';
import clsx from 'clsx';

interface CardBackProps {
  info: PersonalInfo;
}

const iconMap = {
  meta: SiMeta,
  google: SiGoogle,
  uofr: IoSchool,
  school: PiGraduationCap,
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  terminal: FaTerminal,
  shield: FaShieldAlt,
  rocket: FaRocket,
  code: FaCode,
  lab: FaFlask
};

interface IconProps {
  iconType: 'icon' | 'image';
  icon: string;
  className?: string;
}

const IconComponent = ({ iconType, icon, className = "" }: IconProps) => {
  if (iconType === 'image') {
    return (
      <div className={clsx("relative w-8 h-8", className)}>
        <Image
          src={icon}
          alt="Institution icon"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  const Icon = iconMap[icon as keyof typeof iconMap];
  return <Icon className={clsx("text-2xl", className)} />;
};

export default function CardBack({ info }: CardBackProps) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [expandedExpIndex, setExpandedExpIndex] = useState<number | null>(null);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(null);
  const [expScrollState, setExpScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
  const [eduScrollState, setEduScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
  const expScrollRef = useRef<HTMLDivElement>(null);
  const eduScrollRef = useRef<HTMLDivElement>(null);

  // Auto-expand first items on mount
  useEffect(() => {
    setExpandedExpIndex(0);
    setExpandedEduIndex(0);
  }, []);

  const checkScrollable = (element: HTMLDivElement | null, setScrollState: (state: { canScrollLeft: boolean, canScrollRight: boolean }) => void) => {
    if (!element) return;
    
    // Add a 20px threshold before showing scroll indicators
    const SCROLL_THRESHOLD = 20;
    
    const canScrollLeft = element.scrollLeft > SCROLL_THRESHOLD;
    const canScrollRight = element.scrollLeft < (element.scrollWidth - element.clientWidth - SCROLL_THRESHOLD);
    
    setScrollState({ canScrollLeft, canScrollRight });
  };

  useEffect(() => {
    const expElement = expScrollRef.current;
    const eduElement = eduScrollRef.current;

    if (expElement) {
      checkScrollable(expElement, setExpScrollState);
      const expObserver = new ResizeObserver(() => checkScrollable(expElement, setExpScrollState));
      expObserver.observe(expElement);
      return () => expObserver.disconnect();
    }

    if (eduElement) {
      checkScrollable(eduElement, setEduScrollState);
      const eduObserver = new ResizeObserver(() => checkScrollable(eduElement, setEduScrollState));
      eduObserver.observe(eduElement);
      return () => eduObserver.disconnect();
    }
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
    checkScrollable(e.currentTarget, 
      e.currentTarget === expScrollRef.current ? setExpScrollState : setEduScrollState
    );
  };

  const LeftIndicator = ({ show }: { show: boolean }) => (
    <div className="w-4">
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="text-white/60 text-sm"
          >
            <FaChevronLeft />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const RightIndicator = ({ show }: { show: boolean }) => (
    <div className="w-4">
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="text-white/60 text-sm"
          >
            <FaChevronRight />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div 
      className="w-full h-full p-8 relative bg-[#111111]/95"
    >
      <div className="h-full flex flex-col gap-6 md:gap-8">
        {/* Education Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <LeftIndicator show={eduScrollState.canScrollLeft} />
            <h2 className="text-white/80 text-lg">Education</h2>
            <RightIndicator show={eduScrollState.canScrollRight} />
          </div>
          <div className="relative">
            <div 
              ref={eduScrollRef}
              className="flex items-center gap-4 h-16 overflow-x-auto no-scrollbar"
              onWheel={handleWheel}
              onScroll={() => checkScrollable(eduScrollRef.current, setEduScrollState)}
            >
              {info.education.map((edu, index) => {
                const isExpanded = expandedEduIndex === index;
                
                return (
                  <motion.div
                    key={edu.school + index}
                    className="relative h-full flex-shrink-0"
                    animate={{
                      width: isExpanded ? 'auto' : '4rem',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  >
                    <motion.div
                      className={clsx(
                        "h-full rounded-xl",
                        "bg-white/5 hover:bg-white/10",
                        "transition-colors duration-200",
                        "flex items-center gap-3",
                        "px-3 relative"
                      )}
                      animate={{
                        paddingRight: isExpanded ? '1rem' : '0.75rem',
                      }}
                    >
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setExpandedEduIndex(isExpanded ? null : index)}
                      >
                        <IconComponent 
                          iconType={edu.iconType}
                          icon={edu.icon}
                          className="text-white/80 flex-shrink-0"
                        />
                        <motion.div
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            width: isExpanded ? 'auto' : 0,
                          }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          <p className="font-medium text-white">{edu.school}</p>
                          <p className="text-sm text-white/60">{edu.degree}</p>
                          <p className="text-xs text-white/40">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <LeftIndicator show={expScrollState.canScrollLeft} />
            <h2 className="text-white/80 text-lg">Experience</h2>
            <RightIndicator show={expScrollState.canScrollRight} />
          </div>
          <div className="relative">
            <div 
              ref={expScrollRef}
              className="flex items-center gap-4 h-16 overflow-x-auto no-scrollbar"
              onWheel={handleWheel}
              onScroll={() => checkScrollable(expScrollRef.current, setExpScrollState)}
            >
              {info.experience.map((exp, index) => {
                const isExpanded = expandedExpIndex === index;

                return (
                  <motion.div
                    key={exp.company + index}
                    className="relative h-full flex-shrink-0"
                    animate={{
                      width: isExpanded ? 'auto' : '4rem',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  >
                    <motion.div
                      className={clsx(
                        "h-full rounded-xl",
                        "bg-white/5 hover:bg-white/10",
                        "transition-colors duration-200",
                        "flex items-center gap-3",
                        "px-3 relative"
                      )}
                      animate={{
                        paddingRight: isExpanded ? '1rem' : '0.75rem',
                      }}
                    >
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => {
                          setExpandedExpIndex(isExpanded ? null : index);
                          setSelectedExp(null);
                        }}
                      >
                        <IconComponent 
                          iconType={exp.iconType}
                          icon={exp.icon}
                          className="text-white/80 flex-shrink-0"
                        />
                        <motion.div
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            width: isExpanded ? 'auto' : 0,
                          }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{exp.company}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedExp(exp);
                              }}
                              className="text-white/40 hover:text-white/60 transition-colors"
                            >
                              <FaInfoCircle />
                            </button>
                          </div>
                          <p className="text-sm text-white/60">{exp.role}</p>
                          <p className="text-xs text-white/40">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section>
          <h2 className="text-white/80 text-lg mb-4 text-center">Connect</h2>
          <div className="flex gap-4 justify-center">
            {info.socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={social.platform + index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={clsx(
                    "w-12 h-12 rounded-full",
                    "bg-white/5 hover:bg-white/10",
                    "transition-colors duration-200",
                    "flex items-center justify-center"
                  )}
                >
                  <Icon className="text-2xl text-white/80" />
                </motion.a>
              );
            })}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedExp.company}</h2>
                <p className="text-white/60">{selectedExp.role}</p>
                <p className="text-sm text-white/40">{selectedExp.startDate} - {selectedExp.endDate}</p>
              </div>
              <motion.button
                onClick={() => setSelectedExp(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-white/80" />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white/80 font-medium mb-2">Overview</h3>
                <p className="text-white/60">{selectedExp.description}</p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-2">Key Achievements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedExp.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="text-white/80">{achievement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 