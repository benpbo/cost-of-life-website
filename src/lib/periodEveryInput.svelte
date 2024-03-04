<script lang="ts">
	import { Label, NumberInput } from 'flowbite-svelte';

  export let value: number = 1;
</script>

<Label for="period-every">תדירות</Label>
<NumberInput name="period-every" bind:value={value} />
