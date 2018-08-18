<template>
	<div>
		<div class="container" @click.stop="doNothing">
			<form action="" class="learning-material" @submit.prevent="submitEdit">
				<div class="learning-material__name-container">
					<input
						type="text" 
						class="learning-material__name"
						v-model="learningMaterial.name"
						maxlength="100" 
						placeholder="Name"
						@click="clearErr">
					<label for="learning-material__name" class="learning-material__name-label"> Name </label>
				</div>
				<div class="learning-material__name-container">
					<input 
						list="material-type"
						class="learning-material__type"
						v-model="learningMaterial.type"
						maxlength="50" 
						placeholder="Type"
						@click="clearErr">
					<label for="learning-material__type" class="learning-material__type-label"> Type </label>
					<datalist id="material-type">
						<option value="Book"></option>
						<option value="Article"></option>
						<option value="Video"></option>
						<option value="Course"></option>
						<option value="Project"></option>
					</datalist>
				</div>
				<div class="learning-material__link-container">
					<input
						type="url" 
						class="learning-material__link"
						v-model="learningMaterial.link"
						maxlength="100" 
						placeholder="Link"
						@click="clearErr">
					<label for="learning-material__link" class="learning-material__link-label"> Link </label>
				</div>
				<div class="learning-material__pre-req-container">
					<input 
						class="learning-material__pre-req"
						:placeholder="learningMaterial.preReq.name || 'Pre-Requisite'"
						disabled>
					<div 
						class="event-catcher" 
						style="position:absolute; left:0; right:0; top:0; bottom:0;"
						@click="flipDropdownSwitch">
						<input type="checkbox" class="menu-checkbox" :checked="dropdownSwitch">
						<label for="menu-checkbox" class="menu-indicator"></label>
					</div>
					<div class="learning-material__pre-req-container--dropdown-container" v-show="dropdownSwitch">
						<ul class="learning-material__pre-req-container--dropdown">
							<li 
								class="learning-material__pre-req-container--item" 
								v-for="item in learningMaterials" 
								:key="item.id" 
								@click="addPreReq($event, item)"> {{ item.name }} </li>
							<li class="learning-material__pre-req-container--item" @click="addPreReq($event, false)">Remove</li>
						</ul>
					</div>
				</div>
				<div class="learning-material__button-container">
					<button class="learning-material__submit btn" type="submit"> Submit </button>
					<a class="learning-material__delete btn" @click.prevent="deleteMaterial"> Delete </a>
				</div>
				<div class="err">{{this.err}}</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'edit-form',
		props: {
		},
		data () {
			return {
				learningMaterial: {
					id: '',
					name: '',
					type: '',
					link: '',
					preReq: {},
				},
				dropdownSwitch: false,
				err: '',
			}
		},
		computed: {
			learningPath(){
				return this.$store.state.learningPath.learningPath
			},
			learningMaterials(){
				return Object.values(this.$store.state.learningPath.learningMaterials).filter(e => e.id !== this.learningMaterial.id)
			}
		},
		mounted(){
			this.learningMaterial.id = this.$store.state.learningPath.editing.id
			this.learningMaterial.name = this.$store.state.learningPath.editing.name
			this.learningMaterial.type = this.$store.state.learningPath.editing.type
			this.learningMaterial.link = this.$store.state.learningPath.editing.link
			this.learningMaterial.preReq = this.$store.state.learningPath.editing.preReq
		},
		methods: {
			clearErr(){
				this.err = ''
			},
			flipDropdownSwitch(){
				if(this.learningMaterials.length > 0) this.dropdownSwitch = !this.dropdownSwitch;
				else this.err = 'No learning materials to add as pre-requisite'
			},
			submitEdit(){
				// Trim white space from string entries
				this.learningMaterial.name = this.learningMaterial.name.trim()
				this.learningMaterial.type = this.learningMaterial.type.trim()
				this.learningMaterial.link = this.learningMaterial.link.trim()

				// Validation
				if (!this.learningMaterial.name) this.err = 'Please name your learning material'
				if (!this.learningMaterial.type) this.err = 'Please categorize your learning material with a type'

				// Save the Material and flip the form switch
				if(this.learningMaterial.name && this.learningMaterial.type) {
					this.$store.dispatch('editMaterial', this.learningMaterial)
					this.$emit('flipEditSwitch')
					this.learningMaterial = {
						name: '',
						type: '',
						link: '',
						preReq: {},
					}
				}
			},
			addPreReq(event, item){
				this.learningMaterial.preReq = item
				this.flipDropdownSwitch()
			},
			doNothing(){},
			deleteMaterial(){
				this.$store.dispatch('deleteMaterial', this.learningMaterial.id)
				this.$emit('flipEditSwitch')
			}
		}
	}
