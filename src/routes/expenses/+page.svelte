<script lang="ts">
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
	import AddButton from '$lib/addButton.svelte';
	import type { PageData } from './$types';
	import ExpenseSourceForm from '$lib/expenseSourceForm.svelte';
	import type { ExpenseSource } from '$lib/domain';
	import NameInput from '$lib/nameInput.svelte';
	import PeriodKindInput from '$lib/periodKindInput.svelte';
	import PeriodEveryInput from '$lib/periodEveryInput.svelte';
	import AmountInput from '$lib/amountInput.svelte';

	export let data: PageData;

	let { expenseSources } = data;

	let addDialog: HTMLDialogElement;
	let editDialog: HTMLDialogElement;

	let editedExpense: ExpenseSource | undefined = undefined;
</script>

<div class="px-2">
	<h2 class="my-2 text-4xl font-extrabold">ערוך הוצאות</h2>
	<ExpenseSourcesTable
		{expenseSources}
		onDelete={async (_, toDelete) => {
			const response = await fetch(`/api/expenses/${toDelete.id}`, { method: 'DELETE' });
			if (response.status !== 204) {
				return;
			}

			expenseSources = expenseSources.filter((source) => source !== toDelete);
		}}
		onEdit={(_, toEdit) => {
			editedExpense = toEdit;
			editDialog.showModal();
		}}
	/>
	<div class="my-2 flex justify-center">
		<AddButton on:click={() => addDialog.showModal()} />
	</div>
	<dialog bind:this={addDialog} class="rounded-lg">
		<ExpenseSourceForm action="?/create" onReset={() => addDialog.close()}>
			<NameInput />
			<PeriodKindInput />
			<PeriodEveryInput />
			<AmountInput />
		</ExpenseSourceForm>
	</dialog>
	<dialog bind:this={editDialog} class="rounded-lg">
		<ExpenseSourceForm action="?/edit" onReset={() => editDialog.close()}>
			{#if editedExpense}
				<input type="hidden" name="id" value={editedExpense.id} />
				<NameInput value={editedExpense.name} />
				<PeriodKindInput value={editedExpense.expense.period.kind} />
				<PeriodEveryInput value={editedExpense.expense.period.every} />
				<AmountInput value={editedExpense.expense.amount} />
			{/if}
		</ExpenseSourceForm>
	</dialog>
</div>
