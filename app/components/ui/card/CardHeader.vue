<script setup lang="ts">
import { cn } from 'cn'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
	class?: HTMLAttributes['class']
}>()
</script>

<template>
	<div
		data-slot="card-header"
		:class="cn('flex flex-col space-y-1.5 p-3', props.class)"
	>
		<slot />
	</div>
</template>
