	<template>
		<div class="navigation">
			<nav class="navigation__nav">
				<div class="navigation__logo"><router-link class="link" :to="'/'">Home</router-link></div>
				<ul class="navigation__list">
					<li class="navigation__item"><router-link class="link" :to="'create'">Create</router-link></li>
					<li class="navigation__item"><router-link class="link" :to="'view-proj'">View Projects</router-link></li>
					<li class="navigation__item" v-if="!currentUser"><a class="link login" @click="flipLoginSwitch"> Login/Register </a></li>
					<li class="navigation__item" v-else><a class="link user"> {{ currentUser }} </a><a class="link logout" @click="logout"> Logout </a> </li>
				</ul>
			</nav>
		</div>
	</template>

	<script>
		export default {
			name: 'header-nav',
			props: {
			},
			data () {
				return {
				}
			},
			computed: {
				currentUser(){
					return this.$store.state.users.currentUser
				}
			},
			methods: {
				flipLoginSwitch(){
					this.$store.dispatch('flipLoginSwitch')
				},
				logout(){
					this.$store.dispatch('logout')
					this.$store.dispatch('delCookie', 'userCookie')
				}
			}
		}
	</script>
	<style lang="scss" scoped>
		li {
			list-style: none;
		}

		.link,
		.link:active,
		.link:visited {
			text-decoration: none;
			color: #fff;
			cursor: pointer;
		}
		
		.navigation {
			background-color: #3c4859;
			height: 8rem;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 8rem;
			z-index: 1;
			padding-left: 3rem;

			&__nav  {
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&__logo {
				font-size: 2.4rem;
			}

			&__list {
				width: 50%;
				display: flex;
				justify-content: space-evenly;
			}

			&__item {
				font-size: 1.6rem;
				color: #fff;
			}
		}
	</style>

