	<template>
		<div class="test-text">View Page</div>
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