<script setup lang="ts">
import {
	NConfigProvider, darkTheme,
	NMessageProvider, NSpace,
	NLayout, NLayoutHeader, NLayoutContent,
	NH1
} from 'naive-ui';
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<template>
	<n-config-provider :theme="darkTheme">
		<n-message-provider>

			<n-layout>
				<n-layout-header>
					<n-space justify="space-around" align="center">
						<header style="display: inline-block;">
							<n-h1 style="display: inherit;">Retrobyte</n-h1>
						</header>
						<navigation-bar></navigation-bar>
					</n-space>
				</n-layout-header>

				<n-layout-content content-style="max-width: 80%; margin: auto;">
					<router-view></router-view>
				</n-layout-content>
			</n-layout>

		</n-message-provider>
	</n-config-provider>
</template>

<style>
html,
body,
#app,
.n-config-provider,
.n-layout {
	height: 100%;
}
</style>
