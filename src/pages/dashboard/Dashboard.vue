<script setup lang="ts">
import { ref } from 'vue';
import { NGrid, NGi, NButton, NH2, NSpace, NSpin } from 'naive-ui';
import { supabase } from '@/supabase';
import { initStore, store } from '@/store';

import GoalList from '@/components/GoalList.vue';

const isLoading = ref(true);
initStore(() => isLoading.value = false);
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
	<n-space v-if="isLoading" justify="center">
		<n-spin :size="300"></n-spin>
	</n-space>

	<div v-else-if="!isLoading">
		<n-h2>Current Balance: ${{store.accounts[0].balance}}</n-h2>
		<n-grid responsive="screen" cols="xs:1 s:2 m:4" y-gap="12">
			<n-gi v-for="option in options" :key="option.title">
				<n-button size="large" ghost circle style="width: 200px; height: 200px" @click="option.action">{{ option.title }}</n-button>
			</n-gi>
		</n-grid>
		<goal-list></goal-list>
	</div>
</template>
