import React, { useEffect, useState } from 'react'
import { FlatList, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IOIcon from 'react-native-vector-icons/Ionicons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import { PlatformPay, PlatformPayButton } from '@stripe/stripe-react-native'
import { cartClean, useAppDispatch, useAppSelector } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { useNavigationTyped } from 'shared/navigation'
import { Route } from 'src/app/types.ts'
import { useCreatePaymentIntentMutation } from 'shared/store/slices/apiSlice.ts'
import { CartItem } from './components/CartItem'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { initCardPayment, initPlatformPayment } from 'shared/lib'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'
import Toast from 'react-native-toast-message'

import styles from './styles'

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
        dispatch(cartClean())
        goToHome()
      })
      .catch((e: any) => {
        if (e?.code !== 'Canceled') Toast.show({ type: 'error', text1: 'Something went wrong. Try again!' })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <View style={styles.root}>
      {isLoading && <LoadingFullScreen />}
      <SafeAreaView style={styles.content}>
        <FlatList style={styles.list} data={items} renderItem={(item) => <CartItem item={item.item} />} />
        <View style={styles.payoutContent}>
          <View>
            <GradientButtonFill
              pv={12}
              onPress={() => {
                goToHome()
              }}
            >
              <View style={styles.addMoreButton}>
                <Icon name={'plus-square-o'} color={'#fff'} size={24} />
                <Text style={styles.addMoreLabel}>ДОДАТИ ЩЕ</Text>
              </View>
            </GradientButtonFill>
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.title}>Всього</Text>
                <Text style={styles.label}>{total},00 ₴</Text>
              </View>
              <View style={styles.totalRow}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Сервісний збір</Text>
                  <IOIcon name={'information-circle-outline'} style={{ marginLeft: 12 }} size={22} />
                </TouchableOpacity>
                <Text style={styles.smallLabel}>{5},00 ₴</Text>
              </View>
            </View>
          </View>
          <View />
          <View style={styles.bottomContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.label}>Разом</Text>
              <Text style={styles.label}>{total + 5},00 ₴</Text>
            </View>
            <View style={styles.totalRow}>
              <TouchableOpacity onPress={() => setMethodDefault((prev) => !prev)} style={styles.totalRow}>
                <Fontisio name={'apple-pay'} size={29} />
                <View style={{ gap: 6 }}>
                  <Text>
                    {!isDefaultMethod ? 'Оплата карткою' : Platform.OS === 'ios' ? 'Apple pay' : 'Google pay'}
                  </Text>
                  <Text>Змінити</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.smallLabel}>{total + 5},00 ₴</Text>
            </View>
            {isDefaultMethod ? (
              <PlatformPayButton
                type={PlatformPay.ButtonType.Pay}
                onPress={initPayment}
                style={styles.platformButton}
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
