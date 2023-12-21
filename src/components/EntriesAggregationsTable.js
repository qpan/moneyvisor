import { first, groupBy } from 'lodash';
import { useFetchEntriesByYearMonth } from '../hooks/use-fetch-entries-by-year-month';
import { useFetchTypesQuery } from '../store';
import AggregationsTable from './AggregationsTable';

function EntriesAggregationsTable() {
  const { data, error, isFetching } = useFetchEntriesByYearMonth();
  const { data: typeData, error: typeError, isFetching: typeIsFetching } = useFetchTypesQuery();
  const aggregations = {
    income: 0,
    expense: 0,
    total: 0,
  }

  const typesGroupById = groupBy(typeData, 'id');

  data?.forEach(entry => {
    if (typesGroupById[entry.typeId]) {
      const { name } = first(typesGroupById[entry.typeId]);
      aggregations[name] += entry.amount;
    }
  });

  aggregations.total = aggregations.income - aggregations.expense;


  let content;

  if (isFetching && typeIsFetching) {
    content = (
      <AggregationsTable />
    );
  } else if (error || typeError) {
    content = <div>Error loading entries aggregations</div>
  } else {
    content = (
      <AggregationsTable data={aggregations} />
    );
  }

  return (
    <>
      { content }
    </>
  );
}

export default EntriesAggregationsTable;