// translations
import { useTranslations } from 'next-intl';

// components
import { JoinUsCard } from "@/components/JoinUs/JoinUsCard";
import { JoinUsCarousel } from "@/components/JoinUs/JoinUsCarousel";


import { useNavigateToSection } from "@/app/hooks/useNavigateToSection";

// data
import { getJobs } from "@/components/JoinUs/data/Jobs";

export function JoinUs({ onApplyClick }: { onApplyClick: (title: string) => void }) {
    const t = useTranslations('JoinUs');
      const navigateToSection = useNavigateToSection();
    const jobs = getJobs(t, onApplyClick, navigateToSection);
    
    return (
        <div>
            <p className="text-4xl font-bold text-center p-4 text-accent">{`${t('title')}`}</p>

            <div className="block xl:hidden">
                <JoinUsCarousel jobs={jobs} />
            </div>

            <div className="hidden xl:block">
                <div className='flex gap-8'>
                    <JoinUsCard jobs={jobs} />
                </div>
            </div>

        </div>
    );
};
