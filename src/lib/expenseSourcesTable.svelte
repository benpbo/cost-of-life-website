<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { ExpenseSource } from '$lib/domain';
	import ExpenseSourcesTableRow from './expenseSourcesTableRow.svelte';
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let expenseSources: ExpenseSource[];

	const dispatch = createEventDispatcher<{
		edit: ExpenseSource;
		delete: ExpenseSource;
	}>();
</script>

<Table class="border-separate text-center" striped={true} hoverable={true}>
	<TableHead>
		<TableHeadCell>{$_("expenses.tableTitle.name")}</TableHeadCell>
		<TableHeadCell class="w-36">{$_("expenses.tableTitle.costPerMonth")}</TableHeadCell>
		<TableHeadCell class="w-36">{$_("expenses.tableTitle.costPerYear")}</TableHeadCell>
		<TableHeadCell class="w-48">{$_("expenses.tableTitle.costForPeriod")}</TableHeadCell>
		<TableHeadCell class="w-48">{$_("expenses.tableTitle.edit")}</TableHeadCell>
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
