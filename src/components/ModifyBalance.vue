<script setup lang="ts">
import { NH1, NForm, NCard, NInput, NButton, NFormItem, NInputNumber, NDatePicker } from 'naive-ui';
import { ref } from 'vue';

import { accountsManager } from '@/store/managers';
import type { definitions } from '@/supabase/types';
import { supabase } from '@/supabase';

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

function handleSubmit() {
    const flowInputs = <definitions['flows']> {
        uid: supabase.auth.user()?.id,
        name: inputs.value.name,
        occurrences: inputs.value.occurrences,
        frequency: inputs.value.frequency,
        amount: inputs.value.amount,
    };
    const transactionInputs = <definitions['transactions']>{
        uid: supabase.auth.user()?.id,
        gid: ref(null),
        fid: flowInputs.fid,
        timestamp: new Date(),
        amount: inputs.value.amount,
    };
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