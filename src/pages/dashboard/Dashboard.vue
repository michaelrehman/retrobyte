<script setup lang="ts">
import { ref } from 'vue';
import { NGrid, NGi, NButton, NH2, NSpace, NSpin, NModal } from 'naive-ui';
import { supabase } from '@/supabase';
import { initStore, store } from '@/store';

import GoalList from '@/components/GoalList.vue';
import EditGoal from '@/components/EditGoal.vue';

import type { definitions } from '@/supabase/types';
import { goalsManager } from '@/store/managers';

const isLoading = ref(true);
initStore(() => isLoading.value = false);

const showModal = ref(false);
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
		action: function displayModal() {
			showModal.value = true;
		},
	},
];
</script>

<template>
	<n-space v-if="isLoading" justify="center">
		<n-spin :size="300"></n-spin>
	</n-space>

	<div v-else-if="!isLoading">
		<n-modal v-model:show="showModal">
			<edit-goal :goal="null" title='Edit Goal' :managerFunction="(goal) => goalsManager.add(goal)"></edit-goal>
		</n-modal>

		<!-- <n-h2>Current Balance: ${{ store.accounts[0].balance }}</n-h2> -->
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
