	<template>
		<div class="navigation">
			<nav class="navigation__nav">
				<div class="navigation__logo"><router-link class="link" :to="'/'">Home</router-link></div>
				<ul class="navigation__list">
					<li class="navigation__item"><router-link class="link" :to="'create'">Create</router-link></li>
					<li class="navigation__item"><router-link class="link" :to="'view-proj'">View Projects</router-link></li>
					<li class="navigation__item"><router-link class="link" :to="'login'">Login/Register</router-link></li>
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
			background-color: green;
			height: 8rem;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 8rem;
			z-index: 1;

			&__nav  {
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&__logo {

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

