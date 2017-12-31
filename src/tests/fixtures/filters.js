import moment from 'moment';

const defaultFilters = {
  text: '',
  sortBy: 'date',
  startDate: moment(0).startOf('month'),
  endDate: moment(0).endOf('month')
};

const filters = {
  text: 'bill',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { defaultFilters, filters };