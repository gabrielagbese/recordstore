import React, { useState } from 'react';
import StoreScene from './components/StoreScene';

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: '',
  });

  const openModal = (title, content) => {
    setModalState({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', content: '' });
  };

  return (
    <div className="relative h-screen w-screen">
      <StoreScene openModal={openModal} />

      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl text-red-600 font-bold mb-4">{modalState.title}</h2>
            <p className="mb-4">{modalState.content}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Closer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;