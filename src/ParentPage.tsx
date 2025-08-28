// import clsx from 'clsx';
// import styles from './ParentPage.module.scss';
import { useState } from 'react';
import ChildPage from './ChildPage';

function ParentPage() {
  const [name, setName] = useState('');

  return (
    <section id="부모">
      <div>부모</div>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <div>
        <ChildPage />
      </div>
    </section>
  );
}

export default ParentPage;