</script>
<style lang="scss" scoped>
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
		height: 50rem;
		width: 46rem;
		border-radius: 3px;
		padding: 4rem 4rem 10rem;
		box-shadow: 1rem 1.5rem 2rem rgba(44, 62, 80, 0.3);
		background-color: #e2f1e9;
		font-size: 2rem;

		.learning-material {
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

			&__name-container,
			&__type-container,
			&__link-container {
				position: relative;
			}

			&__name-label,
			&__type-label,
			&__link-label,
			&__pre-req-label {
				position: absolute;
				top: 50%;
				transform: translateY(-45%);
				left: 1rem;
				color: transparent;
				pointer-events: none;
				font-size: 1.5rem;
			}
			&__name:focus + .learning-material__name-label,
			&__type:focus + .learning-material__type-label,
			&__link:focus + .learning-material__link-label,
			&__pre-req:focus + .learning-material__pre-req-label, {
				position: absolute;
				top: -1rem;
				left: 0;
				color:#2c3e50;
				transition: all .4s cubic-bezier(.99,.15,.45,1.46)
			}

			&__name,
			&__name:active,
			&__name:focus,
			&__type,
			&__type:active,
			&__type:focus,
			&__link,
			&__link:active,
			&__link:focus,
			&__pre-req,
			&__pre-req:active,
			&__pre-req:focus {
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

			&__delete {
				margin-left: 4rem;
			}

			&__button-container {
				display: flex;
				align-items: center
			}

			&__pre-req-container {
				position: relative;
				.event-catcher {
					position:absolute; 
					left:0; 
					right:0; 
					top:0; 
					bottom:0;
				}
				.menu-indicator {
					position: absolute;
					left: 27rem;
					top: 1.5rem;
					height: 2px;
					width: 1.8rem;
					background-color: black;
					&::before{
						content: '';
						position: absolute;
						top: .5rem;
						left: 0;
						height: 2px;
						width: 1.8rem;
						background-color: black;
						transition: all .3s ease;
					}
					&::after {
						content: '';
						position: absolute;
						top: -.5rem;
						left: 0;
						height: 2px;
						width: 1.8rem;
						background-color: black;
						transition: all .3s ease;
					}
				}
				.menu-checkbox {
					display: none;
				}
				.menu-checkbox:checked + .menu-indicator{
					background-color: transparent;
					&::before{
						transform: rotate(315deg);
						width: 1rem;
						top: .3rem;
						left: .8rem;
						transition: all .3 ease;
					}
					&::after {
						transform: rotate(-315deg);
						width: 1rem;
						top: -.3rem;
						left: .8rem;
						transition: all .3 ease;
					}
				}
				.event-catcher:hover .menu-checkbox:checked + .menu-indicator{
					&::before{
						top: .3rem;
					}
					&::after {
						top: -.3rem;
					}
				}
				.event-catcher:hover .menu-indicator {
					&:before {
						top: .7rem;
					}
					&:after {
						top: -.7rem;
					}
				}
				&--dropdown-container {
					position: absolute;
					background-color: #fff;
					left: 40rem;
					top: -26.3rem;
					height: 50rem;
					&::after {
						content: '';
						height: 10rem;
						width: 10rem;
						transform: rotate(45deg);
						position: absolute;
						background-color: #fff;
						top: 22.8rem;
						left: -5rem;
						z-index: -1;
					}
				}
				&--dropdown {
					max-height: 40rem;
					overflow-y: auto;
					width: 20rem;
					&::-webkit-scrollbar {
						background-color: #fff;
					}
					&::-webkit-scrollbar-thumb {
						background-color: #2c3e50;
					}
				}
				&--item{
					width: 100%;
					list-style: none;
					padding: .5rem 4rem;
					cursor: pointer;
				}
				&--item:hover{
					background-color:#2c3e50;
					color: #fff;
				}

			}
		}
	}

</style>