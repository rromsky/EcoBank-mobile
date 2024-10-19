import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: { backgroundColor: '#ffffff', flex: 1 },
  content: { flex: 1, margin: 24 },
  list: { paddingTop: 32 },
  payoutContent: {
    flexGrow: 0,
    justifyContent: 'space-between',
  },
  addMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingTop: 4,
  },
  addMoreLabel: {
    textTransform: 'uppercase',
    fontFamily: 'CeraPro-Black',
    letterSpacing: 0.3,
    fontSize: 14,
    color: '#FBF7F0',
  },
  totalContainer: {
    marginTop: 12,
    backgroundColor: '#fff',
    width: '100%',
    gap: 12,
    borderRadius: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    color: '#141314',
    fontSize: 22,
  },
  label: {
    fontFamily: 'Manrope-Bold',
    color: '#141314',
    fontSize: 22,
  },
  smallLabel: {
    fontFamily: 'Manrope',
    color: '#141314',
    fontSize: 22,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    gap: 14,
    paddingVertical: 28,
  },
  platformButton: {
    height: 48,
    width: '100%',
    padding: 0,
  },
})
