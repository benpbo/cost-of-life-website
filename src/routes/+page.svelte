<script lang="ts">
  import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let { expenseSources } = data;
</script>

<ExpenseSourcesTable {expenseSources} />
