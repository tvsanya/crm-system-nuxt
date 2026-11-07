<script setup lang="ts">
import { cn } from 'cn'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
	class?: HTMLAttributes['class']
}>()
</script>

<template>
	<div
		data-slot="card-footer"
		:class="cn('p-3 pt-0 text-xs opacity-70 italic', props.class)"
	>
		<slot />
	</div>
</template>
