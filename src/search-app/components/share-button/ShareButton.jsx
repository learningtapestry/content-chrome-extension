import React from 'react';
import styles from './ShareButton.scss';

export default class ShareButton extends React.Component {

  renderButtons() {
    gapi.sharetoclassroom.render(this.refs.shareButton, { size: 20 });
  }

  render() {
    return (
      <div className={styles['share-button']}>
        <button onClick={this.renderButtons.bind(this)}><i className="fa fa-share-alt"></i> Share</button>
        <div className={styles['g-sharetoclassroom-container']}>
          <div className="g-sharetoclassroom"
            data-title={this.props.title}
            data-body={this.props.description}
            data-size="20"
            data-url={this.props.url}
            ref='shareButton' />
        </div>
      </div>
    );
  }
}
