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
  amount,
}: {
  intent: string
  items: ItemType[]
  totalPrice?: number
  amount: number
}) => {
  const { error } = await confirmPlatformPayPayment(intent, {
    applePay: {
      cartItems: items.map((item) => {
        return {
          label: item.title,
          amount: `${item.price} UAH`,
          paymentType: PlatformPay.PaymentType.Immediate,
        }
      }),
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
  try {
    const intent = await createPayment({ userID, ids, items, amount: totalPrice * 100, createPaymentIntent })
    const error = await confirmPlatformIntent({ intent, totalPrice, amount: totalPrice * 100, items })
    if (error) throw new Error('CONFIRM-PAYMENT-ERROR')
  } catch (e) {
    console.log(e)
    Toast.show({ type: 'error', text1: 'Something went wrong. Try again!' })
  }
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
  try {
    const intent = await createPayment({ userID, amount, createPaymentIntent, items })

    await confirmCardIntent({ intent })
  } catch (e) {
    Toast.show({ type: 'error', text1: 'Something went wrong. Try again!' })
  }
}
