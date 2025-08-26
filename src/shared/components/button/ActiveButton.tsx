import React from 'react';
import clsx from 'clsx';
import styles from './ActiveButton.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function ActiveButton({ children, disabled = false, onClick }: Props) {
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ActiveButton;
