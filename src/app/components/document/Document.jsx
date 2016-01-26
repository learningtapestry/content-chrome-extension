import React from 'react';
import styles from './Document.scss';
import AddToClasroomButton from '../add-to-classroom-button';
import ShareButton from '../share-button';

export default class Document extends React.Component {

  actionButton() {
    if (this.isEmbedded()) {
      return <AddToClasroomButton
              title={this.props.document.title}
              description={this.props.document.description}
              url={this.props.document.url} />;
    } else {
      return <ShareButton
              title={this.props.document.title}
              description={this.props.document.description}
              url={this.props.document.url} />;
    }
  }

  isEmbedded() {
    if (typeof IS_EMBEDDED !== 'undefined' && IS_EMBEDDED) {
      return true;
    }
    return false;
  }

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
            {this.actionButton()}
          </div>
          <p>{this.props.document.description}</p>
        </div>
      </li>
    );
  }
}
