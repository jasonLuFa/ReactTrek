import { useEffect, useState } from 'react';
import './css/WarningModal.css';
import { useGlobalContext } from './context';

const WarningModal = () => {
  const [isShowWarningModal, setIsShowWarningModal] = useState(true);
  const { setIsOpenWarningModal, setIsShowAnswer } = useGlobalContext();

  const handleCancel = () => {
    setIsOpenWarningModal(false);
  };

  const handleSure = () => {
    setIsOpenWarningModal(false);
    setIsShowAnswer(true);
  };

  useEffect(() => {
    localStorage.setItem('isShowWarningModal', isShowWarningModal);
  }, [isShowWarningModal]);

  return (
    <div className='modal-container isOpen'>
      <div className='modal-content'>
        <h2>Are you sure to submit and see the answer?</h2>
        <label className='checkbox'>
          <input
            type='checkbox'
            defaultChecked={!isShowWarningModal}
            onChange={() => setIsShowWarningModal(!isShowWarningModal)}
          />
          Don't ask me again!
        </label>
        <div className='warning-button-container'>
          <button className='cancel-btn' onClick={handleCancel}>
            cancel
          </button>
          <button className='sure-btn' onClick={handleSure}>
            sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
