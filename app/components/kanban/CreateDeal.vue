<template>
	<div class="text-center mb-2">
		<button
			class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
			@click="isOpenForm = !isOpenForm"
		>
			<Icon
				v-if="isOpenForm"
				name="radix-icons:arrow-up"
				class="fade-in-100 fade-out-0"
				size="35"
			/>
			<Icon
				v-else
				name="radix-icons:plus-circled"
				class="fade-in-100 fade-out-0"
				size="35"
			/>
		</button>
	</div>
	<form
		v-if="isOpenForm"
		@submit="onSubmit"
		class="form"
	>
		<UIInput
			placeholder="Наименование"
			v-model="name"
			v-bind="nameAttrs"
			type="text"
			class="input"
		/>
		<UIInput
			placeholder="Сумма"
			v-model="price"
			v-bind="priceAttrs"
			type="number"
			class="input"
		/>
		<UIInput
			placeholder="Email"
			v-model="customersEmail"
			v-bind="customersEmailAttrs"
			type="email"
			class="input"
		/>
		<UIInput
			placeholder="Компания"
			v-model="customersName"
			v-bind="customersNameAttrs"
			type="text"
			class="input"
		/>

		<button
			class="btn"
			:disabled="isPending"
		>
			{{ isPending ? 'Загрузка...' : 'Добавить' }}
		</button>
	</form>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'

const isOpenForm = ref(false)

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
	customers: {
		email: string
		name: string
	}
	status: string
}

const props = defineProps({
	status: {
		type: String,
		default: ''
	},
	refetch: {
		type: Function
	}
})

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
	initialValues: {
		status: props.status
	}
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customersEmail, customersEmailAttrs] = defineField('customers.email')
const [customersName, customersNameAttrs] = defineField('customers.name')

const { mutate, isPending } = useMutation({
	mutationKey: ['create a new deal'],
	mutationFn: (data: IDealFormState) =>
		DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
	onSuccess() {
		props.refetch && props.refetch()
		handleReset()
	}
})

const onSubmit = handleSubmit(values => {
	mutate(values)
})
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.input {
	@apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
	@apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
	@apply mb-3 block;
	animation: show 0.3s ease-in-out;
}

@keyframes show {
	from {
		border-color: #a252c83d;
		transform: translateY(-35px);
		opacity: 0.4;
	}

	90% {
		border-color: #a252c83d;
	}

	to {
		border: transparent;
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
