import { HTMLProps } from "react"
import { MotionKeyframes } from "../dom/types"
import { AnimatedProps } from "./types"
import { useGestureState } from "./use-gesture-state"

export function usePress(
  target: MotionKeyframes,
  stylesToApply?: MotionKeyframes,
  { onPointerDown }: AnimatedProps & HTMLProps<any> = {}
): HTMLProps<any> {
  const setGestureState = useGestureState(target, stylesToApply)
  if (!stylesToApply) return {}

  const onPointerUp = () => {
    setGestureState(false)
    window.removeEventListener("pointerup", onPointerUp)
  }

  return {
    onPointerDown: (e) => {
      onPointerDown?.(e)
      setGestureState(true)
      window.addEventListener("pointerup", onPointerUp)
    },
  }
}
