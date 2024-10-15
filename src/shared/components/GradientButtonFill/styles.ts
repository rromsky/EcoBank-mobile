import { StyleSheet } from 'react-native'
import { theme } from 'theme'

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'CeraPro-Black',
    letterSpacing: 0.3,
    fontSize: 14,
    color: theme.white,
  },
})
