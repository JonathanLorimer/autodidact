	<template>
		<div class="container">
			<div class="path-name">&#34;{{ currentPathName }}&#34;</div>
			<tree-struct
				class="root"
				:id="learningPath.id"
				:nodes="learningPath.nodes"
				:depth="0"
			>
			<div class="path-name">{{ currentPathName }}</div>
			</tree-struct>
			<create-form 
				id="create-form" 
				v-if="createFormSwitch"
				@click.native="flipCreateSwitch"
				v-on:flipCreateSwitch="flipCreateSwitch"></create-form>
			<edit-form 
				id="edit-form" 
				v-if="editSwitch"
				@click.native="flipEditSwitch"
				v-on:flipEditSwitch="flipEditSwitch"></edit-form>
			<learning-path-form 
				id="learning-path-form" 
				v-if="LPSwitch"
				@click.native="flipLPSwitch"
				v-on:flipLPSwitch="flipLPSwitch"></learning-path-form>
			<div class="button-container">
				<button class="add-material btn" @click="flipCreateSwitch">
					+ Add Learning Material
				</button>
				<button class="save-learning-path btn" @click="flipLPSwitch">
					Save Learning Path
				</button>
			</div>
		</div>
	</template>

	<script>
		export default {
			name: 'create',
			props: {
			},
			data () {
				return {
					createFormSwitch: false,
					LPSwitch: false
				}
			},
			computed: {
				learningPath(){
					return this.$store.state.learningPath.learningPath
				},
				learningMaterials(){
					return this.$store.state.learningPath.learningMaterials
				},
				editSwitch(){
					return this.$store.state.learningPath.editSwitch
				},
				currentPathName(){
					return this.$store.state.learningPath.currentPathName
				}
			},
			mounted(){

			},
			methods: {
				flipCreateSwitch(){
					this.createFormSwitch = !this.createFormSwitch
				},
				flipLPSwitch(){
					this.LPSwitch = !this.LPSwitch
				},
				flipEditSwitch(){
					this.$store.dispatch('flipEditSwitch')
				},
			}
		}
	</script>
	<style lang="scss" scoped>
		#create-form,
		#edit-form,
		#learning-path-form {
			position: fixed;
			background-color: rgba(#2c3e50, .6);
			height: 100vh;
			width: 100vw;
			padding: 4rem;
			top: 0;
			left: 0;
		}

		.path-name {
			margin-top: 6rem;
			font-size: 3rem;
			color: #2c3e50;
			font-weight: 700;
		}

		.root{
			// background-color: #b7cec2;
			// width: 80vw;
			// min-height: 60vh;
			// margin-top: 8rem;
			// padding: 2rem 3rem 2rem 2rem;
			// border-radius: .5rem;
			// box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			// display: flex;
			// justify-content: center;

			background-color: #b7cec2;
			width: 80vw;
			min-height: 60vh;
			margin-top: 4rem;
			padding: 2rem 3rem 2rem 2rem;
			border-radius: .5rem;
			box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			display: flex;
			flex-direction: column;
			align-items: baseline;
		}

		.btn {
			&:focus{
			outline: none;
			}
			border: none;
			box-shadow: 2px 5px 1rem rgba(44, 62, 80, 0.25);;
			border-radius: 50rem;
			font-size: 1.6rem;
			margin-top: 1rem;
			cursor: pointer;
			transition: all .2s;

			&:hover{
				transform: scale(1.2);
				box-shadow: 3px 7px 3rem rgba(44, 62, 80, 0.15);
			}

			&:active{
				transform: scale(1);
				box-shadow: 2px 5px 1rem rgba(44, 62, 80, 0.25);
			}
		}
		.button-container{
			display: flex;
			justify-content: space-evenly;
			width: 60vw;
			padding: 4rem;
			.add-material,
			.save-learning-path {
				background-color: #f37b56;
				color: #fff;
				height: 6rem;
				width: 24rem;
			}
		}

		.container {
			background-color: #e2f1e9;
			height: 120rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			// .learning_material {
			// 	&__name-container {
					
			// 	}
			// 	&__name {

			// 	}
			// 	&__name-label {

			// 	}
			// }
		}

	</style>

