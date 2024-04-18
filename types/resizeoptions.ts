import type { EasingFunction, CubicBezierPoints } from '@vueuse/core'

const resize = useAppConfig().resize
export type SlideoverInitSize = keyof typeof resize.width.init
export type ResizeIconSize = keyof typeof resize.icon.size

export interface ResizeOptions {
  /**
   * The initial width of HDialogPanel
   */
  width?: SlideoverInitSize
  /**
   * see `@vueuse/core` useTransition()
   */
  duration?: number
  /**
   * see `@vueuse/core` useTransition()
   */
  transition?: EasingFunction | CubicBezierPoints
  /**
   * Screen aspect ratio:
   * determines the ratio to which the width
   * automatically snaps when adjusting,
   * aligning it to the full screen
   */
  percentage?: number
  /**
   * Custom icons
   */
  icon?: string | null
  /**
   * Adjust the size of custom icons
   */
  size?: ResizeIconSize
}

export interface RArguments {
  _width: number
  _duration: number
  _transition: EasingFunction | CubicBezierPoints
  _percentage: number
  _side: Ref<'left' | 'right'>
  transitionP: Ref<boolean>
}
