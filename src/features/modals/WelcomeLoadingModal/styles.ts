import { StyleSheet } from 'react-native'
import { theme } from 'theme'
import { windowHeight, windowWidth } from 'shared/types'

export default StyleSheet.create({
  logo: {
    width: 104,
    alignSelf: 'center',
    height: 104,
  },
  title: {
    zIndex: 4,
    color: theme.white,
    fontFamily: 'Cera-Pro',
    fontWeight: '600',
    fontSize: 48,
  },
  subTitle: {
    fontSize: 32,
    fontWeight: '500',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    zIndex: 999,
    flex: 1,
  },
})
