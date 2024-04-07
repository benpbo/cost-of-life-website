<script lang="ts">
	import { Button, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { ExpenseSource, Period, calculateMonthlyCost, calculateYearlyCost } from '$lib/domain';
	import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { _, number } from 'svelte-i18n';

	export let expenseSource: ExpenseSource;

	const dispatch = createEventDispatcher<{
		edit: null;
		delete: null;
	}>();

	function getPeriodText(period: Period): string {
		switch (period.kind) {
			case 'Month':
				if (period.every == 1) {
					return $_('timePeriod.month.onceInOne');
				} else if (period.every == 2) {
					return $_('timePeriod.month.onceInTwo');
				} else {
					return $_('timePeriod.month.onceInMany', { values: { amount: period.every } });
				}
			case 'Year':
				if (period.every == 1) {
					return $_('timePeriod.year.onceInOne');
				} else if (period.every == 2) {
					return $_('timePeriod.year.onceInTwo');
				} else {
					return $_('timePeriod.year.onceInMany', { values: { amount: period.every } });
				}
		}
	}
</script>

<TableBodyRow>
	<TableBodyCell>{expenseSource.name}</TableBodyCell>
	<TableBodyCell>
		{$number(calculateMonthlyCost(expenseSource.expense), {
			style: 'currency',
			currency: $_('currency'),
			maximumFractionDigits: 0
		})}
	</TableBodyCell>
	<TableBodyCell>
		{$number(calculateYearlyCost(expenseSource.expense), {
			style: 'currency',
			currency: $_('currency'),
			maximumFractionDigits: 0
		})}
	</TableBodyCell>
	<TableBodyCell>
		{$number(expenseSource.expense.amount, {
			style: 'currency',
			currency: $_('currency'),
			maximumFractionDigits: 0
		})}
		{getPeriodText(expenseSource.expense.period)}
	</TableBodyCell>
	<TableBodyCell class="flex justify-evenly">
		<Button type="button" on:click={() => dispatch('edit')} color="blue">
			<EditOutline size="lg" />
		</Button>
		<Button type="button" on:click={() => dispatch('delete')} color="red">
			<TrashBinOutline size="lg" />
		</Button>
	</TableBodyCell>
</TableBodyRow>
