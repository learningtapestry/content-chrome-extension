import React from 'react';
import styles from './AddToClassroomButton.scss';

export default class AddToClassroomButton extends React.Component {

  sendToClassroom() {
    let message = {
      name: 'FILL_FORM',
      data: {
        title: this.props.title,
        description: this.props.description,
        url: this.props.url
      }
    };

    parent.postMessage(message, 'https://classroom.google.com');
  }

  render() {
    return (
      <div className={styles['add-to-classroom-button']}>
        <button onClick={this.sendToClassroom.bind(this)}>Create Classroom assignment</button>
      </div>
    );
  }
}
