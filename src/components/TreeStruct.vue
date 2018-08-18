<template>
  <div class="tree-struct">
	<div class="tree-struct__container" v-if="learningMaterials[id]">
		<tr class="tree-struct__row" :style="indent">
			<td class="tree-struct__block tree-struct__name"><a :href="learningMaterials[id].link" target="_blank" class="tree-struct__link">{{ learningMaterials[id].name }}</a></td>
			<td class="tree-struct__block tree-struct__type">{{ learningMaterials[id].type }}</td>
		</tr>
		<div class="tree-struct__edit"><a class="tree-struct__edit--link" @click="flipEditSwitch"><i class="far fa-edit"></i></a></div>
	</div>
    <tree-struct
      v-for="node in nodes"
	  :key ="node.id"
      :nodes="node.nodes" 
      :id="node.id"
	  :depth="depth + 1"
    >
    </tree-struct>
  </div>
</template>
<script>
  export default { 
    props: [ 'id', 'nodes', 'depth' ],
	name: 'tree-struct',
	data(){
		return{}
	},
	computed: {
		learningMaterials(){
			return this.$store.state.learningPath.learningMaterials
		},
		indent() {
        	return { marginLeft: `${(this.depth - 1) * 6}rem` }
      	}
	},
	methods: {
		flipEditSwitch(){
			this.$store.dispatch('flipEditSwitch', this.id)
		}
	}
  }
</script>
<style lang="scss" scoped>
	.tree-struct {
		&__container {
			display: flex;
		}
		&__container:hover .tree-struct__edit{
			display: flex;
		}
		&__edit{
			display: none;	
			background-color: #fff;
			height: 3.6rem;
			border-radius: 3px;
			width: 3.6rem;
			margin-left: .5rem;
			justify-content: center;
			align-items: center;
			&--link{
				height: 2rem;
				margin-bottom: .4rem;
				margin-left: .4rem;
				cursor: pointer;
			}
			.fa-edit,
			.fa-edit:link,
			.fa-edit:active,
			.fa-edit:visited {
				outline: none;
				color: #2c3e50;
				font-size: 2rem;
			}
		}
		&__row {
			// background-color: #e8edeb;
			background-color: #fff;
			height: 3rem;
			border-radius: 3px;
			display: flex;
			width: auto;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;
			padding: 1.8rem 0;
			// TODO: figure out how to animate hovering over row
			// transition: all .2s;
			// &:hover {
			// 	outline: 3px solid #2c3e50;
			// }
		}

		&__block {
			padding: 0 1.5rem;
			font-size: 2rem;
		}
		&__link:link,
		&__link:active,
		&__link:visited {
			text-decoration: none;
			color:#2c3e50;
			font-weight: 900;
		}
	}
</style>
