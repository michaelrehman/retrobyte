<script setup lang="ts">
import { ref } from 'vue';
import { NGrid, NGi, NButton, NH2, NSpace, NSpin } from 'naive-ui';
import { supabase } from '@/supabase';
import { initStore, store } from '@/store';

import GoalList from '@/components/GoalList.vue';

import type { definitions } from '@/supabase/types';
import { goalsManager } from '@/store/managers';

const isLoading = ref(true);
initStore(() => isLoading.value = false);
console.log(supabase.auth.user()?.id)

const options = [
	{
		title: 'Score',
		action: function test() {},
	},
	{
		title: 'Budget Breakdown',
		action: function test() {},
	},
	{
		title: 'Modify Balance',
		action: function test() {},
	},
	{
		title: 'Add Goal',
		action: function test() {
			const dummyGoal = <definitions['goals']>{
				amountTotal: 2000,
				amountPaid: 100,
				uid: supabase.auth.user()?.id,
				name: 'gaming',
				priority: 12,
				deadline: '2023-10-12 00:00:00',
			};
			console.log(goalsManager.add(dummyGoal));
		},
	},
];
</script>

<template>
	<n-space v-if="isLoading" justify="center">
		<n-spin :size="300"></n-spin>
	</n-space>

	<div v-else-if="!isLoading">
		<n-h2>Current Balance: ${{ store.accounts[0].balance }}</n-h2>
		<n-grid responsive="screen" cols="xs:1 s:2 m:4" y-gap="12">
			<n-gi v-for="option in options" :key="option.title">
				<n-button
					size="large"
					ghost
					circle
					style="width: 200px; height: 200px"
					@click="option.action"
				>{{ option.title }}</n-button>
			</n-gi>
		</n-grid>
		<goal-list></goal-list>
	</div>
</template>
