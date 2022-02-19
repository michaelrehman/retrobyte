import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw, RouterOptions, Router } from 'vue-router';
import { supabase } from '@/supabase';

const routes: RouteRecordRaw[] = [
	{
		path: '/register',
		name: 'Register',
		// @ts-ignore
		component: () => import('@/views/auth/Register.vue'),
		meta: {
			forwardAuth: true,
		},
	},
	{
		path: '/login',
		name: 'Login',
		// @ts-ignore
		component: () => import('@/views/auth/Login.vue'),
		meta: {
			forwardAuth: true,
		},
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		// @ts-ignore
		component: () => import('@/views/dashboard/Dashboard.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/logout',
		name: 'Logout',
		// @ts-ignore
		component: () => import('@/views/auth/Logout.vue'),
		meta: {
			requiresAuth: true,
		},
	},
];

const routerOptions: RouterOptions = {
	history: createWebHistory(),
	routes: routes,
};

const router: Router = createRouter(routerOptions);

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
	const forwardAuth = to.matched.some((route) => route.meta.forwardAuth);
	const currentUser = supabase.auth.user();

	if (requiresAuth && !currentUser) {
		next({ name: 'Login', query: { redirect: to.name as string } });
	} else if (forwardAuth && currentUser) {
		next({ name: 'Dashboard' })
	} else {
		next();
	} // if
});

export { router };
