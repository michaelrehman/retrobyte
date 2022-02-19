<script setup lang="ts">
import { initStore, store } from '@/store';
import { supabase } from '@/supabase';

// initStore(() => console.log(store));
console.log(supabase.auth.user()?.id)
</script>

<template>
	<h1>Dashboard</h1>
</template>
