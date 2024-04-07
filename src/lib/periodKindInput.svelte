<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	import type { PeriodKind } from './domain';
	import { _ } from 'svelte-i18n';

	export let value: PeriodKind | undefined = undefined;
</script>

<Label for="period-kind">{$_('input.periodKind.label')}</Label>
<Select placeholder={$_('input.periodKind.placeholder')} name="period-kind" bind:value>
	<option value="Month">{$_('input.periodKind.month')}</option>
	<option value="Year">{$_('input.periodKind.year')}</option>
</Select>
