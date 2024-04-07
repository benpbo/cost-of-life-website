<script lang="ts">
	import {
		Navbar,
		NavHamburger,
		NavUl,
		NavLi,
		DarkMode,
		Dropdown,
		DropdownHeader,
		DropdownItem
	} from 'flowbite-svelte';
	import { UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import type { Session } from '$lib/auth';
	import { _ } from 'svelte-i18n';

	let session: Session | undefined = $page.data.session;
</script>

<Navbar dir="rtl">
	<div class="flex">
		{#if session !== undefined && session.isAuthenticated()}
			<div class="flex items-center md:order-2">
				<UserSolid id="avatar-menu" />
				<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
			</div>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<div class="text-sm">{session.getUser().username}</div>
				</DropdownHeader>
				<DropdownItem on:click={() => session?.logout()}>{$_('navbar.logout')}</DropdownItem>
			</Dropdown>
		{/if}
	</div>
	<NavUl>
		<NavLi href="/expenses">{$_('navbar.expenses')}</NavLi>
	</NavUl>
	<DarkMode />
</Navbar>
