import React, { useState, startTransition, Suspense } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import { Analytics } from "@vercel/analytics/react";
import { Loader } from '@react-three/drei';

const StoreScene = React.lazy(() => import('./components/StoreScene'));

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    ModalContent: null,
  });

  const [hasEntered, setHasEntered] = useState(false);

  const openModal = (title, ModalContent) => {
    setModalState({
      isOpen: true,
      title,
      ModalContent,
    });
  };

  const closeModal = () => {
    // Only toggle the modal visibility
    setModalState(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleEnter = () => {
    startTransition(() => {
      setHasEntered(true);
    });
  };

  return (
    <div className="relative w-screen h-screen">
      <Analytics />
      {!hasEntered ? (
        <LandingPage onEnter={handleEnter} />
      ) : (

        <div className="relative w-screen h-screen">
          <StoreScene openModal={openModal} isModalOpen={modalState.isOpen} />
          <Loader />

          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-blue transition-all duration-300 ${modalState.isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
          >
            <div className="w-11/12 max-h-[80vh] bg-white/25 border-gray-500/60 p-1 border backdrop-blur-md rounded-lg shadow-xl flex flex-col overflow-hidden
                          sm:w-[480px] sm:h-[500px]
                          md:w-[640px] md:h-[600px]
                          lg:w-[600px] lg:h-[600px]"
            >
              <button
                onClick={closeModal}
                className="px-4 py-2 mx-1 mt-1 text-white rounded w-min bg-zinc-900"
              >
                Close
              </button>
              <div className="flex-1 p-3 overflow-y-auto md:p-6">
                {/* Always render the ModalContent */}
                {modalState.ModalContent && <modalState.ModalContent />}
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default App;
