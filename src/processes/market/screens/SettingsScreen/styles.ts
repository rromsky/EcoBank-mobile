import { StyleSheet } from 'react-native'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 22,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 42,
    gap: 24,
  },
  title: {
    fontSize: 34,
    color: theme.base100,
    fontFamily: 'Manrope-Bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  logoutLabel: {
    fontSize: 20,
    color: theme.red,
    fontFamily: 'Manrope-SemiBold',
  },
})
