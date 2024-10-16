import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from 'src/processes/auth/screens/LoginScreen/styles.ts'
import IoIcon from 'react-native-vector-icons/Ionicons'

type Props = {
  placeholder?: string
  description?: string
  onChangeText: (t: string) => void
  textContentType?: string
  isPassword?: boolean
  isValid?: boolean
  value?: string
}

export default function DetailInput({
  placeholder,
  description,
  onChangeText,
  textContentType = 'none',
  isPassword = false,
  isValid = true,
  value,
}: Props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.hint}>{description}</Text>
      <View>
        <TextInput
          value={value}
          placeholderTextColor={'#5b585b'}
          secureTextEntry={!isPasswordVisible && isPassword}
          textContentType={textContentType as any}
          style={[
            styles.textInput,
            {
              color: isValid ? '#232123FF' : '#F20909',
              borderBottomColor: isValid ? '#bdbdc4' : '#F20909',
            },
          ]}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        {isPassword && (
          <IoIcon
            onPress={() => setPasswordVisible((prevState) => !prevState)}
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  )
}
