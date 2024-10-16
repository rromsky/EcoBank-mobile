import { StyleSheet } from 'react-native'
import { theme } from 'theme'

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
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
    alignSelf: 'center',
    fontSize: 28,
    fontFamily: 'CeraPro-Bold',
    color: theme.darkGreen,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'CeraPro-Regular',
    lineHeight: 20,
    color: theme.base70,
  },
  text: {
    color: theme.gray,
    fontFamily: 'CeraPro-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  link: {
    fontFamily: 'CeraPro-Bold',
    color: theme.green,
    textDecorationLine: 'underline',
  },
  icon: { position: 'absolute', right: 14 },
  inputContainer: { paddingVertical: 15, gap: 8 },
  bottomContainer: { gap: 16 },
  textInput: {
    borderBottomWidth: 0.5,
    paddingBottom: 14,
    width: '100%',
    fontFamily: 'Manrope-Bold',
  },
  hint: {
    fontSize: 10,
    fontFamily: 'Manrope-Regular',
    color: theme.gray,
  },
  warning: {
    color: theme.warning,
  },
})
