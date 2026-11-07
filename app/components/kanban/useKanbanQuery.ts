import { COLLECTION_DEALS, DB_ID } from '@/types/app.constants.ts'
import type { IDeal } from '@/types/deals.types'
import { useQuery } from '@tanstack/vue-query'
import { Query } from 'appwrite'
import { KANBAN_DATA } from './kanban.data'

export function useKanbanQuery() {
	return useQuery({
		queryKey: ['deals'],
		queryFn: () =>
			DB.listDocuments(DB_ID, COLLECTION_DEALS, [
				Query.select(['*', 'customers.*'])
			]),
		select(data) {
			const newBoard = [...KANBAN_DATA]

			const deals = data.documents as unknown as IDeal[]

			for (const deal of deals) {
				const column = newBoard.find(col => col.id === deal.status)
				if (column) {
					column.items.push({
						$createdAt: deal.$createdAt,
						id: deal.$id,
						name: deal.name,
						price: deal.price,
						companyName: deal.customers.name ?? 'Не указана',
						status: column.name
					})
				}
			}

			return newBoard
		}
	})
}
