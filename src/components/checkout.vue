<template lang='pug'>
.checkout-container
  .checkout-positioner
    .checkout
      .banner-section
        banner(
          size="thin"
        )
      .checkout-section
        .user-section.q-pt-xxsm.q-pl-md.q-pr-md.q-pb-md
          .breadcrumbs(
            )
            router-link.breadcrumb(
              :class=`{
                active: $route.path == '/checkout/cart'
              }`
              to="/cart"
              ) cart
            .separator >
            router-link.breadcrumb(
              to="/checkout/customer_information"
              :class=`{
                active: $route.path == '/checkout/customer_information'
              }`
              ) customer information
            .separator >
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
            .separator >
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
            .customer-information.subsection.q-pr-xxxl(
              v-show="$route.path == '/checkout/customer_information'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm(
                v-show="gosmart($store, 'state.app.entity.registered.any', false)"
                )
                q-item.q-pl-md.q-pr-xmd.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ gosmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!gosmart($store, 'state.app.entity.registered.any', false)"
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

              .header.q-flex-row.q-pt-xxxxlg(
                v-show="!gosmart($store, 'state.app.entity.registered.any', false)"
                )
                .q-title-thin Contact Information
                .account-message(
                  v-if="!$store.getters.loggedIn"
                  ) Already have an account?
                  a.login-btn.text-black(
                    @click="setsmart($store, 'state.app.showLoginDialog', true)"
                  ) Log in
              form.q-pt-smd
                q-input.border-1.q-br-rd-sm.no-shadow(
                  v-show="!gosmart($store, 'state.app.entity.registered.any', false)"
                  label="Email"
                  filled
                  square
                  :value="gosmart($store, 'state.app.entity.alopu.username', undefined)"
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
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.first name', undefined)"
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
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.last name', undefined)"
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
                  :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.company', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.company', $event)"
                )
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="Address"
                  filled
                  square
                  :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.line1', undefined)"
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
                  :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', $event)"
                )
                q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                  label="City"
                  filled
                  square
                  :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.city', undefined)"
                  @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.city', $event)"
                  bottom-slots
                  :error=`
                    (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.city.$anyError', false))
                  `
                )
                  template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.city.$anyError', false)) ? 'This value is required' : true }}
                .input-row.q-mb-smd
                  q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-mr-xsm(
                    label="Country"
                    filled
                    square
                    :value=`
                        gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.country', undefined)
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
                    :options=`gosmart($store, 'state.app.geos.countries.strings',
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
                        gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.state', undefined)
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
                    :options=`gosmart($store, 'state.app.geos.countries.Australia.states',
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
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode', $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode.$anyError', false))
                    `
                    mask="####"
                  )
                    template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.shipping.postcode.$anyError', false)) ? 'This value is required' : true }}
              .q-flex-row.q-align-center.full-width.bottom-section.q-mt-xl
                router-link(
                  to="/cart"
                )
                  span.text-thick.q-mr-sm <
                  | Return to cart
                q-btn.continue-to-shipping.q-mr-no.q-ml-auto.text-initial.text-normal(
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
            .shipping-method.subsection.q-pr-xxxl(
              v-show="$route.path == '/checkout/shipping_method'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm
                q-item.q-pl-md.q-pr-xmd.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ gosmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!gosmart($store, 'state.app.entity.registered.any', false)"
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

                    ) {{ gosmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
                  q-item-section(
                    side
                    )
                    router-link(
                      to="/checkout/customer_information"
                    ).text-friendly Change

              .header.q-pt-xxxxlg.q-pb-xxmd
                .q-title-thin Shipping method

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
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.type', 'Free shipping')"
                      :val="'Free shipping'"
                      label="Free shipping"
                    )
                  q-item-section.q-ml-auto(
                    side
                  ) {{ gosmart($store, 'state.app.shippingMethods.Free shipping.cost', 'Free') }}
              // q-btn.full-width.q-pa-no.text-normal.text-no.q-border-1.q-round-border-md.q-flex-row.full-width(
              //   flat
              //   @click="setsmart($store, 'state.app.entity.alopu.carts.0.shippingMethod', { type: 'Express shipping', cost: '$20.00'})"
              //   :ripple='false'
              // )
              //   q-item.full-width.no-point.q-flex.q-justify-center.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm
              //     q-item-section.full-width(
              //       side
              //     )
              //       q-radio.full-width(
              //         :value="gosmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.type', 'Express shipping')"
              //         :val="'Express shipping'"
              //         label="Express shipping"
              //       )
              //     q-item-section.q-ml-auto(
              //       side
              //     ) {{ gosmart($store, 'state.app.shippingMethods.Express shipping.cost', '$20.00') }}
              .q-flex-row.q-align-center.full-width.bottom-section.q-mt-xl
                router-link(
                  to="/checkout/customer_information"
                )
                  span.text-thick.q-mr-sm <
                  | Return to customer information
                q-btn.continue-to-shipping.q-mr-no.q-ml-auto.text-initial.text-normal(
                  size="lg"
                  color="primary"
                  @click="$router.push('/checkout/payment_method')"
                ) Continue to payment method


            .payment-method.subsection.q-pr-xxxl(
                v-show="$route.path == '/checkout/payment_method'"
              )
              q-list.q-border-1.q-round-border-smd.q-mt-md.q-pt-xxxxsm.q-pb-xxxxsm
                q-item.q-pl-md.q-align-start.q-pb-xxsm.q-min-height-0
                  q-item-section.q-min-width-50.q-pr-no(
                    side
                    ) Contact
                  q-item-section.q-pl-lg(

                    ) {{ gosmart($store, 'state.app.entity.alopu.username', undefined) }}
                  q-item-section(
                    side
                    v-if="!gosmart($store, 'state.app.entity.registered.any', false)"
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

                    ) {{ gosmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
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
                    ) {{ gosmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.type', 'Shipping')}}
                  q-item-section.q-pl-lg.address-parsed(
                    side
                    ) {{ gosmart($store, 'state.app.entity.alopu.carts.0.shippingMethod.cost', 'Calculated at next step') }}
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
                q-item.q-border-1.q-round-border-md.q-borderb-round-no.q-flex-row.full-width.q-flex.q-justify-center.q-pa-no.q-pl-xxxxsm.q-pt-xxxsm.q-pb-xxxsm
                  q-item-section.full-width(
                    side
                  )
                    q-radio.full-width.text-dark(
                      :value="gosmart($store, `${uuid}.paymentTabs.active`, 'card payment tab')"
                      @input="setsmart($store, `${uuid}.paymentTabs.active`, 'card payment tab')"
                      :val="'card payment tab'"
                      label="Credit card"
                    ).text-normal.text-sm
                  q-item-section.q-ml-auto.q-flex-row.card-icons(
                    side
                  )
                    img.card-icon.q-mr-xxsm(src="/statics/visa-card-shopify-50.png")
                    img.card-icon(src="/statics/master-card-shopify-50.png")
                form.credit-card-form.q-pa-xmd.q-borderb-round-sm.q-border-1.q-bordert-0
                  q-input.border-1.q-br-rd-sm.no-shadow(
                    label="Card number"
                    filled
                    square
                    autocomplete="cc-number"
                    :value="gosmart($store, `state.app.entity.secrets.creditCards.mainCard.number`, undefined)"
                    @input="setsmart($store, `state.app.entity.secrets.creditCards.mainCard.number`, $event)"
                    bottom-slots
                    :error=`
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.required', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.numeric', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.minLength', false)) ||
                      (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.maxLength', false)) ||
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
                      | ( (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.number.$anyError', '')) ? "There's something wrong with this value" : '' )
                      | }}
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mt-smd(
                    label="Name on card"
                    filled
                    square
                    autocomplete="cc-name"
                    :value="gosmart($store, `state.app.entity.secrets.creditCards.mainCard.Name on card`, undefined)"
                    @input="setsmart($store, `state.app.entity.secrets.creditCards.mainCard.Name on card`, $event)"
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
                      :value="gosmart($store, `state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY`, undefined)"
                      @input="setsmart($store, `state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY`, $event)"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.required', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.minLength', false)) ||
                        (getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.maxLength', false)) ||
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
                        | ((getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false) && getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.Expiration date MM YYYY.$anyError', false)) ? "There's something wrong with this value" : '' )
                        | }}
                    q-item.q-align-center.q-input-6.q-pa-no.q-border-1.q-border-round-sm
                      q-item-section
                        q-input.no-shadow(
                          label="Security code"
                          filled
                          square
                          :value="gosmart($store, `state.app.entity.secrets.creditCards.mainCard.Security code`, undefined)"
                          @input="setsmart($store, `state.app.entity.secrets.creditCards.mainCard.Security code`, $event)"
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
                    'q-brb-rd-no': getsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Use a different billing address') == 'Use a different billing address'
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
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Use a different billing address')"
                    ).text-normal.text-sm
                form.credit-card-form.q-pa-xmd.q-border-1.q-bt-0.q-borderb-round-sm(
                  v-show="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address') == 'Use a different billing address'"
                )
                  .input-row
                    q-input.q-mb-smd.border-1.q-br-rd-sm.no-shadow.q-input-6.q-mr-xsm(
                      label="First name"
                      filled
                      square
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.first name', undefined)"
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
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.last name', undefined)"
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
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.company', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.company', $event)"
                  )
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="Address"
                    filled
                    square
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.line1', undefined)"
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
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', undefined)"
                    @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', $event)"
                  )
                  q-input.border-1.q-br-rd-sm.no-shadow.q-mb-smd(
                    label="City"
                    filled
                    square
                    :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.city', undefined)"
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
                          gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.country', undefined)
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
                      :options=`gosmart($store, 'state.app.geos.countries.strings',
                        [
                          "Australia"
                        ]
                      )`
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.country.$anyError', false)) ? 'This value is required' : true }}
                    q-select.border-1.q-br-rd-sm.no-shadow.q-input-4.q-ml-xsm.q-mr-xsm(
                      label="State"
                      filled
                      square
                      :value=`
                          gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.state', undefined)
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
                      :options=`gosmart($store, 'state.app.geos.countries.Australia.states',
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
                      :value="gosmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.postcode', undefined)"
                      @input="setsmart($store, 'state.app.entity.alopu.carts.0.addresses.billing.postcode', $event)"
                      bottom-slots
                      :error=`
                        (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.postcode.$anyError', false))
                      `
                      mask="####"
                    )
                      template(v-slot:error) {{ (getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.postcode.$anyError', false)) ? 'This value is required' : true }}
              .q-flex-row.q-align-center.full-width.bottom-section.q-mt-xl
                router-link(
                  to="/checkout/shipping_method"
                )
                  span.text-thick.q-mr-sm <
                  | Return to shipping method
                q-btn.continue-to-shipping.q-mr-no.q-ml-auto.text-initial.text-normal(
                  size="lg"
                  color="primary"
                  @click=`()=>{
                      let touch1 = getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$touch', false)
                      let touch2 = getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$touch', false)
                      if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                        touch1()
                        touch2()
                        if(!getsmart($v, 'state.app.entity.alopu.carts.0.addresses.billing.$error', false) && !getsmart($v, 'state.app.entity.secrets.creditCards.mainCard.$error', false)){
                          setsmart($store, 'state.app.paymentProcessing', true)
                          $native.setTimeout(()=>{
                            $axios(
                              {
                                method: 'POST',
                                url: getsmart($store, 'state.app.$env.apiUrl', undefined)+'/monk/put',
                                data: {
                                  thing: {
                                    uuid: $uuid.v4(),
                                    metadata: {
                                      names: ['growlights.com.au customer payment event'],
                                      session: gosmart($store, 'state.app.uuid', $uuid.v4())
                                    },
                                    entity: gosmart($store, 'state.app.entity', {})
                                  }
                                }
                              }
                            ).then((res)=>{
                              setsmart($store, 'state.app.paymentProcessing', false)
                              setsmart($store, 'state.app.paymentDialog', true)
                            })
                          },1000)
                        }
                      }
                    }
                  `
                ) Pay now
                  q-spinner.q-ml-md(
                    v-if=`gosmart($store, 'state.app.paymentProcessing', false)`
                    size=".7em"
                    :thickness='4'
                  )
                q-dialog(
                  persistent
                  :value=`gosmart($store, 'state.app.paymentDialog', false)`
                  )
                  // @input=`setsmart($store, 'state.app.paymentDialog', false)`
                  q-card.q-flex-column.q-justify-center
                    q-card-section.q-pb-xxxxsm(
                      v-if=`!gosmart($store, 'state.app.paymentProcessing', false)`
                    )
                      .text-sm Payment Successful
                    q-card-section.q-pt-xxxsm(
                      v-if=`gosmart($store, 'state.app.paymentReceipt', $uuid.v4())`
                    )
                      .text-xxsm.text-grey Receipt number:
                      .text-xxxsm.text-grey.text-uppercase {{ gosmart($store, 'state.app.paymentReceipt', $uuid.v4()) }}
                    q-card-section(
                      v-if=`gosmart($store, 'state.app.paymentProcessing', false)`
                    )
                      q-spinner(
                        size="5em"
                        :thickness='2'
                      )
                    q-card-section.q-justify-center(
                      v-if=`!gosmart($store, 'state.app.paymentProcessing', false) || true`
                    )
                      q-btn(
                        @click="setsmart($store, 'state.app.paymentDialog', false) ; setsmart($store, 'state.app.paymentProcessing', false)"
                      ) Close

        .cart-section
          cart(
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
                  },
                  'Name on card': {
                    required: v.required
                  },
                  'Expiration date MM YYYY': {
                    required: v.required,
                    minLength: v.minLength(6),
                    maxLength: v.maxLength(6),
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
      let touch1 = this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$touch', false)
      let touch2 = this.getsmart(this.$v, 'state.app.entity.alopu.username.$touch', false)
      if(typeof touch1 == 'function' && typeof touch2 == 'function') {
        touch1()
        touch2()
        if(!this.getsmart(this.$v, 'state.app.entity.alopu.carts.0.addresses.shipping.$error', false) && !this.getsmart(this.$v, 'state.app.entity.alopu.username.$error', false)){
          this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'valid')
        } else {
          this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
          this.$router.push('/checkout/customer_information')
        }
      } else {
        this.setsmart(this.$store, 'state.app.entity.alopu.carts.0.stages.shipping', 'invalid')
        this.$router.push('/checkout/customer_information')

      }

    }
    // if(this.count !== 0){
    //   this.getObjects({
    //     count: this.count,
    //     sort: 'alphabetical',
    //     sortDirection: 'ascending',
    //     id: this.uuid
    //   })
    // } else {
    //   this.objects = null
    // }
  },
  methods: {
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
    }
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
  .checkout
    .checkout-section
      display: flex
      flex-direction: row
      width: 100%
      justify-content: center
      .user-section
        width: 50%
        max-width: 700px
        padding-bottom: 200px
      .cart-section
        max-width: 450px
        width: 450px
        padding-bottom: 200px
        // padding-top: 50px
        // max-height: 90vh
        display: flex
        padding-left: 2%
        // background: darken($white, 5)
        border-left: 1px solid darken($white, 10)
      .breadcrumbs
        font-size: 13px
        display: flex
        align-items: center
        justify-content: flex-start
        .breadcrumb
          text-transform: capitalize
          &.active
            font-weight: 700
        .separator
          padding-left: 6px
          padding-right: 6px
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
    .address-parsed
</style>
