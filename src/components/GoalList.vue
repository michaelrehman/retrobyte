<script setup lang="ts">
import {
    NList, NListItem, NIcon,
    NButtonGroup, NButton,
    NSpace, NProgress,
    NTooltip, NH3
} from 'naive-ui';
import { Plus, Trash, Edit } from '@vicons/fa';
import { store } from '@/store';
import { goalsManager } from '@/store/managers';
</script>

<template>
    <n-h3>Your Goals</n-h3>
    <n-list>
        <n-list-item v-for="goal in store.goals" :key="goal.gid">
            {{ goal.name }}

            <n-tooltip placement="top" trigger="hover">
                <template #trigger>
                    <n-progress
                        type="line"
                        :percentage="goal.amountPaid / goal.amountTotal * 100"
                        :height="24"
                        :border-radius="4"
                        :fill-border-radius="0"
                    >${{ goal.amountTotal }}</n-progress>
                </template>
                <span>${{ goal.amountPaid }}</span>
            </n-tooltip>

            <n-space justify="space-between" align="center" style="margin-top: 4px;">
                {{ new Date(goal.deadline).toDateString() }}
                <n-button-group size="medium">
                    <n-button strong secondary type="error" @click="goalsManager.delete(goal)">
                        <template #icon>
                            <n-icon>
                                <trash></trash>
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button strong secondary type="info">
                        <template #icon>
                            <n-icon>
                                <edit></edit>
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button strong secondary type="success">
                        <template #icon>
                            <n-icon>
                                <plus></plus>
                            </n-icon>
                        </template>
                    </n-button>
                </n-button-group>
            </n-space>
        </n-list-item>
    </n-list>
</template>
