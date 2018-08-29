<template>
	<div id="app">
		<header-nav></header-nav>
		<div class="spacer"></div>
		<router-view></router-view>
		<login id="login" v-if="loginSwitch"></login>
	</div>
</template>
<script>
export default {
	name: 'app',
	created(){
		this.$store.dispatch('getCookie', 'userCookie')
			.then( res => {
				if (res && !this.$store.state.users.currentUser) {
					this.$store.dispatch('loginUserById', res)
				}
			})
		if(JSON.parse(localStorage.getItem('learningPath')) && JSON.parse(localStorage.getItem('learningMaterials'))) this.$store.dispatch('setStateFromLocalStorage')
	},
	data () {
		return {
		}
	},
	created () {
		if (!this.$store.state.users.currentUserId){
			this.$store.dispatch('clearLocalStorage')
		}
	},
	computed:{
		loginSwitch(){
			return this.$store.state.users.loginSwitch
		}
	},
	methods: {
		flipLoginSwitch(){
			this.$store.dispatch('flipLoginSwitch')
		}
	}
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
	position: relative;
}

#login {
	position: fixed;
	background-color: rgba(#2c3e50, .6);
	height: 100vh;
	width: 100vw;
	padding: 4rem;
	top: 0;
	left: 0;
}

</style>
