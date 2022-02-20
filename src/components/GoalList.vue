<script setup lang="ts">
import { NList, NListItem, NThing, NIcon, NButton, NSpace, NProgress, NTooltip, useMessage, NH2, NH3  } from 'naive-ui';
import { Plus, Trash, Edit } from '@vicons/fa';
import { store } from '@/store';
import { ref, defineComponent } from 'vue';

</script>

<template>
    <n-h2>Current Balance: ${{store.accounts[0].balance}} </n-h2>
    <n-h3>Your Goals</n-h3>
    <n-list>
        <n-list-item v-for="goal in store.goals" :key="goal.gid">
            <template #prefix>{{ goal.name }}</template>
            <n-space vertical>
                <n-tooltip placement="top" trigger="hover">
                    <template #trigger>
                        <n-progress
                            type="line"
                            :percentage="goal.amountPaid / goal.amountTotal * 100"
                            :height="24"
                            :border-radius="4"
                            :fill-border-radius="0">
                            ${{ goal.amountTotal }}
                        </n-progress>
                    </template>
                    <span> ${{ goal.amountPaid }} </span>
                </n-tooltip>
            </n-space>
            {{ new Date(goal.deadline).toDateString() }}
            <n-button strong secondary circle type="error">
                <template #icon>
                    <n-icon>
                       <trash></trash>
                    </n-icon>
                </template>
            </n-button>
            <n-button strong secondary circle type="info">
                <template #icon>
                    <n-icon>
                       <edit></edit>
                    </n-icon>
                </template>
            </n-button>
            <n-button strong secondary circle type="success">
                <template #icon>
                    <n-icon>
                        <plus></plus>
                    </n-icon>
                </template>
            </n-button>
        </n-list-item>
    </n-list>
</template>
