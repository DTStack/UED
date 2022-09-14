import React, { useEffect, useRef } from 'react';
import { throttle } from '@/utils';

import style from './index.module.scss';

const Jumper = ({ children }: any) => {
    const elemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = throttle(() => {
            const windowHeight = window.innerHeight;
            const elementTop =
                elemRef.current?.getBoundingClientRect().top || 0;
            const elementVisible = 50;

            if (elementTop < windowHeight - elementVisible) {
                elemRef.current?.classList.add('jumperActive');
            } else {
                elemRef.current?.classList.remove('jumperActive');
            }
        }, 200);

        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className={style.jumper} ref={elemRef}>
            {children}
        </div>
    );
};

export default Jumper;
