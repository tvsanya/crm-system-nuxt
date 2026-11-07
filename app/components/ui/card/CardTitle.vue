<script setup lang="ts">
import { cn } from 'cn'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
	class?: HTMLAttributes['class']
}>()
</script>

<template>
	<h3
		data-slot="card-title"
		:class="
			cn('text-xl font-semibold leading-none tracking-tighter', props.class)
		"
	>
		<slot />
	</h3>
</template>
