import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { windowWidth } from 'shared/types'
import { LinearGradient } from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

interface Props {
  searchString: string
  onChangeText: (t: string) => void
  searchBarGradientColors?: string[]
  borderColor?: string
}

export const SearchBar = ({
  searchString,
  onChangeText,
  searchBarGradientColors = ['#04b108', '#19b845'],
  borderColor = 'rgb(130,227,157)',
}: Props) => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.root, { borderColor }]}>
      <LinearGradient colors={searchBarGradientColors} style={[styles.gradientContainer, { paddingTop: top + 32 }]}>
        <View style={styles.inputContainer}>
          <Icon name={'search'} size={28} color={'rgba(0,0,0,0.32)'} />
          <TextInput
            value={searchString}
            onChangeText={onChangeText}
            style={styles.textInput}
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
