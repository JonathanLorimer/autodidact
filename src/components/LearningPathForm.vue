<template>
	<div>
		<div class="container" @click.stop="doNothing">
			<transition name="fade" mode="out-in">
				<form action="" class="learning-path fade" @submit.prevent="submitLearningPath" v-if="!success" :key="'form'">
				<!-- <form action="" class="learning-path fade" @submit.prevent="submitLearningPath" :key="'form'"> -->
					<div class="learning-path__name-container">
						<input
							type="text" 
							class="learning-path__name"
							v-model="learningPath.name"
							maxlength="100" 
							placeholder="Name"
							@click="clearErr">
						<label for="learning-path__name" class="learning-path__name-label"> Name </label>
					</div>
					<button class="learning-path__submit btn" type="submit" > Submit </button>
					<div class="err">{{this.err}}</div>
				</form>
				<div class="success-message fade" v-else :key="'success-message'">
				<!-- <div class="success-message fade" :key="'success-message'"> -->
					<div class="success-message__message">
						<img src="../assets/approved_check_checkbox_checkmark_confirm_success_yes_icon_128.svg" alt="" class="success-message__image">
						Learning Path successfully saved
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import uuid from 'uuid/v4'
	export default {
		name: 'learning-path-form',
		props: {
		},
		data () {
			return {
				learningPath: {
					name: '',
				},
				err: '',
				success: false,
			}
		},
		computed: {
		},
		mounted(){
		},
		methods: {
			clearErr(){
				this.err = ''
			},
			submitLearningPath(){
				// Trim white space from string entries
				this.learningPath.name = this.learningPath.name.trim()


				// Save the PathlearningPath and flip the form switch
				if (this.$store.state.learningPath.currentPathId){
					this.$store.dispatch('updateLearningPath')
					.then(res => {
						if (res.status.success){
							this.success = true
							setTimeout(() => {
								this.$emit('flipLPSwitch')
								this.learningPath = {
									name: '',
								}
								this.success = false
							}, 2500)
						}
					})
				}
				else if(this.learningPath.name) {
					let userId = this.$store.state.users.currentUserId
					let name = this.learningPath.name
					this.$store.dispatch('saveLearningPath', { userId, name })
					.then(res => {
						if (res.status.success){
							this.success = true
							setTimeout(() => {
								this.$emit('flipLPSwitch')
								this.learningPath = {
									name: '',
								}
								this.success = false
							}, 2500)
						}
					})
				}
			},
			doNothing(){}
		}
	}
</script>
<style lang="scss" scoped>
	// transition group
	.fade-enter-active {
	  transition: all .3s ease;
	}
	.fade-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.fade-enter, .fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	  transform: translateX(10px);
	  opacity: 0;
	}
	.transition-wrapper {
		height: 100%;
		width: 100%;
	}

	.btn {
		&:focus{
		outline: none;
		}
		border: none;
		box-shadow: none;
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

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 30rem;
		width: 46rem;
		border-radius: 3px;
		padding: 4rem 4rem 10rem;
		box-shadow: 1rem 1.5rem 2rem rgba(44, 62, 80, 0.3);
		background-color: #e2f1e9;
		font-size: 2rem;

		.learning-path {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			height: 100%;
			position: relative;
			
			.err {
				position: absolute;
				bottom: -6rem;
				width: 100%;
			}

			input:focus::-webkit-input-placeholder { color:transparent; }
			input:focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
			input:focus::-moz-placeholder { color:transparent; } /* FF 19+ */
			input:focus:-ms-input-placeholder { color:transparent; }

			input::-webkit-input-placeholder { color:#2c3e50; font-size: 1.4rem; }
			input:-moz-placeholder { color:#2c3e50; font-size: 1.4rem; }
			input::-moz-placeholder { color:#2c3e50; font-size: 1.4rem; }
			input:-ms-input-placeholder { color:#2c3e50; font-size: 1.4rem; }
			select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
			}

			&__name-container {
				position: relative;
			}

			&__name-label {
				position: absolute;
				top: 50%;
				transform: translateY(-45%);
				left: 1rem;
				color: transparent;
				pointer-events: none;
				font-size: 1.5rem;
			}
			&__name:focus + .learning-path__name-label {
				position: absolute;
				top: -1rem;
				left: 0;
				color:#2c3e50;
				transition: all .4s cubic-bezier(.99,.15,.45,1.46)
			}

			&__name,
			&__name:active,
			&__name:focus {
				border: none;
				outline: none;
				width: 30rem;
				height: 3rem;
				padding-left: 1rem;
				font-size: 1.5rem;
			}

			&__submit {
				height: 4rem;
				width: 15rem;
			}
		}
		.success-message {
			height: 100%;
			width: 100%;
			display: flex;
			&__message{
				display: flex;
				align-items: center;
				margin-top: 4rem;
			}
			&__image {
				height: 4.8rem;
				width: 4.8rem;
				margin-right: 2rem;
			}
		}
	}
</style>