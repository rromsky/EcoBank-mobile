import { StyleSheet } from 'react-native'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    padding: 12,
    paddingVertical: 18,
    alignItems: 'center',
    borderColor: theme.milk,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    justifyContent: 'center',
  },
})
