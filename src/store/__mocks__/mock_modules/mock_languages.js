const state = {
	languageIds: [1,2,3,4],
	languages: {
		1: {
			id: 1,
			name: "JavaScript",
			frameworks: [
				{
				name: "Vue"
				},
				{
				name: "React"
				},
				{
				name: "Ember"
				},
				{
				name: "Angular"
				},
				{
				name: "Preact"
				}
			]
		},
		2: {
			id: 2,
			name: "Ruby",
			frameworks: [
				{
				name: "Rails"
				}
			]
		},
		3: {
			id: 3,
			name: "Elixir",
			frameworks: [
				{
				name: "Phoenix"
				}
			]
		},
		4: {
			id: 4,
			name: "PHP",
			frameworks: [
				{
				name: "Laravel"
				}
			]
		}
	}
}


const actions = {
	getLanguages: jest.fn(),
	getLanguage: jest.fn(),
}

export default {
	state,
	actions,
}