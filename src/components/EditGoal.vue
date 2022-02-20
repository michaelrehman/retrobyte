<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NDatePicker, NInputNumber, NInput, NCard, NButton, NH1 } from 'naive-ui';
import type { definitions } from '@/supabase/types';
import { supabase } from '@/supabase';
import { goalsManager } from '@/store/managers';

function convertTimestamp(timestamp: string | '' | null) {
    const date = timestamp ? new Date(timestamp) : new Date(Date.now());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
// 2022-02-20 00:38:25
const { goal, managerFunction } = defineProps<{
    goal: definitions['goals'] | null,
    title: string,
    managerFunction: (goal: definitions['goals']) => any
}>();

const form = ref(null)
const inputs = ref({
    name: goal?.name || '',
    amount: goal?.amountTotal || 0,
    deadline: convertTimestamp(goal?.deadline),
    priority: goal?.priority || 0,
    gid: goal?.gid,
    uid: goal?.uid
})
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
})
const disabled = ref(false)

async function handleSubmit() {
    console.log({ 
        uid: supabase.auth.user()?.id,
        name: inputs.value.name,
        amountTotal: inputs.value.amount,
        amountPaid: 0.00,
        deadline: inputs.value.deadline,
        priority: inputs.value.priority,
    })
    // const error = await managerFunction({ 
    //     uid: supabase.auth.user()?.id,
    //     name: inputs.value.name,
    //     amountTotal: inputs.value.amount,
    //     amountPaid: 0.00,
    //     deadline: inputs.value.deadline,
    //     priority: inputs.value.priority,
    // });

    // if (error) {
    //     console.error(error)
    // }
}
</script>

<template>
    <n-card style="max-width: fit-content; margin: auto; margin-top: 15vh">
        <n-h1>{{ title }}</n-h1>
        <n-form :rules="rules" :model="inputs" ref="form">
            <n-form-item path="name" label="name">
                <n-input v-model:value="inputs.name" type="text" />
            </n-form-item>
            <n-form-item path="amount" label="amount">
                <n-input-number v-model:value="inputs.amount" :show-button="disabled"/>
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