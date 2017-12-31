import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

//const date= new Date();
const now = moment();

class ExpenseForm extends React.Component {
  constructor (props) {
    super(props);

    const expense = props.expense || {};

    this.state = {
      description: expense.description || '',
      note: expense.note || '',
      amount: typeof expense.amount !== 'undefined' ? (expense.amount / 100).toString() : '',
      createdAt: typeof expense.createdAt !== 'undefined' ? moment(expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }

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

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ createdAt: date }));
    }
  };

  onCalendarFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please be sure to enter a description and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: Math.round(parseFloat(this.state.amount) * 100),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render () {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}> 
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