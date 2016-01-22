import React from 'react';
import styles from './Document.scss';

export default class Document extends React.Component {
  render() {
    return (
      <li className={styles.document}>
        <div>
          <a className={styles.title} href={this.props.document.url} target="_blank">
            {this.props.document.title}
          </a>
          <p>{this.props.document.description}</p>
        </div>
      </li>
    );
  }
}
