<script setup lang="ts">
import {  NList, NListItem, NH2 } from 'naive-ui';
import type { definitions } from '@supabase/types';
import { store } from '@/store';

function getDisplayColor(transaction: definitions['transactions']) {
   return Math.sign(transaction.amount) === -1 ? 'text-red' : 'text-green';
}

</script>

<template>
    <n-h2>
        Transaction History
    </n-h2>
    <n-list>
        <n-list-item v-for="transaction in store.transactions" :key="transaction.tid">
            <span :class="Math.sign(transaction.amount) === -1 ? 'text-red' : 'text-green'">{{ Math.sign(transaction.amount) === -1 ? "-$" + Math.abs(transaction.amount) : "+$" + transaction.amount }} </span> 
            <span> &emsp; {{ new Date(transaction.timestamp).toDateString() }}</span>
        </n-list-item>
    </n-list>
</template>

<style>
.text-red {
    color: rgb(255, 0, 0);
}

.text-green {
    color: green;
}
</style>