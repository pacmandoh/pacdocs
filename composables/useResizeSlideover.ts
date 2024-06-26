import type { WritableComputedRef } from 'vue'
import type { RArguments } from '~/types'

export const useResizeSlideover = (A: RArguments) => {
  const resize: {
    initWidth: number
    isResizing: boolean
    isClick: boolean
    newWidth: number | null
    _resizedWidth: number
  } = reactive({
    initWidth: A._width,
    isResizing: false,
    isClick: true,
    newWidth: null,
    _resizedWidth: A._width
  })
  const { width } = useSharedWindowSize()
  const isMagnetic: ComputedRef<boolean> = computed(() => {
    return resize.newWidth > width.value * (A._percentage)
  })

  const resizedWidth: WritableComputedRef<number> = computed({
    get: () => {
      if (resize._resizedWidth > width.value) {
        resize.initWidth = width.value
        return width.value
      }
      else {
        return resize._resizedWidth
      }
    },
    set: (value: number) => {
      if (!resize.isClick) {
        if (value > width.value) {
          value = width.value
          resize.initWidth = width.value
        }
        if (value <= A._width) {
          value = A._width
        }
        resize._resizedWidth = isMagnetic.value ? width.value : value
      }
      else {
        resize._resizedWidth = value
      }
    }
  })

  /**
   * see @vueuse/core useTransition()
   * https://vueuse.org/core/useTransition/#usetransition
   */
  const transition: ComputedRef<number> = useTransition(resizedWidth, {
    duration: A._duration,
    transition: A._transition,
    disabled: !A.transitionP.value
  })

  const rotateTarget: Ref<number> = ref(0)

  const styleWidth: ComputedRef<string> = computed(() => {
    return (isMagnetic.value || resize.isClick) && A.transitionP.value ? `${transition.value}px` : `${resizedWidth.value}px`
  })

  const handleResize = (e: MouseEvent) => {
    // Recording the initial position
    const initPosX: number = e.clientX

    /**
     * PointMove
     */
    const onDocumentPointerMove = (e: PointerEvent) => {
      /**
       * Employing two ref() to differentiate between
       * a click and a drag for the purpose of modification
       * might be excessively verbose
       */
      resize.isClick = false
      resize.isResizing = true

      /**
       * The direction of the arrow is determined based on
       * the initial mouse click position,
       * rather than the direction of mouse movement.
       */
      rotateTarget.value = -Math.sign(e.clientX - initPosX)

      resize.newWidth = A._side.value === 'left'
        ? resize.initWidth + (e.clientX - initPosX)
        : resize.initWidth - (e.clientX - initPosX)

      if (resize.newWidth >= width.value) return
      resizedWidth.value = resize.newWidth
    }
    const cleanupPointerMove = useEventListener('pointermove', onDocumentPointerMove)

    /**
     * PointUp
     */
    const onDocumentPointerUp = () => {
      resize.isResizing = false
      resize.initWidth = resizedWidth.value
      cleanupPointerMove()
      rotateTarget.value = 0
      useTimeoutFn(() => {
        resize.isClick = true
      }, A._duration)
    }
    useEventListener('pointerup', onDocumentPointerUp, { once: true })
  }

  /**
   * Click
   */
  const handleClick = () => {
    if (resize.isClick) {
      if (resizedWidth.value >= width.value / 2) {
        resizedWidth.value = resizedWidth.value === width.value ? A._width : width.value
      }
      else {
        resizedWidth.value = width.value / 2
      }
      resize.initWidth = resizedWidth.value
    }
  }

  return {
    handleClick,
    handleResize,
    styleWidth,
    rotateTarget,
    resize
  }
}
