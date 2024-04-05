<script lang="ts">
	import { Button, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { ExpenseSource, RecurringMoneyValue, Period } from '$lib/domain';
	import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let expenseSource: ExpenseSource;

	const dispatch = createEventDispatcher<{
		edit: null;
		delete: null;
	}>();

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

<TableBodyRow>
	<TableBodyCell>{expenseSource.name}</TableBodyCell>
	<TableBodyCell>{calculateMonthlyCost(expenseSource.expense)}</TableBodyCell>
	<TableBodyCell>{calculateYearlyCost(expenseSource.expense)}</TableBodyCell>
	<TableBodyCell
		>{expenseSource.expense.amount}₪ {getPeriodText(expenseSource.expense.period)}</TableBodyCell
	>
	<TableBodyCell class="flex justify-evenly">
		<Button type="button" on:click={() => dispatch('edit')} color="blue">
			<EditOutline size="lg" />
		</Button>
		<Button type="button" on:click={() => dispatch('delete')} color="red">
			<TrashBinOutline size="lg" />
		</Button>
	</TableBodyCell>
</TableBodyRow>
