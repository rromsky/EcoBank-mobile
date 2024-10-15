import { StyleSheet } from 'react-native'
import { windowWidth } from 'shared/types'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    position: 'absolute',
    left: 24,
    bottom: 0,
    gap: 22,
  },
  title: {
    fontSize: 24,
    fontFamily: 'CeraPro-Bold',
    lineHeight: 32,
  },
  text: {
    color: theme.gray,
    fontFamily: 'CeraPro-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    fontFamily: 'CeraPro-Bold',
    color: theme.green,
    textDecorationLine: 'underline',
  },
  loginText: {
    fontSize: 14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    width: windowWidth,
    flexWrap: 'wrap',
    marginLeft: -24,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  textContainer: {
    textAlign: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
})
