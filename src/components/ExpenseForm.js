import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

//const date= new Date();
const now = moment();
console.log(now.format('MMM Do, YYYY'));

class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false
  };

  onDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (event) => {
    const note = event.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (event) => {
    const amount = event.target.value;

    if (amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (date) => {
    this.setState(() => ({ createdAt: date }));
  };

  onCalendarFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  render () {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker 
            date={this.state.createdAt} 
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onCalendarFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}
export default ExpenseForm;