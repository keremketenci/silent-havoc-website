// react
import React from 'react';

// styles
import styles from '@/components/ui/label/LabelAsync.module.css';

interface LabelAsyncProps {
    text1?: string;
    text1Class?: string,
    text2?: string;
    text2Class?: string,
    text3?: string;
    text3Class?: string,
    text4?: string;
    text4Class?: string,
}

export const LabelAsync: React.FC<LabelAsyncProps> = ({ text1, text1Class, text2, text2Class, text3, text3Class, text4, text4Class }) => {
    return (
        <div className='flex cursor-target md:cursor-none'>
            <div className={``}>
                <div className={`${styles.LabelAsyncLoader} select-none`}>
                    <div className={`${styles.LabelAsyncWords} text-center`}>
                        <a className='md:cursor-none' href='https://keremketenci.com' target='_blank' rel='noopener noreferrer'>
                            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
                            <span className={`${styles.LabelAsyncWord} ${text2Class}`}>{text2}</span>
                            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
                            <span className={`${styles.LabelAsyncWord} ${text2Class}`}>{text2}</span>
                            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className={``}>
                <div className={`${styles.LabelAsyncLoader} select-none`}>
                    <div className={`${styles.LabelAsyncWords} text-center`}>
                        <a className='md:cursor-none' href='https://keremketenci.com' target='_blank' rel='noopener noreferrer'>
                            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
                            <span className={`${styles.LabelAsyncWord} ${text4Class}`}>{text4}</span>
                            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
                            <span className={`${styles.LabelAsyncWord} ${text4Class}`}>{text4}</span>
                            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
