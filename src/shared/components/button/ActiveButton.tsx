import React from 'react';
import clsx from 'clsx';
import styles from './ActiveButton.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

function ActiveButton({
  children,
  disabled = false,
  onClick,
  type = 'button',
}: Props) {
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default ActiveButton;
