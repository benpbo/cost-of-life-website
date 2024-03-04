<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';

	export let value: string = '';
</script>

<Label for="name">שם</Label>
<Input type="text" name="name" bind:value={value} />
