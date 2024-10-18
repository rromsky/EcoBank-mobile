import { SafeAreaView } from 'moti'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { windowWidth } from 'shared/types'
import { theme } from 'theme'

export const itemFix = { itemVisiblePercentThreshold: 150 }

export const Dot = ({ color, size }: { color?: string; size?: number }) => {
  return (
    <View
      style={{
        width: size,
        marginHorizontal: 6,
        height: size,
        borderRadius: 50,
        backgroundColor: color,
      }}
    />
  )
}
export const Dots = ({ pages, currentPage }: { pages: any[]; currentPage: number }) => {
  const dotList = Array(pages.length).fill({ size: 14, color: '#d5d5d5' })
  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={dotList}
      renderItem={({ item, index }) => (
        <Dot size={item.size} color={index === currentPage ? theme.green : item.color} />
      )}
      horizontal
    />
  )
}
type paginationPropsType = {
  leftButtonText?: string
  rightButtonText?: string
  rightButtonIcon?: string
  onRightClick?: () => void
  onLeftClick?: () => void
  pages: any[]
  currentPage: number
  buttonsOff?: boolean
}
export const Pagination = ({
  leftButtonText,
  rightButtonText,
  rightButtonIcon,
  onRightClick,
  onLeftClick,
  pages,
  currentPage,
  buttonsOff = false,
}: paginationPropsType) => {
  return (
    <SafeAreaView
      style={{
        width: windowWidth,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        height: 64,
      }}
    >
      {!buttonsOff && (
        <TouchableOpacity
          style={{ maxWidth: windowWidth * 0.35, minWidth: 124, alignItems: 'center' }}
          onPress={onLeftClick}
        >
          <Text>{leftButtonText}</Text>
        </TouchableOpacity>
      )}
      <Dots pages={pages} currentPage={currentPage} />
      {!buttonsOff && (
        <TouchableOpacity
          style={{ maxWidth: windowWidth * 0.35, minWidth: 124, alignItems: 'center' }}
          onPress={onRightClick}
        >
          <Text>{rightButtonIcon ? <Icon name={rightButtonIcon} size={32} color={'#7d7'} /> : rightButtonText}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}
