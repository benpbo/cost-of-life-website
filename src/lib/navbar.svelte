<script lang="ts">
	import {
		Navbar,
		NavHamburger,
		NavUl,
		NavLi,
		DarkMode,
		Button,
		Dropdown,
		DropdownHeader,
		DropdownItem
	} from 'flowbite-svelte';
	import { UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import type { Session, User } from '@auth/sveltekit';
	import { signIn, signOut } from '@auth/sveltekit/client';

	let session: Session | null | undefined = $page.data.session;
	let user: User | undefined = session?.user;
</script>

<Navbar dir="rtl">
	<div class="flex">
		{#if session}
			<div class="flex items-center md:order-2">
				<UserSolid id="avatar-menu" />
				<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
			</div>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<div class="text-sm">{user?.name}</div>
				</DropdownHeader>
				<DropdownItem on:click={() => signOut()}>התנתק/י</DropdownItem>
			</Dropdown>
		{:else}
			<div class="flex items-center md:order-2">
				<Button type="button" on:click={() => signIn('keycloak')} color="green">התחבר/י</Button>
				<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
			</div>
		{/if}
	</div>
	<NavUl>
		<NavLi href="/expenses">הוצאות</NavLi>
	</NavUl>
	<DarkMode />
</Navbar>
