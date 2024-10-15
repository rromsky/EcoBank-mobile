import { StyleSheet } from 'react-native'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: {
    padding: 6,
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
  },
  gap: {
    gap: 40,
  },
  title: {
    fontSize: 34,
    fontFamily: 'CeraPro-Bold',
    lineHeight: 38,
    color: theme.darkGreen,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'CeraPro-Regular',
    lineHeight: 20,
    color: theme.base70,
  },
})
