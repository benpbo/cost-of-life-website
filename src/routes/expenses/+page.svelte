<script lang="ts">
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
	import AddButton from '$lib/addButton.svelte';
	import type { PageData } from './$types';
	import ExpenseSourceForm from '$lib/expenseSourceForm.svelte';

	export let data: PageData;

	let { expenseSources } = data;

	let dialog: HTMLDialogElement;
</script>

<div class="px-2">
	<h2 class="text-4xl font-extrabold my-2">ערוך הוצאות</h2>
	<ExpenseSourcesTable
		{expenseSources}
		onDelete={async (_, toDelete) => {
			const response = await fetch(`/api/expenses/${toDelete.id}`, { method: 'DELETE' });
			if (response.status !== 204) {
				return;
			}

			expenseSources = expenseSources.filter((source) => source !== toDelete);
		}}
	/>
	<div class="flex justify-center my-2">
		<AddButton on:click={() => dialog.showModal()} />
	</div>
	<dialog bind:this={dialog} class="rounded-lg">
		<ExpenseSourceForm action="?/create" onReset={() => dialog.close()} />
	</dialog>
</div>
