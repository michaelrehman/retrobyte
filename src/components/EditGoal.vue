<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NDatePicker, NInputNumber, NInput, NCard, NButton, NH3 } from 'naive-ui';
import type { definitions } from '@/supabase/types';
import { supabase } from '@/supabase';
import { convertTimestamp } from '@/components/util';

const { goal, managerFunction } = defineProps<{
    goal: definitions['goals'] | null,
    title: string,
    managerFunction: (goal: definitions['goals']) => any
}>();

const form = ref(null)
const inputs = ref({
    name: goal?.name || '',
    amountTotal: goal?.amountTotal || 0,
    amountPaid: goal?.amountPaid || 0,
    deadline: convertTimestamp(goal?.deadline),
    priority: goal?.priority || 0,
    gid: goal?.gid,
    uid: goal?.uid
});
const rules = ref({
    name: [
        {
            required: true,
            message: 'missing name',
            trigger: 'blur',
        },
    ],
    amount: [
        {
            required: true,
            message: 'invalid amount',
            min: 0,
            trigger: 'blur',
        },
    ],
    date: [
        {
            required: true,
            // todo: handle date validation
            message: 'date is not a valid date',
            trigger: 'blur',
        },
    ],
    priority: [
        {
            required: true,
            message: 'missing priority',
            min: 0,
            trigger: 'blur',
        },
    ],
});
const disabled = ref(false);

async function handleSubmit() {
    const goalInputs = <definitions['goals']>{
        uid: supabase.auth.user()?.id,
        name: inputs.value.name,
        amountTotal: inputs.value.amountTotal,
        amountPaid: inputs.value.amountPaid,
        deadline: inputs.value.deadline,
        priority: inputs.value.priority,
    };

    if (inputs.value?.gid) {
        Object.assign(goalInputs, { gid: inputs.value?.gid });
    } // if

    const error = await managerFunction(goalInputs);
    if (error) {
        console.error(error);
    } // if
}
</script>

<template>
    <n-card style="max-width: fit-content; margin: auto; margin-top: 15vh">
        <n-h3>{{ title }}</n-h3>
        <n-form :rules="rules" :model="inputs" ref="form">
            <n-form-item path="name" label="name">
                <n-input v-model:value="inputs.name" type="text" />
            </n-form-item>
            <n-form-item path="amount" label="amount">
                <n-input-number v-model:value="inputs.amountTotal" :show-button="disabled"/>
            </n-form-item>
            <n-form-item path="date" label="date">
                <n-date-picker v-model:formatted-value="inputs.deadline" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"/>
            </n-form-item>
            <n-form-item path="priority" label="priority">
                <n-input-number v-model:value="inputs.priority" :show-button="disabled"/>
            </n-form-item>
            <n-button @click="handleSubmit">Submit</n-button>
        </n-form>
    </n-card>
</template>