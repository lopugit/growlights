let uuid = require('uuid/v4')
export default {
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
