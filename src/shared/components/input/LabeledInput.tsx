import React from 'react';
import styles from './LabeledInput.module.css';

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // 에러 메시지 추가
}

function LabeledInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error_input : ''}`}
      />

      {error && <p className={styles.error_msg}>{error}</p>}
    </div>
  );
}

export default LabeledInput;
