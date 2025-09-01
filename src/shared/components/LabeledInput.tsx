import type React from 'react';
import styles from './LabeledInput.module.css';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
};

/**
 *@description 라벨이 있는 인풋 공통
 */
function LabeledInput({ value, onChange, id, name, type, placeholder }: Props) {
  return (
    <div className={styles.input_field}>
      <label htmlFor={id} />

      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default LabeledInput;
