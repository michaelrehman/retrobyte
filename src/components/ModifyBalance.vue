<script setup lang="ts">
import { NH1, NForm, NCard, NInput, NButton, NFormItem, NInputNumber, NDatePicker } from 'naive-ui';
import { ref } from 'vue';

import { accountsManager, flowsManager, transactionsManager } from '@/store/managers';
import type { definitions } from '@/supabase/types';
import { supabase } from '@/supabase';
import { store } from '@/store';

const title = "Modify Balance"
const disabled = ref(false)

const inputs = ref({
    fid: ref(null),
    name: '',
    amount: ref(0),
    occurrences: ref(0),
    frequency: '',
    uid: ref(null),
})
const rules = ref({

})

async function handleSubmit() {
    const flowInputs = <definitions['flows']>{
        uid: supabase.auth.user()?.id,
        name: inputs.value.name,
        occurrences: inputs.value.occurrences,
        frequency: inputs.value.frequency,
        amount: inputs.value.amount,
    };
    const { data } = await flowsManager.add(flowInputs);

    // @ts-ignore silencio
    const transactionInputs = <definitions['transactions']>{
        uid: supabase.auth.user()?.id,
        gid: null,
        fid: data.fid,
        timestamp: new Date(Date.now()).toDateString(),
        amount: inputs.value.amount,
    };
    transactionsManager.add(transactionInputs);

    // update account balance
	accountsManager.save({
		aid: store.accounts[0].aid,
		balance: store.accounts[0].balance + inputs.value.amount,
		// @ts-ignore silencio
		uid: supabase.auth.user()?.id,
	});
}

</script>

<template>
    <n-card style="max-width: fit-content; margin: auto; margin-top: 15vh">
        <n-h1>{{ title }}</n-h1>
        <n-form :rules="rules" :model="inputs" ref="form">
            <n-form-item path="name" label="name">
                <n-input v-model:value="inputs.name" type="text" placeholder="name" />
            </n-form-item>
            <n-form-item path="amount" label="amount">
                <n-input-number v-model:value="inputs.amount" :show-button="disabled"/>
            </n-form-item>
            <n-form-item path="occurrence" label="occurrence">
                <n-input-number v-model:value="inputs.occurrences" :show-button="true" />
            </n-form-item>
            <n-form-item path="frequency" label="frequency">
                <n-input
                    v-model:value="inputs.frequency"
                    type="text"
                    placeholder="weekly, monthly, etc."
                />
            </n-form-item>
            <n-button @click="handleSubmit">Submit</n-button>
        </n-form>
    </n-card>
</template>