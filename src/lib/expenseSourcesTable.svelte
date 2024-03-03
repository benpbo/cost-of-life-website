<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { ExpenseSource } from '$lib/domain';
	import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';

	export let expenseSources: ExpenseSource[];
	export let onDelete: (e: MouseEvent, expenseSource: ExpenseSource) => void;
</script>

<Table class="border-separate text-center">
	<TableHead>
		<TableHeadCell>שם</TableHeadCell>
		<TableHeadCell>עלות חודשית</TableHeadCell>
		<TableHeadCell>עלות שנתית</TableHeadCell>
		<TableHeadCell>עלות לתקופה</TableHeadCell>
		<TableHeadCell>עריכה</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each expenseSources as expenseSource}
			<ExpenseSourcesTableRow {expenseSource} onDelete={(e) => onDelete(e, expenseSource)} />
		{/each}
	</TableBody>
</Table>
