<script setup lang="ts">
import {
	NConfigProvider, darkTheme,
	NMessageProvider, NSpace,
	NLayout, NLayoutHeader, NLayoutContent,
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
							<h1 style="display: inherit;">Retrobyte</h1>
						</header>
						<navigation-bar></navigation-bar>
					</n-space>
				</n-layout-header>

				<n-layout-content>
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
	font-family: 'Press Start 2P';
}
</style>
