import React, { useEffect, useState } from 'react'
import { FlatList, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IOIcon from 'react-native-vector-icons/Ionicons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import { PlatformPay, PlatformPayButton } from '@stripe/stripe-react-native'
import { cartClean, useAppDispatch, useAppSelector } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { auth } from 'shared/lib/api'
import { useNavigationTyped } from 'shared/navigation'
import { Route } from 'src/app/types.ts'
import { useCreatePaymentIntentMutation } from 'shared/store/slices/apiSlice.ts'
import { CartItem } from './components/CartItem'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { initCardPayment, initPlatformPayment } from 'shared/lib'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'
import Toast from 'react-native-toast-message'
import { bound } from 'react-native-toast-message/lib/src/utils/number'

const CartScreen = () => {
  const total: number = useAppSelector((state) => state.cart.totalPrice)
  const items: ItemType[] = useAppSelector((state) => state.cart.items)
  const [isDefaultMethod, setMethodDefault] = useState(true)
  const userID = useAppSelector((state) => state.user.user.uid)
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigationTyped()
  const dispatch = useAppDispatch()

  const goToHome = () => {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate(Route.HomeScreen as never)
  }

  useEffect(() => {
    if (!items.length) goToHome()
  }, [items])

  const [createPaymentIntent] = useCreatePaymentIntentMutation()

  const initPayment = () => {
    setIsLoading(true)
    ;(isDefaultMethod
      ? initPlatformPayment({
          userID: userID,
          ids: items.map((el: ItemType) => el?.code),
          items,
          totalPrice: total + 5,
          createPaymentIntent,
        })
      : initCardPayment({
          userID: userID,
          amount: total + 5,
          createPaymentIntent,
          items,
        })
    )
      .then((e) => {
        if (e) {
          if (e?.code !== 'Canceled') Toast.show({ type: 'error', text1: 'Something went wrong. Try again!' })
          return
        }
        Toast.show({ text1: 'Оплата успішна', type: 'success', position: 'bottom' })
        dispatch(cartClean)
        goToHome()
      })
      .catch((e: any) => {
        if (e?.code !== 'Canceled') Toast.show({ type: 'error', text1: 'Something went wrong. Try again!' })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      {isLoading && <LoadingFullScreen />}
      <SafeAreaView style={{ flex: 1, margin: 24 }}>
        <FlatList style={{ paddingTop: 32 }} data={items} renderItem={(item) => <CartItem item={item.item} />} />
        <View
          style={{
            flexGrow: 0,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <GradientButtonFill
              pv={12}
              onPress={() => {
                goToHome()
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 4,
                  paddingTop: 4,
                }}
              >
                <Icon name={'plus-square-o'} color={'#fff'} size={24} />
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontFamily: 'CeraPro-Black',
                    letterSpacing: 0.3,
                    fontSize: 14,
                    color: '#FBF7F0',
                  }}
                >
                  ДОДАТИ ЩЕ
                </Text>
              </View>
            </GradientButtonFill>
            <View
              style={{
                marginTop: 12,
                backgroundColor: '#fff',
                width: '100%',
                gap: 12,
                borderRadius: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Manrope-Bold',
                    color: '#141314',
                    fontSize: 22,
                  }}
                >
                  Всього
                </Text>
                <Text
                  style={{
                    fontFamily: 'Manrope-Bold',
                    color: '#141314',
                    fontSize: 22,
                  }}
                >
                  {total},00 ₴
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      color: '#141314',
                      fontSize: 22,
                    }}
                  >
                    Сервісний збір
                  </Text>
                  <IOIcon name={'information-circle-outline'} style={{ marginLeft: 12 }} size={22} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    color: '#141314',
                    fontSize: 22,
                  }}
                >
                  {5},00 ₴
                </Text>
              </View>
            </View>
          </View>
          <View style={{}} />
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              gap: 14,
              paddingVertical: 28,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  color: '#141314',
                  fontSize: 22,
                }}
              >
                Разом
              </Text>
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  color: '#141314',
                  fontSize: 22,
                }}
              >
                {total + 5},00 ₴
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => setMethodDefault((prev) => !prev)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Fontisio name={'apple-pay'} size={29} />
                <View style={{ gap: 6 }}>
                  <Text>
                    {!isDefaultMethod ? 'Оплата карткою' : Platform.OS === 'ios' ? 'Apple pay' : 'Google pay'}
                  </Text>
                  <Text>Змінити</Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Manrope',
                  color: '#141314',
                  fontSize: 22,
                }}
              >
                {total + 5},00 ₴
              </Text>
            </View>
            {isDefaultMethod ? (
              <PlatformPayButton
                type={PlatformPay.ButtonType.Pay}
                onPress={initPayment}
                style={{
                  height: 48,
                  width: '100%',
                  padding: 0,
                }}
              />
            ) : (
              <GradientButtonFill onPress={initPayment}>Оплатити</GradientButtonFill>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default React.memo(CartScreen)
