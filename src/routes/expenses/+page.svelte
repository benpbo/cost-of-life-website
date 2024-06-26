<script lang="ts">
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
	import type { PageData } from './$types';
	import Form from '$lib/form.svelte';
	import { ExpenseSource, calculateMonthlyCost, calculateYearlyCost } from '$lib/domain';
	import NameInput from '$lib/nameInput.svelte';
	import PeriodKindInput from '$lib/periodKindInput.svelte';
	import PeriodEveryInput from '$lib/periodEveryInput.svelte';
	import AmountInput from '$lib/amountInput.svelte';
	import { Button, Heading, Modal } from 'flowbite-svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import { _, number } from 'svelte-i18n';

	export let data: PageData;

	let { expenseSources } = data;
	let expenses = expenseSources.map((source) => source.expense);

	let isAdding: boolean = false;

	let editedExpense: ExpenseSource | undefined = undefined;
</script>

<div class="px-12">
	<div class="my-2 flex justify-around text-center">
		<Heading tag="h5">
			{$_('expenses.sum.monthly')}: {$number(
				expenses.map(calculateMonthlyCost).reduce((sum, cost) => sum + cost, 0),
				{
					style: 'currency',
					currency: $_('currency'),
					maximumFractionDigits: 0
				}
			)}
		</Heading>
		<Heading tag="h5">
			{$_('expenses.sum.yearly')}: {$number(
				expenses.map(calculateYearlyCost).reduce((sum, cost) => sum + cost, 0),
				{
					style: 'currency',
					currency: $_('currency'),
					maximumFractionDigits: 0
				}
			)}
		</Heading>
	</div>
	<ExpenseSourcesTable
		{expenseSources}
		on:delete={async ({ detail: toDelete }) => {
			const response = await fetch(`/api/expenses/${toDelete.id}`, { method: 'DELETE' });
			if (response.status !== 204) {
				return;
			}

			expenseSources = expenseSources.filter((source) => source !== toDelete);
		}}
		on:edit={({ detail: toEdit }) => (editedExpense = toEdit)}
	/>
	<div class="my-2 flex justify-center">
		<Button on:click={() => (isAdding = true)} type="button" color="green">
			<CirclePlusOutline size="lg" />
		</Button>
	</div>
	<Modal bind:open={isAdding} size="xs" outsideclose>
		<Form action="?/create" on:reset={() => (isAdding = false)}>
			<NameInput />
			<PeriodKindInput />
			<PeriodEveryInput />
			<AmountInput />
		</Form>
	</Modal>
	<Modal open={editedExpense !== undefined} size="xs" outsideclose>
		<Form action="?/edit" on:reset={() => (editedExpense = undefined)}>
			{#if editedExpense}
				<input type="hidden" name="id" value={editedExpense.id} />
				<NameInput value={editedExpense.name} />
				<PeriodKindInput value={editedExpense.expense.period.kind} />
				<PeriodEveryInput value={editedExpense.expense.period.every} />
				<AmountInput value={editedExpense.expense.amount} />
			{/if}
		</Form>
	</Modal>
</div>
