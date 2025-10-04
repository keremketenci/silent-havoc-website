// react
import React from 'react';

// styles
import styles from '@/components/ui/loader/LoaderGlitch.module.css';

interface LoaderGlitchProps {
    text: string;
}

export const LoaderGlitch: React.FC<LoaderGlitchProps> = ({ text }) => {
    return (
        <div className="loader">
            <div className={styles.LoaderGlitch} data-glitch={text}>
                {text}
            </div>
        </div>
    );
};
