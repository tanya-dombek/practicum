import React from 'react';
import styles from './pages.module.css';

export function NotFound404() {

  return (
    <div className={styles.notFoundPage}>
      <h1 className={`${styles.notFoundPageH1} text text_type_main-large`}>Oops! 404 Error</h1>
      <p className={`${styles.notFoundPageP} text text_type_main-default`}>The page you requested does not exist</p>
    </div>
  );
}