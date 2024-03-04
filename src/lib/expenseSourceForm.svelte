<script lang="ts">
	import { Button } from 'flowbite-svelte';

	export let action: string;
	export let onReset: (e: MouseEvent) => void;
</script>

<form {action} method="post" class="mx-auto">
	<div class="mx-8 my-4">
		<slot />
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
