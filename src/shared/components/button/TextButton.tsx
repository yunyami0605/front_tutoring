import React from 'react';
import clsx from 'clsx';
import styles from './TextButton.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function TextButton({ children, disabled = false, onClick }: Props) {
  return (
    <button
      className={clsx(styles.button)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TextButton;
