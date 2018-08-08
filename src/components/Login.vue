	<template>
		<div class="login_register">

			<form action="" class="login" v-if="formSwitch" @submit.prevent="submitLogin">
				<label for="email" class="login__email-label">
					Email
					<input type="email" class="login__email email" v-model="login.email">
				</label>
				<label for="password" class="login__password-label password">
					Password
					<input type="password" class="login__password password" v-model="login.password">
				</label>
				<button class="login__submit btn" type="submit"> Submit </button>
			</form>

			<form action="" class="register" v-else @submit.prevent="submitRegister">
				<label for="email-register" class="register__email-label">
					Email
					<input type="email" class="register__email email-register" v-model="register.email">
				</label>
				<label for="password-register" class="register__password-label">
					Password
					<input type="password" class="register__password password-register" v-model="register.password">
				</label>
				<label for="password-confirm" class="register__password-label">
					Confirm Password
					<input type="password" class="register__password password-confirm">
				</label>
				<button type="submit" class="register__submit btn"> Submit </button>
			</form>

			<a class="login__button" @click="loginSwitch"> Login </a>
			<a class="register__button" @click="registerSwitch"> Register </a>

			<a class="logout__button" @click="logout">logout</a>

			<div class="error_message" v-show="err"> {{ err }} </div>

			<div class="name"> {{ currentUser }} </div>
		</div>
	</template>

	<script>
		export default {
			name: 'login',
			props: {
			},
			data () {
				return {
					formSwitch: true,
					register: {
						email: '',
						password: '',
						passwordConfirm: ''
					},
					login: {
						email: '',
						password: '',
						passwordConfirm: ''
					},
					err: false
				}
			},
			computed: {
				currentUser () {
					return this.$store.state.users.currentUser
				}
			},
			mounted(){
				this.$store.dispatch('getCookie', 'userCookie')
					.then( res => {
						if (res && !this.$store.currentUser) {
							console.log(res)
							this.$store.dispatch('loginUserById', res)
						}
					})
			},
			methods: {
				loginSwitch(){
					this.formSwitch = true
				},
				registerSwitch(){
					this.formSwitch = false
				},
				submitRegister(){
					if (this.register.password !== this.register.passwordConfirm) this.err = 'Passwords do not match'
					else {
						this.$store.dispatch('registerUser', { email: this.register.email, password: this.register.password })
							.then( data => { this.$store.dispatch('setCookie', { name: 'userCookie', value: data.uuid, days: 1}) })
							.catch( err => console.log(err))
					}
				},
				submitLogin(){
					this.$store.dispatch('loginUser', { email: this.login.email, password: this.login.password })
						.then( data => { this.$store.dispatch('setCookie', { name: 'userCookie', value: data.uuid, days: 1}) })
						.catch( err => console.log(err))
				},
				logout(){
					this.$store.dispatch('delCookie', 'userCookie')
					this.$store.dispatch('logout')
				}

			}
		}
	</script>
	<style lang="scss" scoped>
		.test-text {
			margin-top: 20rem;
		}
	</style>