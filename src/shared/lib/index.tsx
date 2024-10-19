import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import {
  confirmPlatformPayPayment,
  initPaymentSheet,
  PlatformPay,
  presentPaymentSheet,
} from '@stripe/stripe-react-native'
import Toast from 'react-native-toast-message'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { it } from '@jest/globals'

type responseType = {
  data?: any
  error?: FetchBaseQueryError | SerializedError
}
export const createPayment = async ({
  userID,
  ids,
  items,
  amount,
  createPaymentIntent,
}: {
  userID: string
  ids?: string[]
  amount: number
  items: ItemType[]
  createPaymentIntent: any
}): Promise<string> => {
  const response: responseType = await createPaymentIntent({
    userID,
    amount,
    ids,
    items,
  })
  if (response.error) {
    throw new Error('CREATE-PAYMENT-INTENT-ERROR')
  }
  return response.data.clientSecret
}

export const confirmPlatformIntent = async ({
  intent,
  totalPrice,
  items,
}: {
  intent: string
  items: ItemType[]
  totalPrice?: number
}) => {
  const { error } = await confirmPlatformPayPayment(intent, {
    applePay: {
      cartItems: [
        ...items.map((item) => {
          return {
            label: item.title,
            amount: `${item.price} UAH`,
            paymentType: PlatformPay.PaymentType.Immediate as any,
          }
        }),
        {
          label: 'Сервісний збір',
          amount: '5 UAH',
          paymentType: PlatformPay.PaymentType.Immediate,
        },
        {
          label: 'Разом',
          amount: `${totalPrice} UAH`,
          paymentType: PlatformPay.PaymentType.Immediate,
        },
      ],
      merchantCountryCode: 'UA',
      currencyCode: 'UAH',
      requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
    },
    googlePay: {
      testEnv: true,
      merchantName: 'ecoinvest',
      merchantCountryCode: 'UA',
      currencyCode: 'UAH',
      billingAddressConfig: {
        format: PlatformPay.BillingAddressFormat.Full,
        isPhoneNumberRequired: true,
        isRequired: true,
      },
    },
  })
  console.log(error)
  return error
}

export const initPlatformPayment = async ({
  userID,
  totalPrice,
  ids,
  createPaymentIntent,
  items,
}: {
  userID: string
  totalPrice: number
  ids?: string[]
  createPaymentIntent: any
  items: ItemType[]
}) => {
  const intent = await createPayment({ userID, ids, items, amount: totalPrice, createPaymentIntent })
  return await confirmPlatformIntent({ intent, totalPrice, items })
}
export const confirmCardIntent = async ({ intent }: { intent: string }) => {
  const initResponse = await initPaymentSheet({
    merchantDisplayName: 'EcoInvest',
    paymentIntentClientSecret: intent,
    returnURL: 'com.ecoinvest.app://',
  })
  if (initResponse.error) throw new Error('INIT-RESPONSE-PAYMENT-ERROR')
  const paymentResponse = await presentPaymentSheet()
  if (paymentResponse.error) throw new Error('PAYMENT-RESPONSE-ERROR')
}

export const initCardPayment = async ({
  userID,
  amount,
  createPaymentIntent,
  items,
}: {
  userID: string
  amount: number
  createPaymentIntent: any
  items: ItemType[]
}) => {
  const intent = await createPayment({ userID, amount, createPaymentIntent, items })

  return await confirmCardIntent({ intent })
}
