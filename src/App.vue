<template>
	<div id="app">
		<header-nav></header-nav>
		<div class="spacer"></div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	created(){
		console.log('created')
		// this.$store.dispatch('getLanguages').then(()=>{
		// 	console.log('finished updating state')
		// })
	},
	data () {
		return {
		}
	},
}
</script>
<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	.spacer {
		height: 8rem;
	}
}
</style>
