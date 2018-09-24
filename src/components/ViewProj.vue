	<template>
		<div class="container">
			<ul class="user-learningpaths">
				<li
					class="user-learningpaths__path"
					v-for="path in userProjects" 
					:key="path._id"
				>
					<div>{{ path.name }}</div>
					<div>{{ path.learningMaterials.length}} Materials</div>
					<div v-for="type in getTypes(path.learningMaterials)" :key="type">{{ type }}</div>
				</li>
			</ul>
			<ul class="non-user-learningpaths">
				<li 
					class="non-user-learningpaths__path"
					v-for="path in nonUserProjects" 
					:key="path._id"
				>
					{{ path.name }}
				</li>
			</ul>
			
		</div>
	</template>

	<script>
		export default {
			name: 'view-proj',
			props: {
			},
			data () {
				return {
					
				}
			},
			computed: {
				nonUserProjects(){
					return this.$store.state.projects.nonUserProjects
				},
				userProjects(){
					return this.$store.state.projects.userProjects
				}
			},
			mounted(){
				if (this.$store.state.projects.firstLoad) {
					this.$store.dispatch('getAllProjects', this.$store.state.users.currentUserId)
				}
			},
			methods: {
				getTypes(materials){
					let ref = materials.reduce((acc, cur) => {
						if (acc[cur.type]) acc[cur.type]++
						else acc[cur.type] = 1
						return acc
					}, {})

					let typesArray = []
					for (let item in ref){
						typesArray.push(`${ref[item]} ${item}${ref[item] > 1 ? 's' : ''}`)
					}

					return typesArray
				}
			}
		}
	</script>
	<style lang="scss" scoped>
		.container {
			padding: 10rem;
			background-color: #e2f1e9;
			height: 120rem;
		}
		.user-learningpaths {
			display: flex;
			padding: 4rem;
			height: 30rem;
			list-style: none;
			background-color: #b7cec2;
			border-radius: .5rem;
			box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			&__path {
				display: flex;
				flex-direction: column;
				font-size: 2.4rem;
				min-width: 20rem;
				padding: 2rem;
				margin-right: 4rem;
				background-color: #fff;
				border-radius: .5rem;
				box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			}
		}
		.non-user-learningpaths {
			display: grid;
			margin-top: 4rem;
			list-style: none;
			background-color: #b7cec2;
			border-radius: .5rem;
			box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
		}
	</style>