// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: [
				'@tanstack/vue-query',
				'@vueuse/core',
				'class-variance-authority',
				'cn',
				'reka-ui',
				'dayjs'
			]
		}
	},
	modules: [
		'@nuxt/image',
		'shadcn-nuxt',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Lato: {
						wght: [300, 400, 700],
						ital: [300]
					}
				}
			}
		],
		'@nuxt/icon/module',
		'@pinia/nuxt'
	],
	css: ['~/assets/css/tailwind.css'],
	components: {
		dirs: [{ path: '~/components', ignore: ['ui/**'] }]
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	shadcn: {
		prefix: 'UI',
		componentDir: '~/components/ui'
	}
})
