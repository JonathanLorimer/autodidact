	<template>
		<div class="test-text">View Page
			<ul>
				<li v-for="path in learningPaths" :key="path._id">{{ path.name }}</li>
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
				learningPaths(){
					return this.$store.state.projects.learningPaths
				}
			},
			mounted(){
				console.log('In View')
			}
		}
	</script>
	<style lang="scss" scoped>
		.test-text {
			margin-top: 20rem;
		}
	</style>