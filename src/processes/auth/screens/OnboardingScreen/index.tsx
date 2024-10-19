import { View, Image, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'moti'
import { useCallback, useRef, useState } from 'react'
import { gatewaySetUserOnboarded } from 'shared/lib/api'
import { useAppDispatch, userUpdateOnboarding } from 'shared/store'
import { itemFix, Pagination } from 'src/processes/auth/screens/OnboardingScreen/components'
import { windowWidth } from 'shared/types'

import styles from '../styles'
import { goToHomeScreen } from 'shared/navigation/marketStack.ts'
import { useNavigationTyped } from 'shared/navigation'

const pages = [
  {
    header: 'Довіра',
    subHeader:
      'Ми будуємо прозорі та надійні інвестиційні рішення для вашої впевненості. Ваші кошти в надійних руках з Ecobank Investment.',
    image: 'https://i.ibb.co/jVNYVZL/Removebg-Preview-Oct-18.png',
  },
  {
    header: 'Захист',
    subHeader:
      'Безпека ваших фінансів та даних — наш головний пріоритет. Використовуємо сучасні технології для максимального захисту на кожному етапі.',
    image: 'https://i.ibb.co/K2JMNfT/Removebg-preview.png',
  },
  {
    header: 'Майбутнє',
    subHeader:
      'Відкрийте нові можливості для пасивного доходу. Розвивайтесь та навчайтесь з Дія Освіта, інвестуючи у своє майбутнє.',
    image: 'https://i.ibb.co/ysQWgPD/Remove-BG-Preview-1.png',
  },
]

export default function OnboardingScreen() {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(0)
  const flatList = useRef<FlatList>(null)

  const navigation = useNavigationTyped()

  const setOnboardedUser = () => {
    gatewaySetUserOnboarded()
    dispatch(userUpdateOnboarding())
    goToHomeScreen(navigation)
  }
  const onNextPage = () => {
    flatList.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    })
  }
  const onPreviousPage = () => {
    flatList.current?.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    })
  }
  const onSwipe = ({ viewableItems }: any) => {
    if (!viewableItems[0]) return
    setCurrentPage((prevState) => {
      if (prevState !== viewableItems[0]) return viewableItems[0].index
    })
  }

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={{ flex: 1, width: windowWidth, justifyContent: 'space-around' }}>
        <View style={{ alignSelf: 'center', alignItems: 'center', gap: 12 }}>
          <View style={{ borderRadius: 35 }}>
            <Image source={{ uri: item.image }} style={{ width: windowWidth, aspectRatio: 1 }} />
          </View>
          <Text style={[styles.title, { paddingHorizontal: 24 }]}>{item.header}</Text>
          <Text style={[styles.description, { paddingHorizontal: 24 }]}>{item.subHeader}</Text>
        </View>
      </View>
    )
  }, [])

  const onSwipeRef = useRef(onSwipe)
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onSwipeRef.current}
          initialNumToRender={1}
          viewabilityConfig={itemFix}
          data={pages}
          renderItem={renderItem}
        />
        <Pagination
          leftButtonText={currentPage ? 'Назад' : 'Пропустити'}
          rightButtonText={'Далі'}
          // @ts-ignore
          rightButtonIcon={currentPage === pages.length - 1 && 'check'}
          onLeftClick={!currentPage ? setOnboardedUser : onPreviousPage}
          onRightClick={currentPage === pages.length - 1 ? setOnboardedUser : onNextPage}
          currentPage={currentPage}
          pages={pages}
        />
      </SafeAreaView>
    </View>
  )
}
