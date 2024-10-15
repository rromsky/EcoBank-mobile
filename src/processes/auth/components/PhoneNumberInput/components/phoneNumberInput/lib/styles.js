import { StyleSheet, Dimensions } from 'react-native'
import { theme } from 'theme'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}
function hp(percentage) {
  const value = (percentage * viewportHeight) / 100
  return Math.round(value)
}
const styles = StyleSheet.create({
  container: {
    width: wp(85),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  flagButtonView: {
    width: wp(15),
    height: '100%',
    minWidth: 32,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagButtonExtraWidth: {
    width: wp(25),
    marginRight: 8,
    paddingLeft: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.green,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  dropDownImage: {
    height: 14,
    width: 12,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.green,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
    color: '#000000',
  },
  numberText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
})

export default styles
