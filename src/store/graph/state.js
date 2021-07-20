let uuid = require('uuid/v4')
let $f = require('flatted')
let smarts = require('smarts')()
let state = {
  schemas: {},
	feedback: [],
	dialog: [],
	entityDefault: {
		alopu: {
			username: undefined,
			password: undefined
    },
    registered: {
      any: false
    },
    uid: uuid()
	},
	clientId: undefined,
	passwordConfirmation: '',
	authLogs: [],
	pageHistory: [],
	showLoginOptions: true,
	leftSidebar: false,
  cartSidebar: false,
	navigation: {
    general: [
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
    ],
    user: [
      {
        name: 'your orders',
        link: '/orders',
        icon: 'box-handle.png'
      },
      {
        name: 'your inventory',
        link: '/inventory',
        icon: 'store.png'
      },
      {
        name: 'your carts',
        link: '/carts',
        icon: 'trolley.png'
      },
    ]
  }
}
state.entity = $f.parse($f.stringify(state.entityDefault))

export default state
