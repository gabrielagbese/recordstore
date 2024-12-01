import React, { useState, startTransition, Suspense } from 'react';
import LandingPage from './components/LandingPage';

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
    setModalState({ isOpen: false, title: '', ModalContent: null });
  };

  const handleEnter = () => {
    startTransition(() => {
      setHasEntered(true);
    });
  };

  return (
    <div className="relative w-screen h-screen">
      {!hasEntered ? (
        <LandingPage onEnter={handleEnter} />
      ) : (
        <Suspense fallback={<div>Loading Store...</div>}>
          <div className="relative w-screen h-screen">
            <StoreScene openModal={openModal} />

            {modalState.isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-blue">
                <div className="w-full max-w-sm p-6 bg-white rounded-lg">
                  <h2 className="mb-4 text-xl font-bold text-red-600">{modalState.title}</h2>
                  {modalState.ModalContent && <modalState.ModalContent />}
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default App;
