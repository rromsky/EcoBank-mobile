import { View } from 'react-native'
import PhoneInput from './components/phoneNumberInput/lib/index'

type Props = {
  setFormattedValue: (prev: string) => void
  setValue: (prev: string) => void
  value: string
}

const PhoneNumberInput = ({ setFormattedValue, setValue, value }: Props) => {
  return (
    <View style={{ width: 330, alignItems: 'center', justifyContent: 'center' }}>
      <PhoneInput
        defaultValue={value}
        defaultCode='UA'
        layout='second'
        onChangeText={setValue}
        onChangeFormattedText={setFormattedValue}
        textInputProps={{ placeholderTextColor: '#999' }}
      />
    </View>
  )
}

export default PhoneNumberInput
