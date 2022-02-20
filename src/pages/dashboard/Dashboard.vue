<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NGrid, NGi, NButton, NH2, NSpace, NSpin, NModal } from 'naive-ui';
import { initStore, store } from '@/store';

import GoalList from '@/components/GoalList.vue';
import EditGoal from '@/components/EditGoal.vue';

import { goalsManager } from '@/store/managers';
import ModifyBalance from '../../components/ModifyBalance.vue';

const isLoading = ref(true);
initStore(() => isLoading.value = false);

const showModal = ref(false);
const showBalance = ref(false);

const router = useRouter();
const options = [
	{
		title: 'Budget Breakdown',
		action: function goToMetrics() {
			router.push({ name: 'Metrics' });
		},
	},
	{
		title: 'Modify Balance',
		action: function displayBalance() {
			showBalance.value = true;
		},
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
		<n-modal v-model:show="showBalance">
			<modify-balance />
		</n-modal>

<<<<<<< Updated upstream
		<!--<n-h2>Current Balance: ${{ store.accounts[0].balance }}</n-h2>-->
		<n-grid responsive="screen" cols="xs:1 s:2 m:4" y-gap="12">
=======
		<n-h2>Current Balance: ${{ store.accounts[0].balance }}</n-h2>
		<n-grid responsive="screen" cols="xs:1 s:2 m:3" y-gap="12">
>>>>>>> Stashed changes
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
