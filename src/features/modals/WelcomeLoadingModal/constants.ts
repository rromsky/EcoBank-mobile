import styles from 'src/features/modals/WelcomeLoadingModal/styles.ts'

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
    duration: 1400,
  },
  style: styles.root,
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
    duration: 1400,
  },
  style: styles.contentWrapper,
}
