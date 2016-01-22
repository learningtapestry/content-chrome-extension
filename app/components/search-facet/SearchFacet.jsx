import React from 'react';
import bus from '../../bus';
import styles from './SearchFacet.scss';

export default class SearchFacet extends React.Component {
  onChange(event) {
    bus.emit('updateFacet', this.props.group, this.props.facet.id, event.target.checked);
  }

  render() {
    return (
      <li className={styles['search-facet']}>
        <label>
          <input type="checkbox" checked={this.props.isSelected} onChange={this.onChange.bind(this)} />
          <span className={styles.chk} />
          <span className={styles.name}>{this.props.facet.name}</span>
          <span className={styles.total}>({this.props.facet.total})</span>
        </label>
      </li>
    );
  }
}
