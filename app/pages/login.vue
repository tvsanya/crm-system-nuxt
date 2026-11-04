<template>
	<div class="flex items-center justify-center min-h-screen w-full">
		<div class="rounded bg-sidebar w-1/4 p-5">
			<h1 class="text-2xl font-bold text-center mb-5">Login</h1>

			<form>
				<UIInput
					placeholder="Email"
					id="email"
					type="email"
					class="mb-3"
					v-model="emailRef"
				/>
				<UIInput
					placeholder="Password"
					id="password"
					type="password"
					class="mb-3"
					v-model="passwordRef"
				/>
				<UIInput
					placeholder="Name"
					id="name"
					type="name"
					class="mb-3"
					v-model="nameRef"
				/>
				<div class="flex items-center justify-center gap-5">
					<UIButton
						type="button"
						@click="login"
					>
						Login
					</UIButton>
					<UIButton
						type="button"
						@click="register"
					>
						Register
					</UIButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store'

useSeoMeta({
	title: 'Login | CRM System'
})

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
	isLoadingStore.set(true)
	await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
	const response = await account.get()
	if (response) {
		authStore.set({
			email: response.email,
			name: response.name,
			status: response.status
		})
	}

	emailRef.value = ''
	passwordRef.value = ''
	nameRef.value = ''

	router.push('/')
	isLoadingStore.set(false)
}

const register = async () => {
	await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)
	await login()
}
</script>
