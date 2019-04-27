<template lang='pug'>
  .checkout-container
    .checkout-positioner
      .checkout
        .banner-section
          banner(
            size="thin"
          )
        .checkout-section
          .user-section.q-pa-md
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
                to="/checkout/shipping_method"
                :class=`{
                  active: $route.path == '/checkout/shipping_method'
                }`
                ) shipping method
              .separator >
              router-link.breadcrumb(
                to="/checkout/payment_method"
                :class=`{
                  active: $route.path == '/checkout/payment_method'
                }`
                ) payment method
            .active-subsection.q-pt-md
              .customer-information.subsection.q-pr-xxxl(
                v-show="$route.path == '/checkout/customer_information'"
                )
                q-list.q-round-border-smd.q-mt-md.q-pr-sm.q-pl-sm.q-pt-xxxxsm.q-pb-xxxxsm(
                  v-show="gosmart($store, 'state.alopu.entity.registered.any', false)"
                  )
                  q-item.q-pl-sm.q-align-start.q-pb-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Contact
                    q-item-main.q-pl-lg(

                      ) {{ gosmart($store, 'state.alopu.entity.alopu.username', undefined) }}
                    q-item-side(
                      side="right"
                      v-if="!gosmart($store, 'state.alopu.entity.registered.any', false)"
                      )
                      router-link(
                        to="/checkout/customer_information"
                      ).text-friendly Change

                .header.q-flex-row.q-pt-xxxxlg(
                  v-show="!gosmart($store, 'state.alopu.entity.registered.any', false)"
                  )
                  .q-title-thin Contact Information
                  .account-message(
                    v-if="!$store.getters.loggedIn"
                    ) Already have an account?
                    a.login-btn.text-black(
                      @click="console.log('nice')"
                    ) Log in
                form.q-pt-smd
                  q-input.border-1.no-shadow(
                    v-show="!gosmart($store, 'state.alopu.entity.registered.any', false)"
                    float-label="Email"
                    inverted-light
                    color="white"
                    :value="gosmart($store, 'state.alopu.entity.alopu.username', undefined)"
                    @input="setsmart($store, 'state.alopu.entity.alopu.username', $event)"
                    :error="getsmart($v, 'state.alopu.entity.alopu.username.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.username.$error', false)"
                  )
                  .header.q-pt-xxxxlg
                    .q-title-thin Shipping address
                  .input-row.q-mt-smd
                    q-input.border-1.no-shadow.q-input-6.q-mr-xsm(
                      float-label="First name"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.first name', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.first name', $event)"
                      :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.first name.$error', false)"
                    )
                    q-input.border-1.no-shadow.q-input-6.q-ml-xsm(
                      float-label="Last name"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.last name', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.last name', $event)"
                      :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.last name.$error', false)"
                    )
                  q-input.border-1.no-shadow.q-mt-smd(
                    float-label="Company (optional)"
                    inverted-light
                    color="white"
                    :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.company', undefined)"
                    @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.company', $event)"
                  )
                  q-input.border-1.no-shadow.q-mt-smd(
                    float-label="Address"
                    inverted-light
                    color="white"
                    :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.line1', undefined)"
                    @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.line1', $event)"
                    :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.line1.$error', false)"
                  )
                  q-input.border-1.no-shadow.q-mt-smd(
                    float-label="Apartment, suite, etc. (optional)"
                    inverted-light
                    color="white"
                    :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', undefined)"
                    @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc', $event)"
                    :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.Apartment, suite, etc.$error', false)"
                  )
                  q-input.border-1.no-shadow.q-mt-smd(
                    float-label="City"
                    inverted-light
                    color="white"
                    :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.city', undefined)"
                    @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.city', $event)"
                    :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.city.$error', false)"
                  )
                  .input-row.q-mt-smd
                    q-select.border-1.no-shadow.q-input-4.q-mr-xsm(
                      float-label="Country/Region"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.country/region', 'Australia')"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.country/region', $event)"
                      :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.country/region.$error', false)"
                      :options=`[
                        {
                          label: "Australia",
                          value: "Australia",
                        }
                      ]`
                    )
                    q-select.border-1.no-shadow.q-input-4.q-ml-xsm.q-mr-xsm(
                      float-label="State"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.state', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.state', $event)"
                      :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.state.$error', false)"
                      :options=`[
                        {
                          label: "ACT",
                          value: "ACT",
                        },
                        {
                          label: "JBT",
                          value: "JBT",
                        },
                        {
                          label: "NSW",
                          value: "NSW",
                        },
                        {
                          label: "NT",
                          value: "NT",
                        },
                        {
                          label: "QLD",
                          value: "QLD",
                        },
                        {
                          label: "SA",
                          value: "SA",
                        },
                        {
                          label: "TAS",
                          value: "TAS",
                        },
                        {
                          label: "VIC",
                          value: "VIC",
                        },
                        {
                          label: "WA",
                          value: "WA",
                        },
                      ]`
                    )
                    q-input.border-1.no-shadow.q-input-4.q-ml-xsm(
                      float-label="Postcode"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.postcode', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.shipping.postcode', $event)"
                      :error="getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.postcode.$error', false)"
                    )
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
                      let touch1 = getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$touch', false)
                      let touch2 = getsmart($v, 'state.alopu.entity.alopu.username.$touch', false)
                      if(typeof touch1 == 'function' && typeof touch2 == 'function') {
                        touch1()
                        touch2()
                        if(!getsmart($v, 'state.alopu.entity.alopu.carts.0.addresses.shipping.$invalid', false) && !getsmart($v, 'state.alopu.entity.alopu.username.$invalid', false)){
                          $router.push('/checkout/shipping_method');
                        }
                      }
                    `
                  ) Continue to shipping method
              .shipping-method.subsection.q-pr-xxxl(
                v-show="$route.path == '/checkout/shipping_method'"
                )
                q-list.q-round-border-smd.q-mt-md.q-pr-sm.q-pl-sm.q-pt-xxxxsm.q-pb-xxxxsm
                  q-item.q-pl-sm.q-align-start.q-pb-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Contact
                    q-item-main.q-pl-lg(

                      ) {{ gosmart($store, 'state.alopu.entity.alopu.username', undefined) }}
                    q-item-side(
                      side="right"
                      v-if="!gosmart($store, 'state.alopu.entity.registered.any', false)"
                      )
                      router-link(
                        to="/checkout/customer_information"
                      ).text-friendly Change

                  q-item-separator.q-ml-xxsm.q-mr-xxsm.q-mt-xxxsm.q-mb-xxxsm
                  q-item.q-pl-sm.q-align-start.q-pt-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Ship to
                    q-item-main.q-pl-lg.address-parsed(

                      ) {{ gosmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
                    q-item-side(
                      side="right"
                      )
                      router-link(
                        to="/checkout/customer_information"
                      ).text-friendly Change

                .header.q-pt-xxxxlg
                  .q-title-thin Shipping method
                q-item.q-flex-row.full-width.q-pt-xxmd
                  q-item-side(
                    side="left"
                  )
                    q-radio.full-width(
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.shippingMethod', 'free shipping')"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.shippingMethod', 'free shipping')"
                      :val="'free shipping'"
                      label="Free shipping"
                    )
                  q-item-side.q-ml-auto(
                    side="right"
                  ) Free
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
                q-list.q-round-border-smd.q-mt-md.q-pr-sm.q-pl-sm.q-pt-xxxxsm.q-pb-xxxxsm
                  q-item.q-pl-sm.q-align-start.q-pb-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Contact
                    q-item-main.q-pl-lg(

                      ) {{ gosmart($store, 'state.alopu.entity.alopu.username', undefined) }}
                    q-item-side(
                      side="right"
                      v-if="!gosmart($store, 'state.alopu.entity.registered.any', false)"
                      )
                      router-link(
                        to="/checkout/customer_information"
                      ).text-friendly Change

                  q-item-separator.q-ml-xxsm.q-mr-xxsm.q-mt-xxxsm.q-mb-xxxsm
                  q-item.q-pl-sm.q-align-start.q-pt-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Ship to
                    q-item-main.q-pl-lg.address-parsed(

                      ) {{ gosmart($store, 'getters.addressBeautified', ()=>{})({which: 'shipping'}) }}
                    q-item-side(
                      side="right"
                      )
                      router-link(
                        to="/checkout/customer_information"
                      ).text-friendly Change
                  q-item-separator.q-ml-xxsm.q-mr-xxsm.q-mt-xxxsm.q-mb-xxxsm
                  q-item.q-pl-sm.q-align-start.q-pt-xxsm.q-min-height-0
                    q-item-side.q-min-width-60(
                      side="left"
                      ) Method
                    q-item-main.q-pl-lg.address-parsed(
                      ) {{ 'Free Shipping' }}
                    q-item-side(
                      side="right"
                      )
                      router-link(
                        to="/checkout/shipping_method"
                      ).text-friendly Change
                .header.q-pt-xxxxlg.q-flex-column
                  .q-title-thin Payment
                  .q-subtitle.text-thin.text-xsm.text-friendly.q-pt-xxsm All transactions are secure and encrypted.
                .payment-methods-section.q-mt-md
                  q-item.q-border-1.q-round-border-sm.q-borderb-round-no.q-flex-row.full-width.q-flex.q-justify-center.q-pt-smd.q-pb-smd
                    q-item-side(
                      side="left"
                    )
                      q-radio.full-width.text-dark(
                        :value="gosmart($store, `${uuid}.paymentTabs.active`, 'card payment tab')"
                        @input="setsmart($store, `${uuid}.paymentTabs.active`, 'card payment tab')"
                        :val="'card payment tab'"
                        label="Credit card"
                      ).text-normal.text-sm
                    q-item-side.q-ml-auto.card-icons(
                      side="right"
                    )
                      img.card-icon.q-mr-xxsm(src="/statics/visa-card-shopify-50.png")
                      img.card-icon(src="/statics/master-card-shopify-50.png")
                  form.credit-card-form.q-pa-xmd.q-borderb-round-sm
                    q-item.q-bg-white.q-pa-no.q-border-1.q-border-round-sm
                      q-item-main
                        q-input.no-shadow(
                          float-label="Card number"
                          inverted-light
                          color="white"
                          :value="gosmart($store, `state.alopu.entity.secrets.creditCards.mainCard.number`, undefined)"
                          @input="setsmart($store, `state.alopu.entity.secrets.creditCards.mainCard.number`, $event)"
                          :error="getsmart($v, `state.alopu.entity.secrets.creditCards.mainCard.number.$error`, true)"
                          maxlength="16"
                        )
                        // :error='true'
                      q-item-side.q-align-center
                        q-icon(
                          name="lock"
                        )
                    q-input.border-1.no-shadow.q-mt-smd(
                      float-label="Name on card"
                      inverted-light
                      color="white"
                      :value="gosmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Name on card`, undefined)"
                      @input="setsmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Name on card`, $event)"
                      :error="getsmart($v, 'state.alopu.entity.secrets.creditCards.mainCard.Name on card.$error', false)"
                    )
                    .input-row.q-mt-smd
                      q-input.border-1.no-shadow.q-input-6.q-mr-xsm(
                        float-label="Expiration date (MM / YY)"
                        inverted-light
                        color="white"
                        :value="gosmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Expiration date MM YY`, undefined)"
                        @input="setsmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Expiration date MM YY`, $event)"
                        :error="getsmart($v, 'state.alopu.entity.secrets.creditCards.mainCard.Expiration date MM YY.$error', false)"
                        maxlength="5"
                        mask="##/##"
                      )
                      q-item.q-align-center.q-input-6.q-bg-white.q-pa-no.q-border-1.q-border-round-sm
                        q-item-main
                          q-input.no-shadow.q-ml-xsm(
                            float-label="Security code"
                            inverted-light
                            color="white"
                            :value="gosmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Security code`, undefined)"
                            @input="setsmart($store, `state.alopu.entity.secrets.creditCards.mainCard.Security code`, $event)"
                            :error="getsmart($v, 'state.alopu.entity.secrets.creditCards.mainCard.Security code.$error', false)"
                            maxlength="3"
                          )
                          // getsmart($v, 'state.alopu.entity.secrets.creditCards.mainCard.$invalid', false) &&
                        q-item-side.q-align-center
                          q-icon(
                            name="help"
                          )
                            q-tooltip.ccv-tooltip(
                              :offset="[0, 10]"
                            ) 3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.

                .header.q-pt-xxxxlg
                  .q-title-thin Billing address
                .billing-address-section.q-bordera-round-sm.q-pt-md
                  q-item.q-border-1.q-round-border-sm.q-borderb-round-no.q-flex-row.full-width.q-pt-smd.q-pb-smd
                    q-item-side(
                      side="left"
                    )
                      q-radio.full-width.text-dark(
                        :val="'Same as shipping address'"
                        label="Same as shipping address"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address')"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address')"
                      ).text-normal.text-sm
                  q-item.q-border-1.q-bordert-0.q-round-border-sm.q-bordert-round-no.q-flex-row.full-width.q-pt-smd.q-pb-smd
                    q-item-side(
                      side="left"
                    )
                      // v-model="shippingForm['billing address type']"
                      q-radio.full-width.text-dark(
                        :val="'Use a different billing address'"
                        label="Use a different billing address"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.type', 'Use a different billing address')"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.type', 'Use a different billing address')"
                      ).text-normal.text-sm
                  form.credit-card-form.q-pa-xmd.q-borderb-round-sm(
                    v-show="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.type', 'Same as shipping address') == 'Use a different billing address'"
                  )
                    .input-row
                      q-input.border-1.no-shadow.q-input-6.q-mr-xsm(
                        float-label="First name"
                        inverted-light
                        color="white"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.first name', undefined)"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.first name', $event)"
                      )
                      q-input.border-1.no-shadow.q-input-6.q-ml-xsm(
                        float-label="Last name"
                        inverted-light
                        color="white"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.last name', undefined)"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.last name', $event)"
                      )
                    q-input.border-1.no-shadow.q-mt-smd(
                      float-label="Company (optional)"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.company', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.company', $event)"
                    )
                    q-input.border-1.no-shadow.q-mt-smd(
                      float-label="Address"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.line1', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.line1', $event)"
                    )
                    q-input.border-1.no-shadow.q-mt-smd(
                      float-label="Apartment, suite, etc. (optional)"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.Apartment, suite, etc', $event)"
                    )
                    q-input.border-1.no-shadow.q-mt-smd(
                      float-label="City"
                      inverted-light
                      color="white"
                      :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.city', undefined)"
                      @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.city', $event)"
                    )
                    .input-row.q-mt-smd
                      q-input.border-1.no-shadow.q-input-4.q-mr-xsm(
                        float-label="Country/Region"
                        inverted-light
                        color="white"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.country/region', 'Australia')"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.country/region', $event)"
                      )
                      q-input.border-1.no-shadow.q-input-4.q-ml-xsm.q-mr-xsm(
                        float-label="State"
                        inverted-light
                        color="white"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.state', undefined)"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.state', $event)"
                      )
                      q-input.border-1.no-shadow.q-input-4.q-ml-xsm(
                        float-label="Postcode"
                        inverted-light
                        color="white"
                        :value="gosmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.postcode', undefined)"
                        @input="setsmart($store, 'state.alopu.entity.alopu.carts.0.addresses.billing.postcode', $event)"
                      )

                .q-flex-row.q-align-center.full-width.bottom-section.q-mt-xl
                  router-link(
                    to="/checkout/shipping_method"
                  )
                    span.text-thick.q-mr-sm <
                    | Return to shipping method
                  q-btn.continue-to-shipping.q-mr-no.q-ml-auto.text-initial.text-normal(
                    size="lg"
                    color="primary"
                    @click=""
                  ) Pay now


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
      }
    }
  },
  validations: {
    state: {
      alopu: {
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
                'Expiration date MM YY': {
                  required: v.required,
                  minLength: v.minLength(5),
                  maxLength: v.maxLength(5),
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
                    "country/region": {
                      required: v.required
                    },
                    "state": {
                      required: v.required
                    },
                    "postcode": {
                      required: v.required
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
  },
  computed: {
  },
  watch: {
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
        /deep/ .q-breadcrumbs-separator
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
