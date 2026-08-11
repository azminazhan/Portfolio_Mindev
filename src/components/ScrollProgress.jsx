import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed right-0 top-0 bottom-0 w-12 z-50 flex items-center justify-center hidden md:flex">
            {/* Track */}
            <div className="h-2/3 w-[2px] bg-white/10 relative rounded-full overflow-hidden">
                {/* Indicator */}
                <motion.div
                    className="absolute top-0 left-0 right-0 w-full bg-primary origin-top"
                    style={{ scaleY, backgroundColor: 'var(--primary)' }}
                />
            </div>
        </div>
    );
};

export default ScrollProgress;
