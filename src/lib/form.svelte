<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let action: string;

	const dispatch = createEventDispatcher();
</script>

<form {action} use:enhance method="post" class="mx-auto">
	<div class="mx-8 my-4">
		<slot />
	</div>
	<div class="m-2 flex items-center justify-around">
		<Button type="submit" color="green">{$_('form.save')}</Button>
		<Button type="reset" on:click={(e) => dispatch('reset', { e })} color="red">
			{$_('form.cancel')}
		</Button>
	</div>
</form>
