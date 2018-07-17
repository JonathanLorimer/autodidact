<template>
	<div id="app">
		<hello-world :msg="'Welcome to Your Vue.js App'"></hello-world>
		<router-link
			v-for="id in $store.state.languages.languageIds"
			:key="id"
			:to="id"
		>
			{{ $store.state.languages.languages[id].name }}
		</router-link>

		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	created(){
		console.log('created')
		this.$store.dispatch('getLanguages').then(()=>{
			console.log('finished updating state')
		})
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
	margin-top: 60px;
}
</style>
