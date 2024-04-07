<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	export let { session } = data;
</script>

<div class="dark:text-gray-400">
	<Navbar />
	<slot />
</div>
