<script lang="ts">
	import { Button, Input, Label, NumberInput, Select } from 'flowbite-svelte';

	export let action: string;
	export let onReset: (e: MouseEvent) => void;
</script>

<form {action} method="post" class="mx-auto">
	<div class="mx-8 my-4">
		<Label for="name">שם</Label>
		<Input type="text" name="name" />

		<Label for="period-kind">סוג תקופה</Label>
		<Select placeholder="בחר" name="period-kind">
			<option value="Month">חודש</option>
			<option value="Year">שנה</option>
		</Select>

		<Label for="period-every">תדירות</Label>
		<NumberInput name="period-every" />

		<Label for="amount">עלות</Label>
		<NumberInput name="amount" />
	</div>
	<div class="m-2 flex items-center justify-around">
		<Button
			type="submit"
			class="rounded-lg bg-green-600 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
			>הוסף</Button
		>
		<Button
			type="reset"
			on:click={onReset}
			class="rounded-lg bg-red-700 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
			>ביטול</Button
		>
	</div>
</form>
