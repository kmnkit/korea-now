import { describe, it, expect, beforeEach } from 'vitest'
import {
  hasCompletedOnboarding,
  markOnboardingComplete,
  getOnboardingState,
  resetOnboarding,
  hasSkippedProfileSetup,
} from '../onboarding'

describe('onboarding utilities', () => {
  beforeEach(() => {
    // テスト前にlocalStorageをクリア
    localStorage.clear()
  })

  describe('hasCompletedOnboarding', () => {
    it('should return false when no data in localStorage', () => {
      expect(hasCompletedOnboarding()).toBe(false)
    })

    it('should return true when onboarding is completed', () => {
      markOnboardingComplete(false)
      expect(hasCompletedOnboarding()).toBe(true)
    })

    it('should return true when onboarding is completed with profile skipped', () => {
      markOnboardingComplete(true)
      expect(hasCompletedOnboarding()).toBe(true)
    })
  })

  describe('markOnboardingComplete', () => {
    it('should set hasCompletedOnboarding to true', () => {
      markOnboardingComplete(false)
      const state = getOnboardingState()
      expect(state?.hasCompletedOnboarding).toBe(true)
    })

    it('should set skippedProfileSetup to false when profile is not skipped', () => {
      markOnboardingComplete(false)
      const state = getOnboardingState()
      expect(state?.skippedProfileSetup).toBe(false)
      expect(state?.lastCompletedStep).toBe('profile-setup')
    })

    it('should set skippedProfileSetup to true when profile is skipped', () => {
      markOnboardingComplete(true)
      const state = getOnboardingState()
      expect(state?.skippedProfileSetup).toBe(true)
      expect(state?.lastCompletedStep).toBe('slides')
    })
  })

  describe('getOnboardingState', () => {
    it('should return null when no data in localStorage', () => {
      expect(getOnboardingState()).toBeNull()
    })

    it('should return state object when data exists', () => {
      markOnboardingComplete(false)
      const state = getOnboardingState()
      expect(state).toEqual({
        hasCompletedOnboarding: true,
        lastCompletedStep: 'profile-setup',
        skippedProfileSetup: false,
      })
    })
  })

  describe('resetOnboarding', () => {
    it('should clear onboarding data from localStorage', () => {
      markOnboardingComplete(false)
      expect(hasCompletedOnboarding()).toBe(true)

      resetOnboarding()
      expect(hasCompletedOnboarding()).toBe(false)
      expect(getOnboardingState()).toBeNull()
    })
  })

  describe('hasSkippedProfileSetup', () => {
    it('should return false when no data in localStorage', () => {
      expect(hasSkippedProfileSetup()).toBe(false)
    })

    it('should return false when profile setup was completed', () => {
      markOnboardingComplete(false)
      expect(hasSkippedProfileSetup()).toBe(false)
    })

    it('should return true when profile setup was skipped', () => {
      markOnboardingComplete(true)
      expect(hasSkippedProfileSetup()).toBe(true)
    })
  })
})
