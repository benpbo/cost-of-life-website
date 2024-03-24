<script lang="ts">
	import '../app.pcss';
	import { Button, DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { Session, User } from '@auth/sveltekit';
	import { signIn, signOut } from '@auth/sveltekit/client';

	let session: Session | null | undefined = $page.data.session;
	let user: User | undefined = session?.user;
</script>

<div class="dark:text-gray-400">
	<div>
		<DarkMode />
		{#if session}
			<span>{user?.name ?? 'User'}</span>
			<Button type="button" on:click={() => signOut()} color="red">Sign out</Button>
		{:else}
			<span>You are not signed in</span>
			<Button type="button" on:click={() => signIn('keycloak')} color="green">Sign in</Button>
		{/if}
	</div>
	<slot />
</div>
