<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';

	export let value: string = '';
</script>

<Label for="name">{$_('input.name')}</Label>
<Input type="text" name="name" bind:value />
