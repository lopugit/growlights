const routes = [
  // {
  //   path: '/',
  //   name: 'test1',
  //   component: test1
  // },
  {
		path: '/(|home)',
		component: () => import('layouts/default'),
    children: [
      {
				name: 'home',
        path: '',
        component: () => import('src/components/home')
      },
      {
        name: 'checkout',
        path: '/checkout(|/.*)',
        component: () => import('src/components/checkout')
      },
      {
        name: 'cart',
        path: '/cart',
        component: () => import('src/components/cart'),
        props: {
          theme: {
            pretty: true,
          },
          banner: true
        }
      },
			{
				path: '/(login|register)',
				component: () => import('components/manifest'),
			},
			{
				path: '/logout',
				component: () => import('components/logout'),
			},
			{
				path: '/privacy',
				component: () => import('components/privacy'),
			},
			{
				path: '/TOS',
				component: () => import('components/TOS'),
			},
			{
				path: '/profile(|/):x(.*)',
        component: () => import('components/profile'),
        props: (route)=>({
          props: {
            ...route.params
          }
        })
			},
      {
        path: '/products/:productType(.*)',
        component: () => import('components/products'),
        props: (route)=>({
          props: {
            cards: true,
            theme: {
              search: true,
            },
            query: {
              types: {
                $in: [route.params.productType || 'product']
              }
            },
            ...route.params,
          }
        }),
      },
      {
        path: '/product/:productTitle(.*)',
        component: () => import('components/product'),
        props: (route)=>({
          props: {
            showcase: true,
            product: {
              title: route.params.productTitle
            }
          },
        }),
      },
    ]
    // props: true
	},
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
