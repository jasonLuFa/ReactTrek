import { useEffect, useState } from 'react';
import './css/WarningModal.css';
import { useGlobalContext } from './context';

const WarningModal = () => {
  const [isWarningModalCheck, setIsWarningModalCheck] = useState(false);
  const { isOpenWarningModal, setIsOpenWarningModal, setIsShowAnswer } =
    useGlobalContext();

  const handleCancel = () => {
    setIsOpenWarningModal(false);
  };

  const handleSure = () => {
    setIsOpenWarningModal(isWarningModalCheck);
    setIsShowAnswer(true);
  };

  useEffect(
    () => localStorage.setItem('isWarningModalCheck', isWarningModalCheck),
    [isWarningModalCheck]
  );

  return (
    <div className='modal-container isOpen'>
      <div className='modal-content'>
        <h2>Are you sure to submit and see the answer?</h2>
        <label className='checkbox'>
          <input
            type='checkbox'
            defaultChecked={isWarningModalCheck}
            onChange={() => setIsWarningModalCheck(!isWarningModalCheck)}
          />
          Don't ask me again!
        </label>
        <div className='warning-button-container'>
          <button className='sure-btn' onClick={handleSure}>
            sure
          </button>
          <button className='cancel-btn' onClick={handleCancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
