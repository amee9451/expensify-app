const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});

const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});

export {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
}