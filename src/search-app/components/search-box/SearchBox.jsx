import React from 'react';
import bus from '../../bus';
import styles from './SearchBox.scss';
import debounce from 'lodash/debounce';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.updateQ = debounce(this.updateQ, 200);
  }

  componentDidMount() {
    this.refs.searchBox.focus(); 
  }

  onChange(event) {
    event.persist();
    this.updateQ(event.target.value);
  }

  updateQ(value) {
    bus.emit('updateQ', value);
  }

  render() {
    return (
      <div className={styles['search-box-wrapper']}>
        <input ref='searchBox' className={styles['search-box']} placeholder="Search" onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
