<script setup lang="ts">
import { h, defineComponent, ref } from 'vue'
import {  NList, NListItem, NH2, NButton, NDataTable } from 'naive-ui';
import type { definitions } from '@supabase/types';
import { store } from '@/store';

function getDisplayColor(transaction: definitions['transactions']) {
   return Math.sign(transaction.amount) === -1 ? 'text-red' : 'text-green';
}

const columns = [
    {
        title: 'Amount ($)',
        key: 'amount'
    },
    {
        title: 'Date',
        key: 'date'
    }
];

const rows = ref(store.transactions.map((transcation) => {
    return {
        amount: transcation.amount,
        date: new Date(transcation.timestamp).toDateString(),
    };
}));

</script>

<template>
    <n-h2>
        Transaction History
    </n-h2>
    
    <n-data-table
        :columns="columns"
        :data="rows"
        :bordered="false"
    />
</template>
