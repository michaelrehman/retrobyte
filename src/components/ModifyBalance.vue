<script setup lang="ts">
import { NH1, NForm, NCard, NInput, NButton, NFormItem, NInputNumber, NDatePicker } from 'naive-ui';
import { ref } from 'vue';

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
                <n-input-number
                    v-model:value="inputs.amount"
                    :show-button="disabled"
                    placeholder="Amount (- or +)"
                />
            </n-form-item>
            <div horizontal>
                <n-form-item path="occurrence" label="occurrence">
                    <n-input-number v-model:value="inputs.occurrences" :show-button="true" />
                </n-form-item>
                <n-form-item path="frequency" label="frequency">
                    <n-input v-model:value="inputs.frequency" type="text" />
                </n-form-item>
            </div>
            <n-button @click="handleSubmit">Submit</n-button>
        </n-form>
    </n-card>
</template>