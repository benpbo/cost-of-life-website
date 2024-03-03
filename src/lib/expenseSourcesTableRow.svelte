<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { ExpenseSource, RecurringMoneyValue, Period } from '$lib/domain';
	import EditButton from './editButton.svelte';
	import DeleteButton from './deleteButton.svelte';

	export let expenseSource: ExpenseSource;
	export let onDelete: (e: MouseEvent) => void;

	function calculateMonthlyCost(expense: RecurringMoneyValue) {
		switch (expense.period.kind) {
			case 'Month':
				return expense.amount / expense.period.every;
			case 'Year':
				return expense.amount / (12 * expense.period.every);
		}
	}

	function calculateYearlyCost(expense: RecurringMoneyValue) {
		switch (expense.period.kind) {
			case 'Month':
				return (expense.amount * 12) / expense.period.every;
			case 'Year':
				return expense.amount / expense.period.every;
		}
	}

	function getPeriodText(period: Period): string {
		switch (period.kind) {
			case 'Month':
				if (period.every == 1) {
					return 'פעם בחודש';
				} else if (period.every == 2) {
					return 'פעם בחודשיים';
				} else {
					return `פעם ב${period.every} חודשים`;
				}
			case 'Year':
				if (period.every == 1) {
					return 'פעם בשנה';
				} else if (period.every == 2) {
					return 'פעם בשנתיים';
				} else {
					return `פעם ב${period.every} שנים`;
				}
		}
	}
</script>

<TableBodyRow class="odd:bg-white even:bg-gray-50">
	<TableBodyCell>{expenseSource.name}</TableBodyCell>
	<TableBodyCell>{calculateMonthlyCost(expenseSource.expense)}</TableBodyCell>
	<TableBodyCell>{calculateYearlyCost(expenseSource.expense)}</TableBodyCell>
	<TableBodyCell
		>{expenseSource.expense.amount} {getPeriodText(expenseSource.expense.period)}</TableBodyCell
	>
	<TableBodyCell>
		<EditButton />
		<DeleteButton on:click={onDelete} />
	</TableBodyCell>
</TableBodyRow>
