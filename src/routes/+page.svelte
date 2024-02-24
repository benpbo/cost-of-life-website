<script lang="ts">
  import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let { expenseSources } = data;
</script>

<div class="px-2">
  <h2 class="text-4xl font-extrabold">ערוך הוצאות</h2>
  <ExpenseSourcesTable {expenseSources} />
</div>
