<script lang="ts">
	import '../app.pcss';
	import Navbar from '$lib/navbar.svelte';
</script>

<div class="dark:text-gray-400">
	<Navbar />
	<slot />
</div>
