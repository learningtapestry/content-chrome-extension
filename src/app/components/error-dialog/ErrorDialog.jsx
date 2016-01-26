import React from 'react';
import styles from './ErrorDialog.scss';

export default class ErrorDialog extends React.Component {
  render() {
    return (
      <div className={styles['error-dialog']}>
        <p className={styles['message']}>
          Sorry, but we can't show results right now. <br/>
          Please try again later.
        </p>
      </div>
    );
  }
}
