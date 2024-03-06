<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let action: string;

	const dispatch = createEventDispatcher();
</script>

<form {action} method="post" class="mx-auto">
	<slot />
	<div class="m-2 flex items-center justify-around">
		<Button type="submit" color="green">שמור</Button>
		<Button type="reset" on:click={(e) => dispatch('reset', { e })} color="red">בטל</Button>
	</div>
</form>
