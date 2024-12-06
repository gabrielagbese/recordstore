import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-orange-100 to-orange-300">
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-4 rounded-full border-brown-700 border-t-orange-500 animate-spin"></div>
                <p className="mt-4 text-lg text-brown-800">Loading Experience...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;