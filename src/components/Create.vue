	<template>
		<div class="container">
			<button class="add-material btn" @click="flipCreateSwitch">
				+ Add Learning Material
			</button>
			<!-- <ul class="learning-path">
				<li 
				class="learning-path__learning-material"
				v-for="material in learningPath" :key="material.id">
					<tr class="learning-path__row" v-for="preReq in material" :key="preReq.name">
						<td class="learning-path__name"> {{ preReq.name }} </td>
						<td class="learning-path__type"> {{ preReq.type }} </td>
						<td class="learning-path__link"> {{ preReq.link }}</td>
						<td class="learning-path__pre-req"> {{ preReq.preReq.name}}</td>
					</tr>
				</li>
			</ul> -->
			<div>{{ learningPath }}</div>
			<div>{{ learningMaterials }}</div>
			<create-form 
				id="create-form" 
				v-if="createFormSwitch"
				@click.native="flipCreateSwitch"
				v-on:flipCreateSwitch="flipCreateSwitch"></create-form>
			<button class="save-learning-path btn">
				Save Learning Path
			</button>
		</div>
	</template>

	<script>
		export default {
			name: 'create',
			props: {
			},
			data () {
				return {
					createFormSwitch: false
				}
			},
			computed: {
				learningPath(){
					return this.$store.state.learningPath.learningPath
				},
				learningMaterials(){
					return this.$store.state.learningPath.learningMaterials
				}
			},
			mounted(){
			},
			methods: {
				flipCreateSwitch(){
					this.createFormSwitch = !this.createFormSwitch
				},
				traversePreReqs(obj, acc = []){
					acc.unshift(obj)
					if (!obj.preReq.name) return acc
					else return traversePreReqs(obj.preReq, acc)
				}
			}
		}
	</script>
	<style lang="scss" scoped>
		#create-form {
			position: fixed;
			background-color: rgba(#2c3e50, .6);
			height: 100vh;
			width: 100vw;
			padding: 4rem;
			top: 0;
			left: 0;
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

		.add-material,
		.save-learning-path {
			background-color: #f37b56;
			color: #fff;
			height: 6rem;
			width: 24rem;
			margin-top: 16rem;
		}

		.container {
			background-color: #e2f1e9;
			height: 120rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.learning_material {
				&__name-container {
					
				}
				&__name {

				}
				&__name-label {

				}
			}
		}

	</style>

