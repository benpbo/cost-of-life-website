<script lang="ts">
	import { Label, NumberInput } from 'flowbite-svelte';

  export let value: number = 0;
</script>

<Label for="amount">עלות</Label>
<NumberInput name="amount" bind:value={value} />
