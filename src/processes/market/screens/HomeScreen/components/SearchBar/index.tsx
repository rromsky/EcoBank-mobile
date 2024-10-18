import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { windowWidth } from 'shared/types'
import { LinearGradient } from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

export const SearchBar = ({
  searchString,
  onChangeText,
  searchBarGradientColors = ['#04b108', '#19b845'],
  borderColor = 'rgb(130,227,157)',
}) => {
  const { top } = useSafeAreaInsets()

  return (
    <View
      style={{
        width: windowWidth + 6,
        borderWidth: 3,
        marginLeft: -3,
        borderTopWidth: 0,
        borderColor: borderColor,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginBottom: 24,
      }}
    >
      <LinearGradient
        colors={searchBarGradientColors}
        style={{
          width: windowWidth + 3,
          marginLeft: -1.5,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          paddingTop: top + 32,
          paddingBottom: 48,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            gap: 14,
            borderRadius: 30,
          }}
        >
          <Icon name={'search'} size={28} color={'rgba(0,0,0,0.32)'} />
          <TextInput
            value={searchString}
            onChangeText={onChangeText}
            style={{
              width: windowWidth - 128,
              maxWidth: 512,
              borderRadius: 30,
              paddingVertical: 18,
              alignSelf: 'center',
              backgroundColor: '#fff',
              fontSize: 22,
            }}
            placeholder='Пошук'
            placeholderTextColor={'#ADADAD'}
          />
          <TouchableOpacity
            onPress={() => {
              //TODO: Navigate to filter screen or open Modal / Bottomsheet
            }}
          >
            <Icon name={'filter'} size={32} color={'rgba(0,0,0,0.32)'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}
