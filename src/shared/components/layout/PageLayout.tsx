import React from 'react';
import styles from './PageLayout.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showHeader?: boolean;
  showBack?: boolean;
  showTab?: boolean;
  children: React.ReactNode;
}

function PageLayout({
  title,
  showHeader = false,
  showBack = false,
  showTab = false,
  children,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Header */}
      {showHeader && (
        <header className={styles.header}>
          {showBack && (
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              ←
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
        </header>
      )}

      {/* Main */}
      <main className={styles.main}>{children}</main>

      {/* BottomTab (옵션) */}
      {showTab && (
        <nav className={styles.bottomTab}>
          <button>홈</button>
          <button>기록</button>
          <button>설정</button>
        </nav>
      )}
    </div>
  );
}

export default PageLayout;
