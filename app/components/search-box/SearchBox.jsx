import React from 'react';
import bus from '../../bus';
import styles from './SearchBox.scss';

export default class SearchBox extends React.Component {
  componentDidMount() {
    this.refs.searchBox.focus(); 
  }

  onChange(event) {
    bus.emit('updateQ', event.target.value);
  }

  render() {
    return (
      <div className={styles['search-box-wrapper']}>
        <input ref='searchBox' className={styles['search-box']} placeholder="Search" onChange={this.onChange} />
      </div>
    );
  }
}
