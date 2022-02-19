<script setup lang="ts">
import { h, ref, onMounted } from 'vue';

import { useRouter, RouterLink } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { NMenu } from 'naive-ui';

import { supabase } from '@/supabase';
import type { User } from '@supabase/supabase-js';

function generateMenuItems(
	allRoutes: RouteRecordRaw[],
	user: User | null | undefined): any[] { // really MenuMixedOption[] but ugly errors
		// logged in: all routes that don't forward authed users
		// logged out: all routes that don't require auth
		const excludeProperty = user ? 'forwardAuth': 'requiresAuth';
		const availableRoutes = allRoutes.filter(({ meta }) => {
			// RouteRecordRaw isn't guaranteed to have meta
			return meta && !(excludeProperty in meta);
		});

		return availableRoutes.map((route) => {
			const menuItem = {
				label:() => h(
					RouterLink,
					{ to: { name: route.name } },
					{ default: () => route.name },
				),
				key: route.path,
			};

			if (route.children) {
				Object.assign(menuItem, {
					children: generateMenuItems(route.children, user)
				});
			} // if

			return menuItem;
		});
} // generateMenuItems


const router = useRouter();
const allRoutes = router.options.routes;
let menuItems = ref(generateMenuItems(allRoutes, supabase.auth.user()));
onMounted(
	() => supabase.auth.onAuthStateChange((_, session) => {
		menuItems.value = generateMenuItems(allRoutes, session?.user);
	})
);
</script>

<template>
	<n-menu :options="menuItems" mode="horizontal"></n-menu>
</template>
