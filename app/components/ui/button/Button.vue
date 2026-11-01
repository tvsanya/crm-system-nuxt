<script setup lang="ts">
import { cn } from 'cn'
import { Primitive } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { buttonVariants } from '.'

defineOptions({ inheritAttrs: false })

interface Props {
	as?: string | Component
	asChild?: boolean
	variant?: ButtonVariants['variant']
	size?: ButtonVariants['size']
	class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
	as: 'button'
})
</script>

<template>
	<Primitive
		data-slot="button"
		:data-variant="variant"
		:data-size="size"
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
		v-bind="$attrs"
	>
		<slot />
	</Primitive>
</template>
