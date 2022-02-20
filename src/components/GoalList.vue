<script setup lang="ts">
import { ref } from 'vue';
import {
    NList, NListItem, NIcon,
    NButtonGroup, NButton,
    NSpace, NProgress,
    NTooltip, NH3, NModal,
    NSelect

} from 'naive-ui';
import { Plus, Trash, Edit } from '@vicons/fa';

import { store } from '@/store';
import { goalsManager } from '@/store/managers';

import EditGoal from '@/components/EditGoal.vue';
import GoalPaid from './GoalPaid.vue';

const showGoalModal = ref(false);
const showPayModal = ref(false);
const selectedGoal = ref(null);
const selectValue = 'date'
const selectOptions = ref([
    {
        label: 'date',
        value: 'date',
    },
    {
        label: 'priority',
        value: 'priority',
    },
])
function sort() {
    if (selectValue === 'date') {
        store.goals.sort((a, b) => a.deadline.localeCompare(b.deadline))
    }
    if (selectValue === 'priority') {

    }
}
</script>

<template>
    <n-modal v-model:show="showGoalModal">
        <edit-goal
            :goal="selectedGoal"
            title="Edit Goal"
            :managerFunction="(goal) => goalsManager.save(goal)"
        ></edit-goal>
    </n-modal>

    <n-modal v-model:show="showPayModal" preset="card">
        <goal-paid :goal="selectedGoal"></goal-paid>
    </n-modal>

    <n-h3>Your Goals</n-h3>
    <n-select style="width: 33%;" :options="selectOptions" :onChange='sort'/>

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
                    <n-button
                        strong
                        secondary
                        type="info"
                        @click="selectedGoal = goal; showGoalModal = true;"
                    >
                        <template #icon>
                            <n-icon>
                                <edit></edit>
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button
                        strong
                        secondary
                        type="success"
                        @click="selectedGoal = goal; showPayModal = true;"
                    >
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
