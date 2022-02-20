<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NInputNumber, NH3, NButton } from 'naive-ui';
import type { definitions } from '@/supabase/types';

import { goalsManager, transactionsManager, accountsManager } from '@/store/managers';
import { supabase } from '@/supabase';
import { store } from '@/store';

const { goal } = defineProps<{ goal: definitions['goals'] }>();
const input = ref(0);

async function handleSubmit() {
	// Update amount paid off
	Object.assign(goal, { amountPaid: goal.amountPaid + input.value });
	await goalsManager.save(goal);

	// Create new transcation
	await transactionsManager.add({
		amount: -input.value,
		gid: goal.gid,
		timestamp: new Date(Date.now()).toDateString(),
		// @ts-ignore silencio
		uid: supabase.auth.user()?.id,
	});

	// update account balance
	await accountsManager.save({
		aid: store.accounts[0].aid,
		balance: store.accounts[0].balance - input.value,
		// @ts-ignore silencio
		uid: supabase.auth.user()?.id,
	});
} // handleSubmit
</script>

<template>
	<n-form>
		<n-h3>Payment Towards {{ goal.name }}</n-h3>
		<n-form-item>
			<n-input-number v-model:value="input" :min="0" :max="goal.amountTotal - goal.amountPaid"></n-input-number>
		</n-form-item>
		<n-button @click="handleSubmit">Submit</n-button>
	</n-form>
</template>
