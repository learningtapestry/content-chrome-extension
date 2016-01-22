import React from 'react';
import bus from '../../bus.js';
import styles from './Paginator.scss';

export default class Paginator extends React.Component {

  get totalPages() {
    let workableTotal = this.props.total <= 10000 ? this.props.total : 10000;
    return Math.ceil(workableTotal / this.props.limit);
  }

  get nextPage() {
    let total = this.totalPages;
    let next = this.props.page + 1;
    return next < total ? next : total;
  }

  get previousPage() {
    let prev = this.props.page - 1;
    return prev > 1 ? prev : 1;
  }

  setPage(page) {
    bus.emit('updatePage', page);
  }

  render() {
    return (
      <div className={styles.paginator}>
        <span>Found {this.props.total} documents. </span>
        <span>Showing {this.props.count}. </span>
        <div className={styles['page-buttons']}>
          <span className={styles.button} onClick={this.setPage.bind(this, 1)}>
            <i className="fa fa-angle-double-left"></i>
          </span>
          <span className={styles.button} onClick={this.setPage.bind(this, this.previousPage)}>
            <i className="fa fa-angle-left"></i>
          </span>
          <span className={styles['page-display']}>
            Page {this.props.page} of {this.totalPages}
          </span>
          <span className={styles.button} onClick={this.setPage.bind(this, this.nextPage)}>
            <i className="fa fa-angle-right"></i>
          </span>
          <span className={styles.button} onClick={this.setPage.bind(this, this.totalPages)}>
            <i className="fa fa-angle-double-right"></i>
          </span>
        </div>
      </div>
    );
  }
}
