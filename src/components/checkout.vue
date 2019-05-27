<template lang='pug'>
.checkout-container
  .checkout-positioner
    .checkout
      .banner-section
        banner(
          size="thin"
        )
      .checkout-section
        .breadcrumbs-section.q-display-no-bp-min-sm.q-pt-xxsm.q-pl-md.q-pr-md.q-pb-md.q-pr-xxxl-bp-min-md.q-pr-xl-bp-min-sm
          .breadcrumbs(
            )
            .breadcrumb-container.flex-row
              router-link.breadcrumb(
                :class=`{
                  active: $route.path == '/checkout/cart'
                }`
                to="/cart"
                ) cart
            .breadcrumb-container.flex-row
              .separator.q-pl-xxsm.q-pr-xxsm >
              router-link.breadcrumb(
                to="/checkout/customer_information"
                :class=`{
                  active: $route.path == '/checkout/customer_information'
                }`
                ) customer information
            .breadcrumb-container.flex-row
              .separator.q-pl-xxsm.q-pr-xxsm >
              router-link.breadcrumb(
                :to=`
                  !getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false)
                  &&
                  !getsmart($v, 'state.app.entity.alopu.username.$error', false)
                    ? '/checkout/shipping_method'
                    : ''
                `
                @click.native=`
                  let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
                  let touch2 = getsmart($v, 'state.app.entity.alopu.username.$touch', false)
                  if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                    touch1()
                    touch2()
                    if(!getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.$error', false)){
                      setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
                    } else {
                      setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                    }
                  } else {
                    setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                  }
                `
                :class=`{
                  active: $route.path == '/checkout/shipping_method'
                }`
                ) shipping method
            .breadcrumb-container.flex-row
              .separator.q-pl-xxsm-bp-min-sm.q-pr-xxsm >
              router-link.breadcrumb(
                :to=`
                  !getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false)
                  &&
                  !getsmart($v, 'state.app.entity.alopu.username.$error', false)
                    ? '/checkout/payment_method'
                    : ''
                `
                @click.native=`
                  let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
                  let touch2 = getsmart($v, 'state.app.entity.alopu.username.$touch', false)
                  if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                    touch1()
                    touch2()
                  }
                `

                :class=`{
                  active: $route.path == '/checkout/payment_method'
                }`
                ) payment method
        .user-section.q-pt-xxsm.q-pl-md.q-pr-md.q-pb-md.q-pr-xxxl-bp-min-md.q-pr-xl-bp-min-sm
          .breadcrumbs-section.q-display-no-bp-max-sm
            .breadcrumbs(
              )
              .breadcrumb-container.flex-row
                router-link.breadcrumb(
                  :class=`{
                    active: $route.path == '/checkout/cart'
                  }`
                  to="/cart"
                  ) cart
              .breadcrumb-container.flex-row
                .separator.q-pl-xxsm.q-pr-xxsm >
                router-link.breadcrumb(
                  to="/checkout/customer_information"
                  :class=`{
                    active: $route.path == '/checkout/customer_information'
                  }`
                  ) customer information
              .breadcrumb-container.flex-row
                .separator.q-pl-xxsm.q-pr-xxsm >
                router-link.breadcrumb(
                  :to=`
                    !getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false)
                    &&
                    !getsmart($v, 'state.app.entity.alopu.username.$error', false)
                      ? '/checkout/shipping_method'
                      : ''
                  `
                  @click.native=`
                    let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
                    let touch2 = getsmart($v, 'state.app.entity.alopu.username.$touch', false)
                    if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                      touch1()
                      touch2()
                      if(!getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.$error', false)){
                        setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
                      } else {
                        setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                      }
                    } else {
                      setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                    }
                  `
                  :class=`{
                    active: $route.path == '/checkout/shipping_method'
                  }`
                  ) shipping method
              .breadcrumb-container.flex-row
                .separator.q-pl-xxsm-bp-min-sm.q-pr-xxsm >
                router-link.breadcrumb(
                  :to=`
                    !getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false)
                    &&
                    !getsmart($v, 'state.app.entity.alopu.username.$error', false)
                      ? '/checkout/payment_method'
                      : ''
                  `
                  @click.native=`
                    let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
                    let touch2 = getsmart($v, 'state.app.entity.alopu.username.$touch', false)
                    if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                      touch1()
                      touch2()
                    }
                  `

                  :class=`{
                    active: $route.path == '/checkout/payment_method'
                  }`
                  ) payment method

          .active-subsection.q-pt-md
            .customer-information.subsection(
              v-if="$route.path == '/checkout/customer_information'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm(
                v-show="getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                )
                q-item.q-pl-md.q-pr-xmd.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ getsmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

              .header.q-flex-row.q-pt-xxxxlg(
                v-show="!getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                )
                .q-title-thin Contact Information
                .account-message(
                  v-if="!getsmart($store, 'state.app.entity.registered.any', false)"
                  ) Already have an account?
                  a.login-btn.text-black(
                    @click="setsmart($store, 'state.app.showLoginDialog', true)"
                  ) Log in
              form.q-pt-smd
                q-input.border-1.q-br-rd-sm.no-shadow(
                  v-show="!getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                  label="Email"
                  filled
                  square
                  :value="getsmart($store, 'state.app.entity.alopu.username', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.username', $event)"
                  bottom-slots
                  :error=`
                    ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.required', false)) ) ||
                    ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.email', false)) ) ||
                    ( (getsmart($v, 'state.app.entity.alopu.username.$error', true) && getsmart($v, 'state.app.entity.alopu.username.$anyError', true)) )
                  `
                )
                  template(v-slot:error) {{ ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.required', false)) ? 'This value is required' : undefined ) || ( (getsmart($v, 'state.app.entity.alopu.username.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.email', false)) ? 'This is not a valid email' : undefined ) || ( (getsmart($v, 'state.app.entity.alopu.username.$error', true) && getsmart($v, 'state.app.entity.alopu.username.$anyError', true)) ? "There's something wrong with this value" : undefined ) }}

                .header.q-mt-xxxxl
                  .q-title-thin Shipping address
                .input-row.q-mt-smd
                  q-input.q-mb-smd.border-1.q-br-rd-sm.no-shadow.q-input-6.q-mr-xsm(
                    label="First name"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.first name', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.first name', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.first name.$anyError', false))
                    `
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.first name.$anyError', false)) ? 'This value is required' : '' }}
                  q-input.q-mb-smd.border-1.q-br-rd-sm.no-shadow.q-input-6.q-ml-xsm(
                    label="Last name"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.last name', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.last name', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.last name.$anyError', false))
                    `
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.last name.$anyError', false)) ? 'This value is required' : '' }}
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="Company (optional)"
                  filled
                  square
                  :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.company', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.company', $event)"
                )
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="Address"
                  filled
                  square
                  :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.line1', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.line1', $event)"
                  bottom-slots
                  :error=`
                    (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.line1.$anyError', false))
                  `
                )
                  template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.line1.$anyError', false)) ? 'This value is required' : true }}
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="Apartment, suite, etc. (optional)"
                  filled
                  square
                  :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', $event)"
                )
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="City"
                  filled
                  square
                  :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.city', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.city', $event)"
                  bottom-slots
                  :error=`
                    (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.city.$anyError', false))
                  `
                )
                  template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.city.$anyError', false)) ? 'This value is required' : true }}
                .input-row
                  q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-mr-xsm(
                    label="Country"
                    filled
                    square
                    :value=`
                        getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.country', undefined)
                      `
                    @input=`
                      setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.country', $event)
                      setsmart($refs, 'stateappentityalopucarts0addressesshippingcountry.inputValue', $event)
                    `
                    @input.native=`
                      setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.country', $event.target.value)
                      setsmart($refs, 'stateappentityalopucarts0addressesshippingcountry.inputValue', $event.target.value)
                    `
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.country.$anyError', false))
                    `
                    hide-selected
                    use-input
                    keep-input
                    :input-debounce="0"
                    ref="stateappentityalopucarts0addressesshippingcountry"
                    @filter=`(val, update)=>{
                      this.setsmart(this.$refs, 'stateappentityalopucarts0addressesshippingcountry.innerLoading', false)
                      this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.addresses.shipping.country', val)
                      this.setsmart(this.$refs, 'stateappentityalopucarts0addressesshippingcountry.inputValue', val)
                      update(()=>{

                      })
                    }`
                    :options=`getsmart($store, 'state.app.geos.countries.strings',
                      [
                        "Australia"
                      ]
                    )`
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.country.$anyError', false)) ? 'This value is required' : true }}
                  q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-ml-xsm.q-mr-xsm(
                    label="State"
                    filled
                    square
                    :value=`
                        getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.state', undefined)
                      `
                    @input=`
                      setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.state', $event)
                      setsmart($refs, 'stateappentityalopucarts0addressesshippingstate.inputValue', $event)
                    `
                    @input.native=`
                      setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.state', $event.target.value)
                      setsmart($refs, 'stateappentityalopucarts0addressesshippingstate.inputValue', $event.target.value)
                    `
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.state.$anyError', false))
                    `
                    use-input
                    keep-input
                    hide-selected
                    :input-debounce="0"
                    ref="stateappentityalopucarts0addressesshippingstate"
                    @filter=`(val, update)=>{
                      this.setsmart(this.$refs, 'stateappentityalopucarts0addressesshippingstate.innerLoading', false)
                      this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.addresses.shipping.state', val)
                      this.setsmart(this.$refs, 'stateappentityalopucarts0addressesshippingstate.inputValue', val)
                      update(()=>{

                      })
                    }`
                    :options=`getsmart($store, 'state.app.geos.countries.Australia.states',
                      [
                        "ACT",
                        "JBT",
                        "NSW",
                        "NT",
                        "QLD",
                        "SA",
                        "TAS",
                        "VIC",
                        "WA",
                      ]
                    )`
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.state.$anyError', false)) ? 'This value is required' : true }}
                  q-input.border-1.q-br-rd-sm.no-shadow.q-input-4.q-ml-xsm(
                    label="Postcode"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode.$anyError', false))
                    `
                    mask="####"
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode.$anyError', false)) ? 'This value is required' : true }}
              .q-flex-column-bp-max-sm.q-align-start-bp-max-sm.q-flex-row.flex-wrap.q-align-center.full-width.bottom-section.q-mt-xl-bp-min-sm.q-mt-smd-bp-max-sm
                router-link.text-nowrap.q-order-1-bp-max-sm.q-mt-xsmd-bp-max-sm(
                  to="/cart"
                )
                  span.text-thick.q-mr-sm <
                  | Return to cart
                q-btn.q-order-2-bp-max-sm.text-nowrap.continue-to-shipping.q-mr-no.q-mt-md-bp-max-sm.q-ml-auto-bp-min-sm.text-initial.text-normal(
                  size="lg"
                  color="primary"
                  @click=`
                    let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
                    let touch2 = getsmart($v, 'state.app.entity.alopu.username.$touch', false)
                    if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                      touch1()
                      touch2()
                      if(!getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !getsmart($v, 'state.app.entity.alopu.username.$error', false)){
                        $router.push('/checkout/shipping_method');
                        setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
                      } else {
                        setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                      }
                    } else {
                      setsmart($store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
                    }
                  `
                ) Continue to shipping method
            .shipping-method.subsection(
              v-if="$route.path == '/checkout/shipping_method'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm
                q-item.q-pl-md.q-pr-xmd.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ getsmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

                q-separator.q-mt-xxxsm.q-mb-xxxsm
                q-item.q-pl-md.q-pr-xmd.q-align-start.q-pt-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Ship to
                  q-item-section.q-pl-lg.address-parsed(

                    ) {{ getsmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
                  q-item-section(
                    side
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

              .header.q-pt-xxxxlg.q-pb-xxmd.flex-column
                .q-title-thin Shipping method
                .text-xxsm.text-negative.q-ml-xsm.q-mt-sm(
                  :class=`{
                    'negative-visible': getsmart($v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false),
                    'negative-hidden': !getsmart($v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false),
                  }`
                )
                  | Please choose a shipping method
              q-btn.full-width.q-pa-no.text-normal.text-no.q-border-1.q-round-border-md.q-flex-row.full-width(
                flat
                @click="setsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod', { type: 'Free shipping', cost: 'Free'})"
                :ripple='false'
              )
                q-item.full-width.no-point.q-flex.q-justify-center.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm
                  q-item-section.full-width(
                    side
                  )
                    q-radio.full-width(
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.cost', undefined)"
                      :val="'Free'"
                      label="Free Shipping"
                    )
                  q-item-section.q-ml-auto(
                    side
                  ) {{ getsmart($store, 'state.app.shippingMethods.Free shipping.cost', 'Free') }}
              // q-btn.full-width.q-pa-no.text-normal.text-no.q-border-1.q-round-border-md.q-flex-row.full-width(
                flat
                @click="setsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod', { type: 'Express shipping', cost: '$20.00'})"
                :ripple='false'
                )
                q-item.full-width.no-point.q-flex.q-justify-center.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm
                  q-item-section.full-width(
                    side
                  )
                    q-radio.full-width(
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.type', 'Express shipping')"
                      :val="'Express shipping'"
                      label="Express shipping"
                    )
                  q-item-section.q-ml-auto(
                    side
                  ) {{ getsmart($store, 'state.app.shippingMethods.Express shipping.cost', '$20.00') }}
              .q-flex-column-bp-max-sm.q-align-start-bp-max-sm.q-flex-row.flex-wrap.q-align-center.full-width.bottom-section.q-mt-xl-bp-min-sm.q-mt-smd-bp-max-sm
                router-link.text-nowrap.q-order-1-bp-max-sm.q-mt-xsmd-bp-max-sm(
                  to="/checkout/customer_information"
                )
                  span.text-thick.q-mr-sm <
                  | Return to customer information
                q-btn.q-order-2-bp-max-sm.text-nowrap.continue-to-shipping.q-mr-no.q-mt-md-bp-max-sm.q-ml-auto-bp-min-sm.text-initial.text-normal(
                  size="lg"
                  color="primary"
                  @click=`
                    let touch1 = getsmart($v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$touch', false)
                    if(typeof touch1 == 'function') {
                      touch1()
                      if(!getsmart($v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false)){
                        $router.push('/checkout/payment_method')
                      }
                    }
                    `
                ) Continue to payment method
            .payment-method.subsection(
                v-if="$route.path == '/checkout/payment_method'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm
                q-item.q-pl-md.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ getsmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!getsmart($store, 'state.app.entity.loggedIn.'+getsmart($store, 'state.app.userAgent', ''), false)"
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

                q-separator.q-mt-xxxsm.q-mb-xxxsm
                q-item.q-pl-md.q-align-start.q-pt-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Ship to
                  q-item-section.q-pl-lg.address-parsed(

                    ) {{ getsmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
                  q-item-section(
                    side
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change
                q-separator.q-mt-xxxsm.q-mb-xxxsm
                q-item.q-pl-md.q-align-start.q-pt-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Method
                  q-item-section.q-pl-lg.address-parsed(
                    ) {{ getsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.type', 'Shipping')}}
                  q-item-section.q-pl-lg.address-parsed(
                    side
                    ) {{ getsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.cost', 'Calculated at next step') }}
                  q-item-section(
                    side
                    )
                    router-link(
                      to="/checkout/shipping_method"
                    ).text-friendly Change
              .header.q-pt-xxxxlg.q-flex-column
                .q-title-thin Payment
                .q-subtitle.text-thin.text-xsm.text-friendly.q-pt-xxsm All transactions are secure and encrypted.
              .payment-methods-section.q-mt-md
                q-item.q-border-1.q-round-border-md.q-flex-row.full-width.q-flex.q-justify-center.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm(
                  :class=`{
                    'q-brb-rd-no': getsmart($store, 'state.app.entity.alopu.carts.0.paymentMethod', undefined) == 'card payment tab'
                  }`
                )
                  q-item-section.full-width(
                    side
                  )
                    q-radio.full-width.text-dark(
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.paymentMethod', 'card payment tab')"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.paymentMethod', 'card payment tab')"
                      :val="'card payment tab'"
                      label="Credit card"
                    ).text-normal.text-sm
                  q-item-section.q-ml-auto.q-flex-row.card-icons(
                    side
                  )
                    img.card-icon.q-mr-xxsm(
                      :class=`{
                        grayscale: (typeof getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number.toString', false) == 'function') ?
                          (getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '5') :
                          false,
                        op50: (typeof getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number.toString', false) == 'function') ?
                          (getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '5') :
                          false,
                      }`
                      src="/statics/visa-card-shopify-50.png"
                      )
                    img.card-icon(
                      :class=`{
                        grayscale: (typeof getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number.toString', false) == 'function') ?
                          (getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '4') :
                          false,
                        op50: (typeof getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number.toString', false) == 'function') ?
                          (getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '4') :
                          false
                      }`
                      src="/statics/master-card-shopify-50.png"
                      )
                form.credit-card-form.q-pa-xmd.q-borderb-round-sm.q-border-1.q-bordert-0(
                  v-if="getsmart($store, 'state.app.entity.alopu.carts.0.paymentMethod', undefined) == 'card payment tab'"
                )
                  q-input.border-1.q-br-rd-sm.no-shadow(
                    label="Card number"
                    filled
                    square
                    autocomplete="cc-number"
                    :value="getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', undefined)"
                    @input=`
                      setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', $event)
                    `
                    @input.native=`
                      setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.number', getsmart($event, 'target.value', $event))
                    `
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.required', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.numeric', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.minLength', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.maxLength', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.visamaster', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.$anyError', false))
                    `
                    mask="#### #### #### ####"
                    fill-mask
                    unmasked-value
                  )
                    template(
                      v-slot:append
                    )
                      q-icon(
                        size="medium"
                        name="lock"
                      )
                        q-tooltip.secure-tooltip(
                          :offset="[0, 30]"
                          anchor="top middle"
                        ) End-to-End 4096 Bit Encryption
                    template(
                      v-slot:error
                    ) {{
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.required', '')) ? 'This value is required' : '' ) ||
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.numeric', '')) ? 'Please only use numbers' : '' ) ||
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.minLength', '')) ? 'Credit card number must be 16 digits' : '' ) ||
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.maxLength', '')) ? 'Credit card number must be 16 digits' : '' ) ||
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.visamaster', false)) ? 'Credit card must be a valid Visa or Master Card' : '') ||
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.$anyError', '')) ? "There's something wrong with this value" : '' )
                      | }}
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mt-smd(
                    label="Name on card"
                    filled
                    square
                    autocomplete="cc-name"
                    :value="getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Name on card', undefined)"
                    @input="setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Name on card', $event)"
                    @input.native=`
                      setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Name on card', getsmart($event, 'target.value', $event))
                    `
                    bottom-slots
                    :error=`
                      ( getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Name on card.required', false)) ||
                      ( getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Name on card.$anyError', false))
                    `
                  )
                    template(v-slot:error) {{
                      | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Name on card.required', false)) ? 'This value is required' : '') ||
                      | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Name on card.$anyError', false)) ? "There's something wrong with this value" : '')
                      | }}
                  .input-row.q-mt-smd
                    q-input.border-1.q-br-rd-sm.no-shadow.q-input-6.q-mr-xsm(
                      label="Expiration date (MM / YYYY)"
                      filled
                      square
                      autocomplete="cc-exp"
                      :value=`getsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', undefined)`
                      @input=`
                        setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', $event)
                      `
                      @input.native=`
                        setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', getsmart($event, 'target.value', $event))
                      `
                      ref="stateappentitysecretscreditCardsmainCardExpiration date MM YYYY"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.required', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.minLength', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.maxLength', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.validDate', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.validMonth', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.$anyError',  false))
                      `
                      mask="##/####"
                      unmasked-value
                      fill-mask
                    )
                      template(v-slot:error) {{
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.required', false)) ? 'This value is required' : '' ) ||
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.minLength', false)) ? 'Expiry date must be in the format MM/YYYY' : '' ) ||
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.maxLength', false)) ? 'Expiry date must be in the format MM/YYYY' : '' ) ||
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.validMonth', false)) ? 'This is not a valid Month, must be between 1 and 12' : '' ) ||
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.validDate', false)) ? 'This is not a valid date' : '' ) ||
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.$anyError', false)) ? "There's something wrong with this value" : '' )
                        | }}
                    q-item.q-align-center.q-input-6.q-pa-no.q-border-1.q-border-round-sm
                      q-item-section
                        q-input.no-shadow(
                          label="Security code"
                          filled
                          square
                          :value="getsmart($store, `state.app.entity.secrets.creditCards.mainCard.Security code`, undefined)"
                          @input="setsmart($store, `state.app.entity.secrets.creditCards.mainCard.Security code`, $event)"
                          @input.native=`
                            setsmart($store, 'state.app.entity.secrets.creditCards.mainCard.Security code', getsmart($event, 'target.value', $event))
                          `
                          bottom-slots
                          :error=`
                            (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.required', false)) ||
                            (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.minLength', false)) ||
                            (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.maxLength', false)) ||
                            (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.$anyError', false))
                          `
                          mask="###"
                          autocomplete="cc-csc"
                          fill-mask
                          unmasked-value
                        )
                          template(
                            v-slot:append
                          )
                            q-icon(
                              name="help"
                              size="medium"
                            )
                              q-tooltip.ccv-tooltip(
                                :offset="[0, 30]"
                                anchor="top middle"

                              ) 3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.
                          template(v-slot:error) {{ ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.required', false)) ? 'This value is required' : '' ) || ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.minLength', false)) ? 'Security code must be 3 digits' : '' ) || ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.maxLength', false)) ? 'Security code must be 3 digits' : '' ) || ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Security code.$anyError', false)) ? "There's something wrong with this value" : '' ) }}
              .header.q-pt-xxxxlg
                .q-title-thin Billing address
              .billing-address-section.q-bordera-round-sm.q-pt-md
                q-item.q-border-1.q-round-border-md.q-borderb-round-no.q-flex-row.full-width.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm
                  q-item-section.full-width(
                    side
                  )
                    q-radio.full-width.text-dark(
                      :val="'Same as shipping address'"
                      label="Same as shipping address"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address')"
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address')"
                    ).text-normal.text-sm
                q-item.q-border-1.q-bordert-0.q-round-border-md.q-bordert-round-no.q-flex-row.full-width.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm(
                  :class=`{
                    'q-brb-rd-no': getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == 'Use a different billing address'
                  }`
                  )
                  q-item-section.full-width(
                    side
                  )
                    // v-model="shippingForm['billing address type']"
                    q-radio.full-width.text-dark(
                      :val="'Use a different billing address'"
                      label="Use a different billing address"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Use a different billing address')"
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', undefined)"
                    ).text-normal.text-sm
                form.credit-card-form.q-pa-xmd.q-border-1.q-bt-0.q-borderb-round-sm(
                  v-show="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address') == 'Use a different billing address'"
                )
                  .input-row
                    q-input.q-mb-smd.border-1.q-br-rd-sm.no-shadow.q-input-6.q-mr-xsm(
                      label="First name"
                      filled
                      square
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.first name', undefined)"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.first name', $event)"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.first name.$anyError', false))
                      `
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.first name.$anyError', false)) ? 'This value is required' : '' }}
                    q-input.q-mb-smd.border-1.q-br-rd-sm.no-shadow.q-input-6.q-ml-xsm(
                      label="Last name"
                      filled
                      square
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.last name', undefined)"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.last name', $event)"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.last name.$anyError', false))
                      `
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.last name.$anyError', false)) ? 'This value is required' : '' }}
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="Company (optional)"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.company', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.company', $event)"
                  )
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="Address"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.line1', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.line1', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.line1.$anyError', false))
                    `
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.line1.$anyError', false)) ? 'This value is required' : true }}
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="Apartment, suite, etc. (optional)"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', $event)"
                  )
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="City"
                    filled
                    square
                    :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.city', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.city', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.city.$anyError', false))
                    `
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.city.$anyError', false)) ? 'This value is required' : true }}
                  .input-row.q-mb-smd
                    q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-mr-xsm(
                      label="Country"
                      filled
                      square
                      :value=`
                        getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.country', undefined)
                      `
                      @input=`
                        setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.country', $event)
                        setsmart($refs, 'stateappentityalopucarts0addressesbillingcountry.inputValue', $event)
                      `
                      @input.native=`
                        setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.country', $event.target.value)
                        setsmart($refs, 'stateappentityalopucarts0addressesbillingcountry.inputValue', $event.target.value)
                      `
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.country.$anyError', false))
                      `
                      hide-selected
                      use-input
                      keep-input
                      :input-debounce="0"
                      ref="stateappentityalopucarts0addressesbillingcountry"
                      @filter=`(val, update)=>{
                        this.setsmart(this.$refs, 'stateappentityalopucarts0addressesbillingcountry.innerLoading', false)
                        this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.addresses.billing.country', val)
                        this.setsmart(this.$refs, 'stateappentityalopucarts0addressesbillingcountry.inputValue', val)
                        update(()=>{

                        })
                      }`
                      :options=`getsmart($store, 'state.app.geos.countries.strings',
                        [
                          "Australia"
                        ]
                      )`
                    )
                      template(v-slot:error) {{
                        | (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.country.$anyError', false)) ? 'This value is required' : true
                        | }}
                    q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-ml-xsm.q-mr-xsm(
                      label="State"
                      filled
                      square
                      :value=`
                          getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.state', undefined)
                        `
                      @input=`
                        setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.state', $event)
                        setsmart($refs, 'stateappentityalopucarts0addressesbillingstate.inputValue', $event)
                      `
                      @input.native=`
                        setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.state', $event.target.value)
                        setsmart($refs, 'stateappentityalopucarts0addressesbillingstate.inputValue', $event.target.value)
                      `
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.state.$anyError', false))
                      `
                      use-input
                      keep-input
                      hide-selected
                      :input-debounce="0"
                      ref="stateappentityalopucarts0addressesbillingstate"
                      @filter=`(val, update)=>{
                        this.setsmart(this.$refs, 'stateappentityalopucarts0addressesbillingstate.innerLoading', false)
                        this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.addresses.billing.state', val)
                        this.setsmart(this.$refs, 'stateappentityalopucarts0addressesbillingstate.inputValue', val)
                        update(()=>{

                        })
                      }`
                      :options=`getsmart($store, 'state.app.geos.countries.Australia.states',
                        [
                          "ACT",
                          "JBT",
                          "NSW",
                          "NT",
                          "QLD",
                          "SA",
                          "TAS",
                          "VIC",
                          "WA",
                        ]
                      )`
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.state.$anyError', false)) ? 'This value is required' : true }}
                    q-input.border-1.q-br-rd-sm.no-shadow.q-input-4.q-ml-xsm(
                      label="Postcode"
                      filled
                      square
                      :value="getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.postcode', undefined)"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.postcode', $event)"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.postcode.$anyError', false))
                      `
                      mask="####"
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.postcode.$anyError', false)) ? 'This value is required' : true }}
              .q-flex-column-bp-max-sm.q-align-start-bp-max-sm.q-flex-row.flex-wrap.q-align-center.full-width.bottom-section.q-mt-xl-bp-min-sm.q-mt-smd-bp-max-sm
                router-link.text-nowrap.q-order-1-bp-max-sm.q-mt-xsmd-bp-max-sm(
                  to="/checkout/shipping_method"
                )
                  span.text-thick.q-mr-sm <
                  | Return to shipping method
                q-btn.q-order-2-bp-max-sm.text-nowrap.continue-to-shipping.q-mr-no.q-mt-md-bp-max-sm.q-ml-auto-bp-min-sm.text-initial.text-normal(
                  size="lg"
                  color="primary"
                  @click=`checkout()`
                ) Pay now
                  q-spinner.q-ml-md(
                    v-if=`getsmart($store, 'state.app.paymentProcessing', false)`
                    size=".7em"
                    :thickness='4'
                  )

        .cart-section.q-pl-xxl-bp-min-md.q-pl-xl-bp-min-sm
          q-separator.q-display-no-bp-min-sm.q-mt-sm
          .show-order-summary-section.q-pt-sm.q-pb-sm.q-pl-md.q-display-no-bp-min-sm.q-width-100.q-bg-lightGrey(
            @click=`setsmart($store, 'state.app.checkout.showCartSummary', !getsmart($store, 'state.app.checkout.showCartSummary', false))`
          )
            q-item.align-center.q-pl-no.q-width-100(
            )
              q-item-section.flex-row.justify-start-important.align-center
                .message.text-md {{ getsmart($store, 'state.app.checkout.showCartSummary', false) ? 'Hide' : 'Show'}} order summary
                q-icon.q-pl-sm(
                  :name=`getsmart($store, 'state.app.checkout.showCartSummary', false) ? 'expand_less' : 'expand_more'`
                  size="large"
                )
              .cart-price.flex-row.q-ml-auto.text-lg ${{ Math.ceil(getsmart($store, 'getters.cartTotal', ()=>{return 0})({cart: getsmart($store, 'state.app.entity.alopu.carts.0', undefined)})*100)/100 }}
                .currency.q-pl-xxxsm {{ false || 'AUD' }}
          q-separator.q-display-no-bp-min-sm
          q-slide-transition(
          )
            .cart-transition-container.q-display-no-bp-min-sm(
              v-show="getsmart($store, 'state.app.checkout.showCartSummary', false)"
            )
              cart(
                :theme=`{
                  summary: true
                }`
              )
          cart.q-display-no-bp-max-sm(
            :theme=`{
              summary: true
            }`
          )

</template>
<script>
import * as v from 'vuelidate/lib/validators'
export default {
  name: 'checkout-comp',
  data () {
    return {
      // objects: null,
      // thing: this.$jsmart.stringify(this.$route),
      uuid: this._uid,
      state: {
        ...this.gosmart(this.$store, 'state', {})
      },
      things: {
        test: undefined
      }
    }
  },
  validations(){
    return {
      state: {
        app: {
          entity: {
            secrets: {
              creditCards: {
                mainCard: {
                  number: {
                    required: v.required,
                    numeric: v.numeric,
                    minLength: v.minLength(16),
                    maxLength: v.maxLength(16),
                    visamaster(val, vm){
                      return (typeof this.getsmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.number.toString', false) == 'function') ?
                          (
                            this.getsmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '5' ||
                            this.getsmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.number', 0).toString().slice(0,1) == '4'
                          ) :
                          false
                    }
                  },
                  'Name on card': {
                    required: v.required
                  },
                  'Expiration date MM YYYY': {
                    required: v.required,
                    minLength: v.minLength(6),
                    maxLength: v.maxLength(6),
                    validDate(val, vm){
                          return (
                            // if the month starts with a number greater than 1 it is wrong and the 1 is preceeded by a 0
                            (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] > 1) ?
                              // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
                              false :
                              // if the month starts with a 0 but ends with a 0 then it's wrong and the inputted number is not registered
                              (
                                (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] == 0 && this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[1] == 0) ?
                                  false :
                                // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
                                (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] == 1 && this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[1] > 2) ?
                                  false :
                                  true
                              )
                          )
                    },
                    validMonth(val, vm){
                          return (
                            // if the month starts with a number greater than 1 it is wrong and the 1 is preceeded by a 0
                            (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] > 1) ?
                              // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
                              false :
                              // if the month starts with a 0 but ends with a 0 then it's wrong and the inputted number is not registered
                              (
                                (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] == 0 && this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[1] == 0) ?
                                  false :
                                // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
                                (this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[0] == 1 && this.gosmart(this.$store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', '')[1] > 2) ?
                                  false :
                                  true
                              )
                          )
                    }
                  },
                  'Security code': {
                    required: v.required,
                    numeric: v.numeric,
                    minLength: v.minLength(3),
                    maxLength: v.maxLength(3),
                  }
                }
              }
            },
            alopu: {
              username: {
                required: v.required,
                email: v.email,
              },
              carts: {
                "0": {
                  shippingMethod: {
                    cost: {
                      notselected(val, vm){
                        return val !== 'Calculated at next step'
                      }
                    }
                  },
                  addresses: {
                    shipping: {
                      "first name": {
                        required: v.required
                      },
                      "last name": {
                        required: v.required
                      },
                      "company": {
                        // required: v.required
                      },
                      "line1": {
                        required: v.required
                      },
                      "Apartment, suite, etc": {
                        // required: v.required
                      },
                      "city": {
                        required: v.required
                      },
                      "country": {
                        required: v.required
                      },
                      "state": {
                        required: v.required
                      },
                      "postcode": {
                        required: v.required
                      },
                    },
                    billing: {
                      "first name": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "last name": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "company": {
                        // required: v.requiredIf(()=>{
                        //   return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        // })
                      },
                      "line1": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "Apartment, suite, etc": {
                        // required: v.requiredIf(()=>{
                        //   return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        // })
                      },
                      "city": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "country": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "state": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                      "postcode": {
                        required: v.requiredIf(()=>{
                          return this.gosmart(this, '$store.state.app.entity.alopu.carts.0.addresses.billing.type', undefined) == "Use a different billing address"
                        })
                      },
                    },
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  sockets: {
    connect: function(){
      // console.log("socket connect vue side")
    },
    // giveObjects(data){
    //   // console.log(data)
    //   if(this.uuid == data.id){
    //     this.objects = data.objects
    //   }
    // }
  },
  created () {
    if(this.$route.path !== '/checkout/customer_information'){
      let shippingAddressForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
      let usernameForm = this.getsmart(this.$v, 'state.app.entity.alopu.username.$touch', false)
      if(typeof shippingAddressForm == 'function' && typeof usernameForm == 'function') {
        shippingAddressForm()
        usernameForm()
        if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !this.getsmart(this.$v, 'state.app.entity.alopu.username.$error', false)){
          this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
          // validate shippingMethod stage
          if(this.$route.path !== 'shipping_method'){
            let shippingMethodForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$touch', false)
            if(typeof shippingMethodForm == 'function') {
              shippingMethodForm()
              if(this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false)){
                this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'valid')
                this.$router.push('/checkout/shipping_method')
              } else {
                this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'invalid')
              }
            }
          }
        } else {
          this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
          this.$router.push('/checkout/customer_information')
        }
      } else {
        this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
        this.$router.push('/checkout/customer_information')
      }
    }
    if(this.getsmart(this.$store, 'state.app.entity.alopu.carts.0.products.length', 0) < 1){
      this.$router.push('/cart')
    }
    // date validation code
    // (
    //   // if the month starts with a number greater than 1 it is wrong and the 1 is preceeded by a 0
    //   ($event[0] > 1) ?
    //     // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
    //     "0"+$event :
    //     // if the month starts with a 0 but ends with a 0 then it's wrong and the inputted number is not registered
    //     (
    //       ($event[0] == 0 && $event[1] == 0) ?
    //         gosmart($store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', undefined) :
    //       // if the month starts with a 1 but ends with a number greater than 2 then it's wrong and the inputted number is not registered
    //       ($event[0] == 1 && $event[1] > 2) ?
    //         gosmart($store, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY', undefined) :
    //         $event
    //     )
    // )
  },
  methods: {
    checkout: function(){
      let touch1 = this.getsmart(this.$v, 'state.app.entity.secrets.creditCards.mainCard.$touch', false)
      let touch2 = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.billing.$touch', false)
      if(typeof touch1 == 'function' &&
        typeof touch2 == 'function'
      ) {
        touch1()
        touch2()
        if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && !this.getsmart(this.$v, 'state.app.entity.secrets.creditCards.mainCard.$error', false)){
          this.setsmart(this.$store, 'state.app.paymentProcessing', true)
          let order = {
            uuid: this.$uuid.v4(),
            metadata: {
              names: ['growlights.com.au customer payment event'],
              session: this.getsmart(this.$store, 'state.app.uuid', this.$uuid.v4())
            },
            cart: this.getsmart(this.$store, 'state.app.entity.carts.0', undefined),
            payment: this.getsmart(this.$store, 'state.app.entity.secrets', undefined),
          }
          this.$native.setTimeout(()=>{
            this.$axios(
              {
                method: 'POST',
                url: this.getsmart(this.$store, 'state.app.$env.apiUrl', undefined)+'/monk/put',
                data: {
                  model: 'growlights/orders',
                  thing: order
                }
              }
            ).then((res)=>{
              this.setsmart(this.$store, 'state.app.paymentReceipt', order.uuid)
              this.setsmart(this.$store, 'state.app.paymentProcessing', false)
              this.setsmart(this.$store, 'state.app.paymentDialog', true)
              this.setsmart(this.$store, 'state.app.entity.alopu.orders.'+order.uuid, this.dupe(order))
              this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.products', [])
              this.$router.push('/home')
            })
            .catch(err=>{
              console.error('something went wrong checking out, ', err)
            })
          },1000)
        }
      }
    }
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
  },
  props: {
  },
  components: {
    cart: require('src/components/cart').default,
    banner: require('src/components/banner').default,
    manifest: require('src/components/manifest').default,
  },
  computed: {
    test: {
      get(){
        return this.things.test
      },
      set(val){
        this.things.test = val
      }
    }
  },
  watch: {
    '$route.path'(){
      this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.currentStage', this.$route.path)
      if(this.$route.path !== '/checkout/customer_information'){
        let shippingAddressForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
        let usernameForm = this.getsmart(this.$v, 'state.app.entity.alopu.username.$touch', false)
        if(typeof shippingAddressForm == 'function' && typeof usernameForm == 'function') {
          shippingAddressForm()
          usernameForm()
          if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !this.getsmart(this.$v, 'state.app.entity.alopu.username.$error', false)){
            this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
            // validate shippingMethod stage
            if(this.$route.path !== 'shipping_method'){
              let shippingMethodForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$touch', false)
              if(typeof shippingMethodForm == 'function') {
                shippingMethodForm()
                if(this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false)){
                  this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'valid')
                  this.$router.push('/checkout/shipping_method')
                } else {
                  this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'invalid')
                }
              }
            }
          } else {
            this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
            this.$router.push('/checkout/customer_information')
          }
        } else {
          this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
          this.$router.push('/checkout/customer_information')
        }
      }
    },
    '$store.state.app.entity.alopu.carts.0.products'(){
      if(this.getsmart(this.$store, 'state.app.entity.alopu.carts.0.products.length', 0) < 1){
        this.$router.push('/cart')
      }
    },
    '$store.state.app.entity.alopu.loggedIn': {
      handler: function(){
        if(this.$route.path !== '/checkout/customer_information'){
          let shippingAddressForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
          let usernameForm = this.getsmart(this.$v, 'state.app.entity.alopu.username.$touch', false)
          if(typeof shippingAddressForm == 'function' && typeof usernameForm == 'function') {
            shippingAddressForm()
            usernameForm()
            if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !this.getsmart(this.$v, 'state.app.entity.alopu.username.$error', false)){
              this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
              // validate shippingMethod stage
              if(this.$route.path !== 'shipping_method'){
                let shippingMethodForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$touch', false)
                if(typeof shippingMethodForm == 'function') {
                  shippingMethodForm()
                  if(this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false)){
                    this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'valid')
                    this.$router.push('/checkout/shipping_method')
                  } else {
                    this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'invalid')
                  }
                }
              }
            } else {
              this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
              this.$router.push('/checkout/customer_information')
            }
          } else {
            this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
            this.$router.push('/checkout/customer_information')
          }
        }
      },
      deep: true
    },
    // '$store.state.app.entity.alopu.carts.0'(){
    //   if(this.$route.path !== '/checkout/customer_information'){
    //     let shippingAddressForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
    //     let usernameForm = this.getsmart(this.$v, 'state.app.entity.alopu.username.$touch', false)
    //     if(typeof shippingAddressForm == 'function' && typeof usernameForm == 'function') {
    //       shippingAddressForm()
    //       usernameForm()
    //       if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !this.getsmart(this.$v, 'state.app.entity.alopu.username.$error', false)){
    //         this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
    //         // validate shippingMethod stage
    //         if(this.$route.path !== 'shipping_method'){
    //           let shippingMethodForm = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$touch', false)
    //           if(typeof shippingMethodForm == 'function') {
    //             shippingMethodForm()
    //             if(this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.shippingMethod.cost.$error', false)){
    //               this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'valid')
    //               this.$router.push('/checkout/shipping_method')
    //             } else {
    //               this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shippingMethod', 'invalid')
    //             }
    //           }
    //         }
    //       } else {
    //         this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
    //         this.$router.push('/checkout/customer_information')
    //       }
    //     } else {
    //       this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
    //       this.$router.push('/checkout/customer_information')
    //     }
    //   }
    //   if(this.getsmart(this.$store, 'state.app.entity.alopu.carts.0.products.length', 0) < 1){
    //     this.$router.push('/cart')
    //   }
    // },
    // '$store.state.entity': function(){
    //   this.entity = this.$store.state.entity
    // },
  },
  route: {
    canActivate(){
      return true
    }
  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.checkout-container
  width: 100%
  max-width: 100%
  overflow: hidden
  padding-bottom: 20px
  .checkout
    .checkout-section
      display: flex
      flex-direction: row
      width: 100%
      justify-content: center
      .user-section
        width: 50%
        max-width: 100%
        width: 700px
        @media(min-width: $breakpoint-sm)
          width: auto
        padding-bottom: 200px
        order: 1
        @media(max-width: $breakpoint-sm)
          width: 100%
          padding-bottom: 0px
      .cart-section
        order: 2
        max-width: 100%
        width: 100%
        @media(min-width: $breakpoint-sm)
          width: 450px
        padding-bottom: 200px
        // padding-top: 50px
        // max-height: 90vh
        display: flex
        // background: darken($white, 5)
        border-left: 1px solid darken($white, 10)
        display: flex
        flex-direction: column
        .show-order-summary-section
          display: flex
          flex-direction: row
        @media(max-width: $breakpoint-sm)
          border-left: 0px
          padding-bottom: 0px
      .breadcrumbs
        font-size: 13px
        display: flex
        align-items: center
        justify-content: flex-start
        flex-wrap: wrap
        .breadcrumb-container
        .breadcrumb
          text-transform: capitalize
          white-space: nowrap
          &.active
            font-weight: 700
        .separator
          color: $green
        .q-breadcrumbs-separator
          font-size: 13px !important
      .active-subsection
        .customer-information
          display: flex
          flex-direction: column
        .header
          display: flex
          align-items: flex-start
          justify-content: flex-start
          .account-message
            margin-left: auto
            font-size: 14px
            color: $friendly
          .login-btn
            padding-left: 4px
          @media(max-width: $breakpoint-md)
            flex-direction: column
            .account-message
              padding-top: 4px
              margin-left: 0px
        .card-icons
          display: flex
          align-items: center
          justify-content: center
          flex-grow: 0
          flex-shrink: 0
          .card-icon
        .credit-card-form
          background: $lightGrey
      .q-tooltip
        word-wrap: wrap
        max-width: 80px !important
      @media(max-width: $breakpoint-sm)
        flex-direction: column
        .user-section
          order: 2
        .cart-section
          order: 1
    .address-parsed
</style>
