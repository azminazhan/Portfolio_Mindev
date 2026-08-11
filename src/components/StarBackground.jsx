import React from 'react';

const StarBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#081318]" aria-hidden="true">
        <div className="background-grid absolute inset-0" />
        <div className="absolute -top-48 -right-36 w-[34rem] h-[34rem] rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute top-[42%] -left-48 w-[30rem] h-[30rem] rounded-full bg-emerald-400/10 blur-[130px]" />
    </div>
);

export default StarBackground;
