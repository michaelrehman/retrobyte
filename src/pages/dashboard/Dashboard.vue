<script setup lang="ts">
import { NGrid, NGi, NButton } from 'naive-ui';
import { initStore, store } from '@/store';

import GoalList from '@/components/GoalList.vue';
import { supabase } from '@/supabase';

initStore();
console.log(supabase.auth.user()?.id)

const options = [
	{
		title: 'Score',
		action: null,
	},
	{
		title: 'Budget Breakdown',
		action: null,
	},
	{
		title: 'Modify Balance',
		action: null,
	},
	{
		title: 'Add Goal',
		action: null,
	},
];
</script>

<template>
	<n-grid responsive="screen" cols="xs:1 s:2 m:4" y-gap="12">
		<n-gi v-for="option in options" :key="option.title">
			<n-button size="large" ghost style="width: 200px; height: 200px" @click="option.action">{{ option.title }}</n-button>
		</n-gi>
	</n-grid>
	<goal-list></goal-list>
</template>
