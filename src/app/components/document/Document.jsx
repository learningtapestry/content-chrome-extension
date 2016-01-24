import React from 'react';
import styles from './Document.scss';
import ShareButton from '../share-button';

export default class Document extends React.Component {

  shareToClassroom() {
    gapi.sharetoclassroom.render(this.refs.shareButton, { size: 20 });
    window.setTimeout(() => {
    }, 1000);
  }

  render() {
    return (
      <li className={styles.document}>
        <div>
          <div className={styles.title}>
            <a href={this.props.document.url} target="_blank">
              {this.props.document.title}
            </a>
            <ShareButton
              title={this.props.document.title}
              body={this.props.document.description}
              url={this.props.document.url} />
          </div>
          <p>{this.props.document.description}</p>
        </div>
      </li>
    );
  }
}
