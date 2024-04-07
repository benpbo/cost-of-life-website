<script lang="ts">
	import { Label, NumberInput } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';

	export let value: number = 1;
</script>

<Label for="period-every">{$_('input.periodEvery')}</Label>
<NumberInput name="period-every" bind:value />
