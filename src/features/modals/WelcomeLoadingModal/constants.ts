import { windowHeight, windowWidth } from 'shared/types'

export const MotiRootWrapperParams = {
  from: {
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.2,
  },
  exitTransition: {
    type: 'timing',
    duration: 1000,
  },
  style: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    zIndex: 999,
    flex: 1,
  },
}

export const MotiContentWrapperParams = {
  from: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: 'timing',
    duration: 1000,
  },
  style: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}
