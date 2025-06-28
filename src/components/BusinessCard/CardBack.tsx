import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalInfo, Experience } from '@/types/personal-info';
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaInfoCircle, FaTerminal } from 'react-icons/fa';
import { SiMeta, SiGoogle } from 'react-icons/si';
import { IoSchool } from 'react-icons/io5';
import { PiGraduationCap } from 'react-icons/pi';
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
};

export default function CardBack({ info }: CardBackProps) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [expandedExpIndex, setExpandedExpIndex] = useState<number | null>(null);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(null);

  // Auto-expand first items on mount
  useEffect(() => {
    setExpandedExpIndex(0);
    setExpandedEduIndex(0);
  }, []);

  return (
    <div 
      className="w-full h-full rounded-3xl p-8 transform md:transform-none rotate-90 md:rotate-0 relative overflow-hidden"
      style={{ background: info.theme.cardBackground }}
    >
      <div className="h-full flex flex-col gap-8">
        {/* Education Section */}
        <section>
          <h2 className="text-white/80 text-lg mb-4">Education</h2>
          <div className="flex items-center gap-4 h-16">
            {info.education.map((edu, index) => {
              const Icon = iconMap[edu.icon as keyof typeof iconMap];
              const isExpanded = expandedEduIndex === index;
              
              return (
                <motion.div
                  key={edu.school + index}
                  className="relative h-full"
                  animate={{
                    width: isExpanded ? 'auto' : '3rem',
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
                      <Icon className="text-2xl text-white/80 flex-shrink-0" />
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
        </section>

        {/* Experience Section */}
        <section className="flex-1">
          <h2 className="text-white/80 text-lg mb-4">Experience</h2>
          <div className="flex items-center gap-4 h-16">
            {info.experience.map((exp, index) => {
              const Icon = iconMap[exp.icon as keyof typeof iconMap];
              const isExpanded = expandedExpIndex === index;
              
              return (
                <motion.div
                  key={exp.company + index}
                  className="relative h-full"
                  animate={{
                    width: isExpanded ? 'auto' : '3rem',
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
                      paddingRight: isExpanded ? '2.5rem' : '0.75rem',
                    }}
                  >
                    <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => setExpandedExpIndex(isExpanded ? null : index)}
                    >
                      <Icon className="text-2xl text-white/80 flex-shrink-0" />
                      <motion.div
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          width: isExpanded ? 'auto' : 0,
                        }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        <p className="font-medium text-white">{exp.company}</p>
                        <p className="text-sm text-white/60">{exp.role}</p>
                        <p className="text-xs text-white/40">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </motion.div>
                    </div>
                    {isExpanded && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExp(exp);
                        }}
                      >
                        <FaInfoCircle className="text-white/60 text-lg" />
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Connect Section */}
        <section>
          <h2 className="text-white/80 text-lg mb-4">Connect</h2>
          <div className="flex gap-4">
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
                  {selectedExp.achievements.map((achievement, index) => (
                    <li key={index} className="text-white/60">{achievement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/80"
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