import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = ({ dispatch, filters }) => (
  <div>
    <input 
      type="text" 
      value={filters.text} 
      onChange={(event) => {
        dispatch(setTextFilter(event.target.value));
      }}
    />
    <select
      value={filters.sortBy}
      onChange={(event) => {
        switch (event.target.value) {
          case 'amount':
            dispatch(sortByAmount())
            break;
          case 'date':
            dispatch(sortByDate())
            break;
        }
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);