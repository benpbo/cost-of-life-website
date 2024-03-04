<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	import type { PeriodKind } from './domain';

  export let value: PeriodKind | undefined = undefined;
</script>

<Label for="period-kind">סוג תקופה</Label>
<Select placeholder="בחר" name="period-kind" bind:value={value}>
	<option value="Month">חודש</option>
	<option value="Year">שנה</option>
</Select>
