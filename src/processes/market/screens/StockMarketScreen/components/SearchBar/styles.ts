import { StyleSheet } from 'react-native'
import { windowWidth } from 'shared/types'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    width: windowWidth + 6,
    borderWidth: 3,
    marginLeft: -3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    paddingHorizontal: 16,
    gap: 14,
    borderRadius: 16,
  },
  textInput: {
    width: windowWidth - 128,
    maxWidth: 512,
    borderRadius: 16,
    paddingVertical: 18,
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontSize: 22,
  },
  gradientContainer: {
    width: windowWidth + 3,
    marginLeft: -1.5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingBottom: 48,
  },
})
