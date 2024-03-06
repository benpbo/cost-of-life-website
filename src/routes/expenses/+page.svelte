<script lang="ts">
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
	import type { PageData } from './$types';
	import Form from '$lib/form.svelte';
	import type { ExpenseSource } from '$lib/domain';
	import NameInput from '$lib/nameInput.svelte';
	import PeriodKindInput from '$lib/periodKindInput.svelte';
	import PeriodEveryInput from '$lib/periodEveryInput.svelte';
	import AmountInput from '$lib/amountInput.svelte';
	import { Button } from 'flowbite-svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';

	export let data: PageData;

	let { expenseSources } = data;

	let addDialog: HTMLDialogElement;
	let editDialog: HTMLDialogElement;

	let editedExpense: ExpenseSource | undefined = undefined;
</script>

<div class="px-12">
	<h2 class="my-2 text-4xl font-extrabold">ערוך הוצאות</h2>
	<ExpenseSourcesTable
		{expenseSources}
		on:delete={async ({ detail: toDelete }) => {
			const response = await fetch(`/api/expenses/${toDelete.id}`, { method: 'DELETE' });
			if (response.status !== 204) {
				return;
			}

			expenseSources = expenseSources.filter((source) => source !== toDelete);
		}}
		on:edit={({ detail: toEdit }) => {
			editedExpense = toEdit;
			editDialog.showModal();
		}}
	/>
	<div class="my-2 flex justify-center">
		<Button on:click={() => addDialog.showModal()} type="button" color="green">
			<CirclePlusOutline size="lg" />
		</Button>
	</div>
	<dialog bind:this={addDialog} class="rounded-lg">
		<Form action="?/create" on:reset={() => addDialog.close()}>
			<div class="mx-8 my-4">
				<NameInput />
				<PeriodKindInput />
				<PeriodEveryInput />
				<AmountInput />
			</div>
		</Form>
	</dialog>
	<dialog bind:this={editDialog} class="rounded-lg">
		<Form
			action="?/edit"
			on:reset={() => {
				editDialog.close();
				editedExpense = undefined;
			}}
		>
			<div class="mx-8 my-4">
				{#if editedExpense}
					<input type="hidden" name="id" value={editedExpense.id} />
					<NameInput value={editedExpense.name} />
					<PeriodKindInput value={editedExpense.expense.period.kind} />
					<PeriodEveryInput value={editedExpense.expense.period.every} />
					<AmountInput value={editedExpense.expense.amount} />
				{/if}
			</div>
		</Form>
	</dialog>
</div>
