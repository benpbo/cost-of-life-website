<script lang="ts">
  import { ExpenseSource, RecurringMoneyValue, Period } from '$lib/domain';
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';

  let expenseSources = [
    new ExpenseSource(1, "הוצאה 1", new RecurringMoneyValue(10, new Period("Month", 2))),
    new ExpenseSource(2, "הוצאה 2", new RecurringMoneyValue(40, new Period("Year", 2))),
  ];
</script>

<ExpenseSourcesTable {expenseSources} />
