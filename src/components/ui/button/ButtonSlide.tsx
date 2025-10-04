// react
import React from 'react';

// styles
import styles from '@/components/ui/button/ButtonSlide.module.css';

interface ButtonSlideProps {
    text: string;
}

export const ButtonSlide: React.FC<ButtonSlideProps> = ({ text }) => {
    return (
        <button className={styles.ButtonSlide} data-text="Awesome">
            <span className="actual-text">&nbsp;{text}&nbsp;</span>
            <span aria-hidden="true" className={styles['hover-text']}>&nbsp;{text}&nbsp;</span>
        </button>
    );
};
