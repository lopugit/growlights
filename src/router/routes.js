import Vue from 'vue'
import Router from 'vue-router'
import register from 'src/components/register'
import logout from 'src/components/logout'

import test1 from 'src/components/test1'

export default [
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
				path: '/logout',
				component: () => import('components/logout'),

			},
      {
        path: '/products/:productType',
        component: () => import('components/products'),
        props: (route)=>({
          ...route.params,
          cards: true
        }),
      },
      {
        path: '/products/product/:productTitle',
        component: () => import('components/product'),
        props: true,
      },
    ]
    // props: true
	},
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
