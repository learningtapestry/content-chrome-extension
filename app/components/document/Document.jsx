import React from 'react';
import styles from './Document.scss';

export default class Document extends React.Component {

  render() {
    return (
      <li className={styles.document}>
        <div>
          <a className={styles.title} href={this.props.document.url} target="_blank">
            {this.props.document.title}
            <div className={styles['g-sharetoclassroom-container']}>
              <div className="g-sharetoclassroom"
                data-title={this.props.document.title}
                data-body={this.props.document.description}
                data-size="20"
                data-url={this.props.document.url} />
            </div>
          </a>
          <p>{this.props.document.description}</p>
        </div>
      </li>
    );
  }
}
