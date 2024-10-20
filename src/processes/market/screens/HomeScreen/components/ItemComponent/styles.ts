import { StyleSheet } from 'react-native'
import { windowWidth } from 'shared/types'

export default StyleSheet.create({
  root: {
    borderRadius: 10,
    backgroundColor: '#fafafa',
    width: (windowWidth - 16 * 3) / 2,
    alignItems: 'center',
    padding: 4,
    paddingBottom: 14,
    justifyContent: 'center',
    gap: 8,
  },
  image: {
    width: (windowWidth - 24 * 3) / 2,
    height: (windowWidth - 32 * 3) / 2 / 1.5,
    borderRadius: 10,
  },
  content: {
    position: 'absolute',
    zIndex: 4,
    top: 5,
    left: 5,
    borderRadius: 50,
    overflow: 'hidden',
  },
  icon: {
    zIndex: 4,
    borderRadius: 50,
    padding: 4,
    backgroundColor: '#04b108',
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    color: '#141314',
    maxWidth: '85%',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Manrope-Regular',
    color: '#141314',
    maxWidth: '85%',
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    color: '#141314',
    fontFamily: 'Manrope-Bold',
  },
})
