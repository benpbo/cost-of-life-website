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
	import type Keycloak from 'keycloak-js';

	let keycloak: Keycloak = $page.data.keycloak;
</script>

<Navbar dir="rtl">
	<div class="flex">
		{#if keycloak.authenticated}
			<div class="flex items-center md:order-2">
				<UserSolid id="avatar-menu" />
				<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
			</div>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<div class="text-sm">{keycloak.tokenParsed?.preferred_username}</div>
				</DropdownHeader>
				<DropdownItem on:click={() => keycloak.logout()}>התנתק/י</DropdownItem>
			</Dropdown>
		{/if}
	</div>
	<NavUl>
		<NavLi href="/expenses">הוצאות</NavLi>
	</NavUl>
	<DarkMode />
</Navbar>
