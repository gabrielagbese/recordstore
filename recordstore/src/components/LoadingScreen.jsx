import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-blue-800">Loading Store Scene...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;