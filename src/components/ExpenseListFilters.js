import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';

import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = (event) => {
    this.props.setTextFilter(event.target.value);
  };

  onSortChange = (event) => {
    switch (event.target.value) {
      case 'amount':
        this.props.sortByAmount()
        break;
      case 'date':
        this.props.sortByDate()
        break;
    }
  };

  render () {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input 
              className="text-input"
              type="text" 
              placeholder="Search expenses"
              value={this.props.filters.text} 
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="startDate"
              endDate={this.props.filters.endDate}
              endDateId="endDate"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);