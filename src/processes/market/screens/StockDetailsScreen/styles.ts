import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from 'shared/types'
import { theme } from 'theme'

export default StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
  content: {
    marginTop: 64,
    marginBottom: 12,
    width: windowWidth,
    paddingBottom: 120,
    gap: 18,
  },
  contentContainer: {},
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
    width: windowWidth,
  },
  rating: {
    position: 'absolute',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 1,
    bottom: 20,
    left: 5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Manrope-Bold',
    color: theme.green,
    alignSelf: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achiveContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: theme.milk,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: 188,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 12,
  },
  smallItemStatus: {
    color: '#0f839d',
    fontSize: 16,
  },
  image: {
    minWidth: 170,
    minHeight: 170,
    width: windowWidth * 0.9,
    height: windowWidth * 0.85 < windowHeight * 0.45 ? windowWidth * 0.85 : windowHeight * 0.45,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
})
