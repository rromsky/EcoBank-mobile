import YoutubeIframe, { type PLAYER_STATES } from 'react-native-youtube-iframe'
import { useCallback, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'

export default function LearningScreen() {
  const [playing, setPlaying] = useState(false)

  const onStateChange = useCallback((state: PLAYER_STATES) => {
    if (state === 'ended') {
      setPlaying(false)
    }
  }, [])
  return (
    <SafeAreaView>
      <YoutubeIframe height={300} play={playing} videoId={'al_ihWqxK80'} onChangeState={onStateChange} />
      <Text style={{ fontSize: 12, alignSelf: 'center' }}>Всі відео переглянуто.</Text>
    </SafeAreaView>
  )
}
