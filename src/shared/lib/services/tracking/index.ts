import { setUserId, getAnalytics, logEvent, initializeAnalytics } from '@firebase/analytics'

import { app } from '../../api/firebase'

const analytics = initializeAnalytics(app)

// const analytics = getAnalytics()

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  logEvent(analytics, eventName, params)
}

export const trackScreenChange = (screenName: string) => {
  trackEvent('page_view', { page_location: screenName })
}

export const trackSignUp = (step: string) => {
  trackEvent('sign_up', { step })
}
