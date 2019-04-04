let state = {
	schemas: {},
	feedback: [],
	dialog: [],
	entityDefault: {
		alopu: {
			username: undefined,
			password: undefined
		}
	},
	userAgent: navigator.userAgent,
	env: window.env,
	clientId: undefined,
	registerable: 'haventchecked',
	passwordConfirmation: ''
}
state.entity = state.entityDefault
export default state