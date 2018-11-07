	<template>
		<div class="container">
			<div v-if="currentUser">
				<div class="title">{{ currentUser }}'s Learning Paths</div>
				<ul class="user-learningpaths">
					<li
						class="user-learningpaths__path"
						v-for="path in userProjects" 
						:key="path._id"
					>
						<div>{{ path.name }}</div>
						<div class="user-learningpaths__path--materials-count">{{ path.learningMaterials.length}} Materials</div>
						<div class="user-learningpaths__path--materials-type" v-for="type in getTypes(path.learningMaterials)" :key="type">{{ type }}</div>
					</li>
			</ul>
			</div>
			<div class="title">Public Learning Paths</div>
			<ul class="non-user-learningpaths">
				<li 
					class="non-user-learningpaths__path"
					v-for="path in nonUserProjects" 
					:key="path._id"
				>
					<div>{{ path.name }}</div>
					<div class="non-user-learningpaths__path--materials-count">{{ path.learningMaterials.length}} Materials</div>
					<div class="non-user-learningpaths__path--materials-type" v-for="type in getTypes(path.learningMaterials)" :key="type">{{ type }}</div>
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
				currentUser(){
					return this.$store.state.users.currentUser
				},
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
			padding: 8rem;
			background-color: #e2f1e9;
		}
		.title {
			font-size: 2rem;
			margin-bottom: 2rem;
			font-weight: 600;
		}
		.user-learningpaths {
			display: flex;
			padding: 4rem;
			height: 40rem;
			list-style: none;
			background-color: #b7cec2;
			border-radius: .5rem;
			box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			margin-bottom: 4rem;
			&__path {
				display: flex;
				flex-direction: column;
				font-size: 3rem;
				min-width: 20rem;
				max-width: 30rem;
				padding: 4rem;
				margin-right: 4rem;
				background-color: #fff;
				border-radius: .5rem;
				box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
				&--materials-count {
					font-size: 2.4rem;
					padding: 1rem 0 .5rem;
					margin-bottom: .5rem;
					border-bottom: 1px solid rgba(#f37b56, 0.4);
				}
				&--materials-type {
					font-size: 1.8rem;
				}
			}
		}
		.non-user-learningpaths {
			padding: 2rem;
			// Grid Layout
			display: grid;
			grid-template-rows: repeat(4, minmax(30rem, 1fr));
			grid-template-columns: repeat(3, minmax(20rem, 1fr));
			grid-column-gap: 2rem;
			grid-row-gap: 2rem;

			margin-top: 4rem;
			list-style: none;
			background-color: #b7cec2;
			border-radius: .5rem;
			box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
			justify-items: stretch;
			&__path {
				justify-self: stretch;
				display: flex;
				flex-direction: column;
				font-size: 3rem;
				padding: 4rem;
				background-color: #fff;
				border-radius: .5rem;
				box-shadow: 0.5rem 1rem 3rem rgba(44, 62, 80, 0.1);
				&--materials-count {
					font-size: 2.4rem;
					padding: 1rem 0 .5rem;
					margin-bottom: .5rem;
					border-bottom: 1px solid rgba(#f37b56, 0.4);
				}
				&--materials-type {
					font-size: 1.8rem;
				}
			}
		}
	</style>