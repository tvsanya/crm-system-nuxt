<template>
	<div class="p-10">
		<h1 class="font-bold text-2xl mb-10">CRM System</h1>
		<div v-if="isLoading">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-5 gap-16">
				<div
					v-for="(column, index) in data"
					:key="column.id"
				>
					<div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
						{{ column.name }}
					</div>
					<div>
						<KanbanCreateDeal
							:refetch="refetch"
							:status="column.id"
						/>
						<UICard
							v-for="card in column.items"
							:key="card.id"
							class="mb-3"
							draggable="true"
						>
							<UICardHeader role="button">
								<UICardTitle>{{ card.name }}</UICardTitle>
								<UICardDescription class="mt-2 block">
									{{ convertCurrency(card.price) }}
								</UICardDescription>
							</UICardHeader>
							<UICardContent class="text-xs">
								<div>Компания</div>
								{{ card.companyName }}
							</UICardContent>
							<UICardFooter>
								{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
							</UICardFooter>
						</UICard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertCurrency } from '@/utils/convertCurrency'
import dayjs from 'dayjs'
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'

useSeoMeta({
	title: 'Home | CRM System'
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()
</script>
