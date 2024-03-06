<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { ExpenseSource } from '$lib/domain';
	import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';

	export let expenseSources: ExpenseSource[];
	export let onDelete: (e: MouseEvent, expenseSource: ExpenseSource) => void;
	export let onEdit: (e: MouseEvent, expenseSource: ExpenseSource) => void;
</script>

<Table
	class="border-separate text-center"
  striped={true}
  hoverable={true}
>
	<TableHead>
		<TableHeadCell>שם</TableHeadCell>
		<TableHeadCell class="w-36">עלות חודשית</TableHeadCell>
		<TableHeadCell class="w-36">עלות שנתית</TableHeadCell>
		<TableHeadCell class="w-48">עלות לתקופה</TableHeadCell>
		<TableHeadCell class="w-48">עריכה</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each expenseSources as expenseSource}
			<ExpenseSourcesTableRow
				{expenseSource}
				onDelete={(e) => onDelete(e, expenseSource)}
				onEdit={(e) => onEdit(e, expenseSource)}
			/>
		{/each}
	</TableBody>
</Table>
