import { useState, useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { PersonalInfo, Experience } from '@/types/personal-info';
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaInfoCircle, FaTerminal, FaShieldAlt, FaRocket, FaCode, FaFlask, FaChevronLeft, FaChevronRight, SiMeta, SiGoogle, IoSchool, PiGraduationCap } from './icons';
import clsx from 'clsx';

interface CardBackProps {
  info: PersonalInfo;
  onBack?: () => void;
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
  iconType: string | 'icon' | 'image';
  icon: string;
  className?: string;
}

const IconComponent = ({ iconType, icon, className = "" }: IconProps) => {
  if (iconType === 'image') {
    return (
      <img
        src={icon}
        alt=""
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
        className={clsx("w-8 h-8 object-contain", className)}
      />
    );
  }

  const Icon = iconMap[icon as keyof typeof iconMap];
  return <Icon className={clsx("text-2xl", className)} />;
};

// Add a 20px threshold before showing scroll indicators
const SCROLL_THRESHOLD = 20;

type ScrollState = { canScrollLeft: boolean; canScrollRight: boolean };

// Horizontal strip with hidden scrollbar, wheel-to-horizontal scrolling, and
// fading chevrons next to the section title.
function ScrollSection({ title, className, children }: { title: string; className?: string; children: ComponentChildren }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<ScrollState>({ canScrollLeft: false, canScrollRight: false });

  useEffect(() => {
    const el = ref.current!;
    const update = () => setScroll({
      canScrollLeft: el.scrollLeft > SCROLL_THRESHOLD,
      canScrollRight: el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_THRESHOLD,
    });
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    // Content width changes as items expand, which ResizeObserver on the
    // scroll container itself doesn't see.
    for (const child of Array.from(el.children)) observer.observe(child);
    el.addEventListener('scroll', update, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', update);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  const indicator = (show: boolean, Icon: typeof FaChevronLeft) => (
    <div className="w-4" aria-hidden="true">
      <div className={clsx("text-white/60 text-sm transition-opacity duration-300", show ? "opacity-80" : "opacity-0")}>
        <Icon />
      </div>
    </div>
  );

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-2 short:mb-1">
        {indicator(scroll.canScrollLeft, FaChevronLeft)}
        <h2 className="text-white/80 text-lg short:text-base">{title}</h2>
        {indicator(scroll.canScrollRight, FaChevronRight)}
      </div>
      <div ref={ref} className="flex items-center gap-4 h-16 overflow-x-auto no-scrollbar">
        {children}
      </div>
    </section>
  );
}

// A logo chip that smoothly reveals its details when expanded.
function ExpandableItem({ iconType, icon, label, expanded, onToggle, children }: {
  iconType: string;
  icon: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: ComponentChildren;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={label}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onToggle();
        }
      }}
      className={clsx(
        "h-full flex-shrink-0 rounded-xl cursor-pointer",
        "bg-white/5 hover:bg-white/10",
        "transition-[background-color,padding] duration-200",
        "flex items-center px-3",
        expanded && "pr-4"
      )}
    >
      <IconComponent iconType={iconType} icon={icon} className="text-white/80 flex-shrink-0" />
      <div
        className={clsx(
          "grid transition-[grid-template-columns,opacity] duration-300 ease-out",
          expanded ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden whitespace-nowrap min-w-0 text-left">
          <div className="pl-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function CardBack({ info, onBack }: CardBackProps) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  // Keeps modal content rendered while it slides out.
  const [shownExp, setShownExp] = useState<Experience | null>(null);
  // First items start expanded.
  const [expandedExpIndex, setExpandedExpIndex] = useState<number | null>(0);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openExp = (exp: Experience) => {
    setShownExp(exp);
    setSelectedExp(exp);
  };

  useEffect(() => {
    if (!selectedExp) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedExp(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedExp]);

  return (
    <div className="w-full h-full px-6 md:px-8 pt-14 pb-6 short:pt-12 short:pb-3 relative bg-[#111111]/95">
      {onBack && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedExp(null);
            onBack();
          }}
          aria-label="Flip back to front"
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-[background-color,transform] hover:scale-105 active:scale-95"
        >
          <FaChevronLeft className="text-xl" />
        </button>
      )}
      <div className="h-full flex flex-col justify-center gap-8 md:justify-between md:gap-0">
        <ScrollSection title="Education">
          {info.education.map((edu, index) => (
            <ExpandableItem
              key={edu.school + index}
              iconType={edu.iconType}
              icon={edu.icon}
              label={edu.school}
              expanded={expandedEduIndex === index}
              onToggle={() => setExpandedEduIndex(expandedEduIndex === index ? null : index)}
            >
              <p className="font-medium text-white">{edu.school}</p>
              <p className="text-sm text-white/60">{edu.degree}</p>
              <p className="text-xs text-white/40">
                {edu.startDate} - {edu.endDate}
              </p>
            </ExpandableItem>
          ))}
        </ScrollSection>

        <ScrollSection title="Experience">
          {info.experience.map((exp, index) => (
            <ExpandableItem
              key={exp.company + index}
              iconType={exp.iconType}
              icon={exp.icon}
              label={exp.company}
              expanded={expandedExpIndex === index}
              onToggle={() => {
                setExpandedExpIndex(expandedExpIndex === index ? null : index);
                setSelectedExp(null);
              }}
            >
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">{exp.company}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openExp(exp);
                  }}
                  tabIndex={expandedExpIndex === index ? 0 : -1}
                  aria-label={`More about ${exp.company}`}
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <FaInfoCircle />
                </button>
              </div>
              <p className="text-sm text-white/60">{exp.role}</p>
              <p className="text-xs text-white/40">
                {exp.startDate} - {exp.endDate}
              </p>
            </ExpandableItem>
          ))}
        </ScrollSection>

        <section>
          <h2 className="text-white/80 text-lg short:text-base mb-2 short:mb-1 text-center">Connect</h2>
          <div className="flex gap-4 justify-center">
            {info.socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.platform + index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className={clsx(
                    "w-12 h-12 short:w-10 short:h-10 rounded-full",
                    "bg-white/5 hover:bg-white/10 hover:scale-110",
                    "transition-[background-color,transform] duration-200",
                    "flex items-center justify-center"
                  )}
                >
                  <Icon className="text-2xl text-white/80" />
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={shownExp ? `${shownExp.company} details` : undefined}
        inert={!selectedExp}
        onTransitionEnd={() => !selectedExp && setShownExp(null)}
        className={clsx(
          "absolute inset-0 z-30 bg-black/95 backdrop-blur-sm p-8 overflow-y-auto text-left",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          selectedExp ? "translate-y-0" : "translate-y-full"
        )}
      >
        {shownExp && (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{shownExp.company}</h2>
                <p className="text-white/60">{shownExp.role}</p>
                <p className="text-sm text-white/40">{shownExp.startDate} - {shownExp.endDate}</p>
              </div>
              <button
                ref={closeRef}
                onClick={() => setSelectedExp(null)}
                aria-label="Close"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-[background-color,transform] hover:scale-110 active:scale-95"
              >
                <FaTimes className="text-white/80" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white/80 font-medium mb-2">Overview</h3>
                <p className="text-white/60">{shownExp.description}</p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-2">Key Achievements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {shownExp.achievements.map((achievement, index) => (
                    <li key={index} className="text-white/80">{achievement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {shownExp.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
