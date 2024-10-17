import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from 'shared/types'
import { theme } from 'theme'

const IMAGE_WIDTH = windowWidth
const IMAGE_HEIGHT = windowHeight * 0.5

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FBF7F0',
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: IMAGE_HEIGHT,
    maxWidth: IMAGE_WIDTH,
    padding: 5,
    alignSelf: 'center',
    backgroundColor: '#FBF7F0',
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    color: '#141314',
    fontFamily: 'CeraPro-Bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 24,
  },
  description: {
    color: '#2D2D30',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Manrope-Regular',
  },
  bottomContent: {
    paddingVertical: 42,
  },
  footerLink: {
    fontFamily: 'CeraPro-Bold',
    textDecorationLine: 'underline',
    color: theme.green,
    fontSize: 14,
    lineHeight: 20,
  },
  gap: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
