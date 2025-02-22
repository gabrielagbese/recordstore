// src/components/LandingPage.jsx
import React from 'react';

const LandingPage = ({ onEnter }) => {
    return (
        <div className="sky">
            {/* <button
                onClick={onEnter}
                className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Enter
            </button> */}
            <p>Museum</p>
            <div className='cloud'></div>
            <div className='platform'>
                <div className='l-build'></div>
                <div className='mid'>
                    <div class="trapezoid"></div>
                    <div className='roof'></div>
                    <div className='building-container'>
                        <div className='bld-other'></div>
                        <div className='building'>
                            <div className='lintel'></div>
                            <div className='door' onClick={onEnter}></div>
                        </div>
                        <div className='building-side'></div>
                    </div>
                    <div className='foundation'></div>
                </div>
                <div className='r-build'></div>
            </div>
            <div className='curb'></div>
            <div className='road'>

            </div>
        </div>
    );
};

export default LandingPage;
