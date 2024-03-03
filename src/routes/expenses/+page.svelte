<script lang="ts">
	import ExpenseSourcesTable from '$lib/expenseSourcesTable.svelte';
	import type { PeriodKind } from '$lib/domain';
	import AddButton from '$lib/addButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { expenseSources } = data;

	let name: string;
	let periodKind: PeriodKind;
	let dialog: HTMLDialogElement;
</script>

<div class="px-2">
	<h2 class="text-4xl font-extrabold">ערוך הוצאות</h2>
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
	<div class="flex justify-center">
		<AddButton on:click={() => dialog.showModal()} />
	</div>
	<dialog bind:this={dialog}>
		<form method="post" action="?/create">
			<label for="name">שם</label>
			<input type="text" name="name" bind:value={name} />

			<label for="period-kind">בחר סוג תקופה</label>
			<select name="period-kind" bind:value={periodKind}>
				<option value="Month">חודש</option>
				<option value="Year">שנה</option>
			</select>

			<label for="period-every">כל כמה</label>
			<input type="number" name="period-every" />

			<label for="amount">עלות</label>
			<input type="number" name="amount" />

			<button type="submit">הוסף</button>
			<button type="button" on:click={() => dialog.close()}>ביטול</button>
		</form>
	</dialog>
</div>
