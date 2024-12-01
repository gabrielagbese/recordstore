import React from 'react';

const LandingPage = ({ onEnter }) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="p-8 text-center bg-white rounded-lg shadow-xl">
                <h1 className="mb-6 text-4xl font-bold text-blue-800">Welcome</h1>
                <p className="mb-8 text-lg text-gray-600">
                    Get ready to explore our amazing store!
                </p>
                <button
                    onClick={onEnter}
                    className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
