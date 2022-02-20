<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NDatePicker, NInputNumber, NInput, NCard, NButton } from 'naive-ui';
import { supabase } from '@/supabase';

const form = ref(null)
const inputs = ref({
    name: '',
    amount: ref(0),
    date: ref(null),
    priority: ref(0),
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
    console.log(inputs.value.date)
    const { data, error } = await supabase
    .from('goals')
    .insert([
        { 
            uid: supabase.auth.user()?.id,
            name: inputs.value.name,
            amountTotal: inputs.value.amount,
            amountPaid: 0.00,
            deadline: inputs.value.date,
            priority: inputs.value.priority,
        }])
    if (error) {
        console.error(error)
    }
}
</script>

<template>
    <n-card style="max-width: fit-content; margin: auto; margin-top: 15vh">
        <h1>Add Goal</h1>
        <n-form :rules="rules" :model="inputs" ref="form">
            <n-form-item path="name" label="name">
                <n-input v-model:value="inputs.name" type="text" />
            </n-form-item>
            <n-form-item path="amount" label="amount">
                <n-input-number v-model:value="inputs.amount" :show-button="disabled"/>
            </n-form-item>
            <n-form-item path="date" label="date">
                <n-date-picker v-model:formatted-value="inputs.date" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"/>
            </n-form-item>
            <n-form-item path="priority" label="priority">
                <n-input-number v-model:value="inputs.priority" :show-button="disabled"/>
            </n-form-item>
            <n-button @click="handleSubmit">Submit</n-button>
        </n-form>
    </n-card>
</template>