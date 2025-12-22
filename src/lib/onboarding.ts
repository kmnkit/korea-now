/**
 * オンボーディング状態管理ユーティリティ
 */

export interface OnboardingState {
  hasCompletedOnboarding: boolean // オンボーディング完了フラグ
  lastCompletedStep: string // 最後に完了したステップ
  skippedProfileSetup: boolean // プロフィール設定をスキップしたか
}

const STORAGE_KEY = 'korea-now-onboarding'

/**
 * オンボーディングが完了しているかチェック
 */
export function hasCompletedOnboarding(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const state = localStorage.getItem(STORAGE_KEY)
    if (!state) return false
    const parsed: OnboardingState = JSON.parse(state)
    return parsed.hasCompletedOnboarding
  } catch (error) {
    console.error('Failed to check onboarding state:', error)
    return false
  }
}

/**
 * オンボーディング完了をマーク
 */
export function markOnboardingComplete(skippedProfile = false): void {
  if (typeof window === 'undefined') return

  try {
    const state: OnboardingState = {
      hasCompletedOnboarding: true,
      lastCompletedStep: skippedProfile ? 'slides' : 'profile-setup',
      skippedProfileSetup: skippedProfile,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to mark onboarding complete:', error)
  }
}

/**
 * オンボーディング状態を取得
 */
export function getOnboardingState(): OnboardingState | null {
  if (typeof window === 'undefined') return null

  try {
    const state = localStorage.getItem(STORAGE_KEY)
    if (!state) return null
    return JSON.parse(state)
  } catch (error) {
    console.error('Failed to get onboarding state:', error)
    return null
  }
}

/**
 * オンボーディング状態をリセット（開発・デバッグ用）
 */
export function resetOnboarding(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to reset onboarding:', error)
  }
}

/**
 * プロフィール設定をスキップしたかチェック
 */
export function hasSkippedProfileSetup(): boolean {
  const state = getOnboardingState()
  return state?.skippedProfileSetup ?? false
}
