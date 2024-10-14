import { AnimatePresence, MotiView } from 'moti'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text } from 'react-native'
import { wait } from 'shared/types'
import { MotiContentWrapperParams, MotiRootWrapperParams } from 'src/features/modals/WelcomeLoadingModal/constants.ts'

import Logo from 'assets/logo.png'
import ClearSplash from 'assets/splash-clear.png'

export default function WelcomeLoadingComponent() {
  const [isWelcomeShow, setWelcomeShow] = useState(true)

  const closeLoading = useCallback(() => {
    setWelcomeShow(false)
  }, [])

  useEffect(() => {
    wait(1200).then(closeLoading)
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      {isWelcomeShow && (
        <MotiView {...(MotiRootWrapperParams as any)}>
          <MotiView {...(MotiContentWrapperParams as any)}>
            <Image
              source={Logo}
              style={{
                width: 104,
                alignSelf: 'center',
                height: 104,
              }}
            />
            <Text
              style={{
                zIndex: 99,
                color: '#2056A4',
                fontFamily: 'Cera-Pro',
                fontSize: 48,
              }}
            >
              EcoBank {'\n'}
              <Text style={{ fontSize: 32 }}>Investment</Text>
            </Text>
          </MotiView>
          <Image
            source={ClearSplash}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        </MotiView>
      )}
    </AnimatePresence>
  )
}
