<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { ExpenseSource } from '$lib/domain';
	import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';
	import { createEventDispatcher } from 'svelte';

	export let expenseSources: ExpenseSource[];

	const dispatch = createEventDispatcher<{
		edit: ExpenseSource;
		delete: ExpenseSource;
	}>();
</script>

<Table class="border-separate text-center" striped={true} hoverable={true}>
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
				on:edit={() => dispatch('edit', expenseSource)}
				on:delete={() => dispatch('delete', expenseSource)}
			/>
		{/each}
	</TableBody>
</Table>
