<script lang="ts">
  import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { ExpenseSource } from '$lib/domain';
  import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';
  import AddButton from './addButton.svelte';

  export let expenseSources: ExpenseSource[];
</script>

<Table class="text-center border-separate">
  <TableHead>
    <TableHeadCell>שם</TableHeadCell>
    <TableHeadCell>עלות חודשית</TableHeadCell>
    <TableHeadCell>עלות שנתית</TableHeadCell>
    <TableHeadCell>עלות לתקופה</TableHeadCell>
    <TableHeadCell>עריכה</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each expenseSources as expenseSource}
      <ExpenseSourcesTableRow {expenseSource} />
    {/each}
  </TableBody>
</Table>
<div class="flex justify-center">
  <AddButton/>
</div>
