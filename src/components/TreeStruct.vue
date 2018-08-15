<template>
  <div class="tree-struct">
	<tr class="tree-struct__row" :style="indent" v-if="learningMaterials[id]">
		<td class="tree-struct__block tree-struct__name"><a :href="learningMaterials[id].link" class="tree-struct__link">{{ learningMaterials[id].name }}</a></td>
		<td class="tree-struct__block tree-struct__type">{{ learningMaterials[id].type }}</td>
	</tr>
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
        	return { transform: `translate(${this.depth * 2}rem)` }
      	}
	}
  }
</script>
<style lang="scss" scoped>
	.tree-struct {
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
