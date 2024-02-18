<script lang="ts">
  import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { ExpenseSource } from '$lib/domain';
	import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';

  export let expenseSources: ExpenseSource[];
</script>

<Table class="text-center border-separate">
  <TableHead>
    <TableHeadCell>שם</TableHeadCell>
    <TableHeadCell>עלות חודשית</TableHeadCell>
    <TableHeadCell>עלות שנתית</TableHeadCell>
    <TableHeadCell>עלות לתקופה</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each expenseSources as expenseSource}
      <ExpenseSourcesTableRow {expenseSource} />
    {/each}
  </TableBody>
</Table>

