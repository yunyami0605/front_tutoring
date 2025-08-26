import clsx from 'clsx';
import styles from './Modal.module.css';

type Props = {
  isOpen: boolean;
  firstButtonText: string;
  firstButtonClick: () => void;
  secondButtonText?: string;
  secondButtonClick?: () => void;
  onClose: () => void;
};

function Modal({
  isOpen,
  onClose,
  firstButtonText,
  secondButtonText,
  firstButtonClick,
  secondButtonClick,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.body}>
          <button
            className={clsx(styles.button, styles.button_first)}
            onClick={firstButtonClick}
          >
            {firstButtonText}
          </button>

          <button
            className={clsx(styles.button, styles.button_second)}
            onClick={secondButtonClick}
          >
            {secondButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
