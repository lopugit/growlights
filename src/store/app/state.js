let uuid = require('uuid/v4')
let state = {
  fbParams: {
    scope: 'email,public_profile',
    return_scopes: true
  },
  googleParams: {
    client_id: '278663639558-du8pit378au8cvkm22s1vv02be65dmru.apps.googleusercontent.com'
  },
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
	passwordConfirmation: '',
  isAuthenticated: false,
	authLogs: [],
	pageHistory: [],
	interactionStarted: false,
	showLoginOptions: true,
	leftSidebar: false,
  cartSidebar: false,
  products: [],
	cart: [],
	navigation: [
    {
      name: 'home',
      link: '/home',
      icon: 'store.png'
    },
		{
			name: 'grow lights',
			link: '/products/grow lights',
			icon: 'hothouse.png'
		},
		{
			name: 'grow rooms',
			link: '/products/grow rooms',
			icon: 'green-house.png'
		},
		{
			name: 'grow kits',
			link: '/products/grow kits',
			icon: 'stock.png'
		},
		{
			name: 'additives',
			link: '/products/additives',
			icon: 'research.png'
		},
		{
			name: 'accessories',
			link: '/products/accessories',
			icon: 'smart-farm.png'
		},
	]
}
state.entity = state.entityDefault

export default state
