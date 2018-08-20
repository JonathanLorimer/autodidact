	<template>
		<div @click="flipLoginSwitch">
			<div class="container" @click.stop="doNothing">
				<div class="error_message" v-show="err"> {{ err }} </div>
				<form action="" class="login" v-if="formSwitch" @submit.prevent="submitLogin">
					<div class="login__email-container">
						<input
							type="email" 
							class="login__email email"
							v-model="login.email"
							maxlength="100" 
							placeholder="Email"
							@click="clearErr">
						<label for="email" class="login__email-label"> Email </label>
					</div>
					<div class="login__password-container">
						<input
							type="password"
							class="login__password password"
							v-model="login.password"
							maxlength="50"
							placeholder="Password"
							@click="clearErr">
						<label for="password" class="login__password-label password"> Password </label>
					</div>
					<button class="login__submit btn" type="submit"> Submit </button>
				</form>

				<form action="" class="register" v-else @submit.prevent="submitRegister">
					<div class="register__email-container">
						<input 
							type="email"
							class="register__email email-register"
							v-model="register.email"
							maxlength="100"
							placeholder="Email"
							@click="clearErr">
						<label for="email-register" class="register__email-label">Email</label>
					</div>
					<div class="register__password-container">
						<input 
							type="password" 
							class="register__password password-register"
							v-model="register.password"
							maxlength="50"
							placeholder="Password"
							@click="clearErr">
						<label for="password-register" class="register__password-label"> Password </label>
					</div>
					<div class="register__password-container">
						<input 
							type="password"
							class="register__password password-confirm"
							v-model="register.passwordConfirm"
							maxlength="50"
							placeholder="Confirm Password"
							@click="clearErr">
						<label for="password-confirm" class="register__password-label"> Confirm Password </label>
					</div>
					<button type="submit" class="register__submit btn"> Submit </button>
				</form>
				<div class="options">
					<a class="options__button" @click="loginSwitch"> Login </a>
					<a class="options__button" @click="registerSwitch"> Register </a>
				</div>

				<div class="name"> {{ currentUser }} </div>
			</div>
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
			},
			methods: {
				loginSwitch(){
					this.err = ''
					this.formSwitch = true
				},
				registerSwitch(){
					this.err = ''
					this.formSwitch = false
				},
				submitRegister(){
					if (this.register.password.trim() !== this.register.passwordConfirm.trim()) this.err = 'Passwords do not match'
					if (!this.register.password.trim()) this.err = "Please enter a password"
					if (!this.register.email.trim()) this.err = "Please enter a valid email"
					else {
						this.$store.dispatch('registerUser', { email: this.register.email.trim(), password: this.register.password.trim() })
							.then( data => { 
								if (data.status.success) {
									this.$store.dispatch('setCookie', { name: 'userCookie', value: data.uuid, days: 1})
									this.$store.dispatch('flipLoginSwitch')
								}
								else this.err = data.status.message.replace('User unsuccesfully registered: ', '')
							})
							.catch( err => console.log(err))
					}
				},
				submitLogin(){
					if (!this.login.email.trim()) this.err = "Please enter a valid email"
					if (!this.login.password.trim()) this.err = "Please enter a password"
					if (this.login.email.trim() && this.login.password.trim()){
						this.$store.dispatch('loginUser', { email: this.login.email.trim(), password: this.login.password.trim() })
							.then( data => {
								if (data.status.success) {
									this.$store.dispatch('setCookie', { name: 'userCookie', value: data.uuid, days: 1})
									this.$store.dispatch('flipLoginSwitch')
								}
								else { 
									if (data.status.message === "User unsuccesfully registered: TypeError: Cannot read property 'password' of null") this.err = "User must enter a password"
									if (data.status.message === "User unsuccesfully registered: Password does not match") this.err = "Incorrect password"
								}
							})
							.catch( err => console.log(err))
					}
				},
				clearErr(){
					this.err = ''
				},
				flipLoginSwitch(){
					this.$store.dispatch('flipLoginSwitch')
				},
				doNothing(){}
			}
		}
	</script>
	<style lang="scss" scoped>
		.container{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			height: 40rem;
			width: 40rem;
			border-radius: 3px;
			padding: 6rem 4rem;
			box-shadow: 1rem 1.5rem 2rem rgba(44, 62, 80, 0.3);
			background-color: #e2f1e9;
			font-size: 2rem;
			

			.error_message {
				display: block;
				position: absolute;
				top: 3rem;
				left: 50%;
				transform: translateX(-50%);
				width: 60%;
			}

			.btn {
				&:focus{
				outline: none;
				}
				border: none;
				box-shadow: none;
				height: 4rem;
				width: 15rem;
				border-radius: 50rem;
				font-size: 1.6rem;
				margin-top: 1rem;
				cursor: pointer;
				transition: all .2s;

				&:hover{
					transform: scale(1.2);
				}

				&:active{
					transform: scale(1)
				}
			}

			.options {
				display: flex;
				justify-content: space-evenly;
				margin-top: 1rem;
				&__button {
					cursor: pointer;
				}
			}

			.register {
				&__submit {
					margin-top: -.5rem;
				}
			}

			.login,
			.register {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				height: 25rem;

				input:focus::-webkit-input-placeholder { color:transparent; }
				input:focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
				input:focus::-moz-placeholder { color:transparent; } /* FF 19+ */
				input:focus:-ms-input-placeholder { color:transparent; }

				input::-webkit-input-placeholder { color:#2c3e50; font-size: 1.4rem; }
				input:-moz-placeholder { color:#2c3e50; font-size: 1.4rem; }
				input::-moz-placeholder { color:#2c3e50; font-size: 1.4rem; }
				input:-ms-input-placeholder { color:#2c3e50; font-size: 1.4rem; }

				&__email-container,
				&__password-container {
					position: relative;
				}

				&__password-label,
				&__email-label {
					position: absolute;
					top: 50%;
					transform: translateY(-45%);
					left: 1rem;
					color: transparent;
					pointer-events: none;
					font-size: 1.5rem;
				}
				&__password:focus + .login__password-label,
				&__email:focus + .login__email-label,
				&__password:focus + .register__password-label,
				&__email:focus + .register__email-label {
					position: absolute;
					top: -1rem;
					left: 0;
					color:#2c3e50;
					transition: all .4s cubic-bezier(.99,.15,.45,1.46)
				}


				&__password,
				&__password:focus,
				&__password:active,
				&__email,
				&__email:focus,
				&__email:active {
					border: none;
					outline: none;
					width: 22.5rem;
					height: 3rem;
					padding-left: 1rem;
				}
				&__password {
				}
				&__email {
				}
				&__submit {
				}

				
			}
		}
	</style>