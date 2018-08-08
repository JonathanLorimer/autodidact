	<template>
		<div class="landing-page">
			<section class="hero-image">
				<div class="header">
					<h1 class="header__text">Autodidact</h1>
					<p class="header__content">A tool for the self learner to connect and organize their materials</p>
				</div>
			</section>
		</div>
	</template>

	<script>
		export default {
			name: 'landing-page',
			props: {
			},
			data () {
				return  {

				}
			}
		}
	</script>
	<style lang="scss" scoped>
		li {
			list-style: none;
		}
		.landing-page {
			background-color: #e2f1e9;
			height: 200rem;
		}
		.hero-image {
			display: flex;
			align-content: center;
			justify-content: center;
			background-image: 
				linear-gradient(
					rgba(#f37b56, 0.8),
					rgba(#f37b56, 0.8)
				),
				url("../assets/book_background.png");
			background-size: cover;
			-webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
			clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
			height: 90vh;
			.header {
				display: flex;
				flex-direction: column;
				justify-content: center;
				color: #fff;
				&__text {
					font-size: 10rem;
					margin-bottom: 2rem;
				}
				&__content{
					font-size: 2.5rem;
					margin-bottom: 12vh;
				}
			}
		}
	</style>

