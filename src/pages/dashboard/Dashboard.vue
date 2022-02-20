<script setup lang="ts">
import { initStore, store } from '@/store';
import { supabase } from '@/supabase';

import GoalList from '@/components/GoalList.vue';

initStore();
</script>

<template>
	<h1>Dashboard</h1>
	<goal-list></goal-list>
</template>
