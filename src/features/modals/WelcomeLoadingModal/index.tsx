import React, { useCallback, useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { AnimatePresence, MotiView } from 'moti'
import { Image, Text } from 'react-native'
import { wait } from 'shared/types'
import { MotiContentWrapperParams, MotiRootWrapperParams } from 'src/features/modals/WelcomeLoadingModal/constants.ts'

import Logo from 'assets/logo.png'
import ClearSplash from 'assets/splash-clear.png'

import styles from './styles'

export default function WelcomeLoadingComponent() {
  const [isWelcomeShow, setWelcomeShow] = useState(true)

  const closeLoading = useCallback(() => {
    setWelcomeShow(false)
  }, [])

  useEffect(() => {
    wait(10).then(() => SplashScreen.hide())
    wait(1400).then(closeLoading)
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      {isWelcomeShow && (
        <MotiView key={'root-loading-wrapper'} {...(MotiRootWrapperParams as any)}>
          <MotiView key={'content-loading-wrapper'} {...(MotiContentWrapperParams as any)}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>
              EcoBank {'\n'}
              <Text style={styles.subTitle}>Investment</Text>
            </Text>
          </MotiView>
          <Image source={ClearSplash} style={styles.background} />
        </MotiView>
      )}
    </AnimatePresence>
  )
}
