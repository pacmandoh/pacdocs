// Shared & reuse the previous state and no new event listeners will be registered
// WindowSize
export const useSharedWindowSize = createSharedComposable(useWindowSize)
