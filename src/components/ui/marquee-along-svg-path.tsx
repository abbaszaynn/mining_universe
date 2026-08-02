import React, { RefObject, useCallback, useEffect, useId, useRef } from "react"
import {
  motion,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax"

interface CSSVariableInterpolation {
  property: string
  from: number | string
  to: number | string
}

type PreserveAspectRatioMeetOrSlice = "meet" | "slice"

type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`

interface MarqueeAlongSvgPathProps {
  children: React.ReactNode
  className?: string

  // Path properties
  path: string
  pathId?: string
  preserveAspectRatio?: PreserveAspectRatio
  showPath?: boolean

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string

  // Marquee properties
  baseVelocity?: number
  direction?: "normal" | "reverse"
  easing?: (value: number) => number
  slowdownOnHover?: boolean
  slowDownFactor?: number
  slowDownSpringConfig?: SpringOptions

  // Scroll properties
  useScrollVelocity?: boolean
  scrollAwareDirection?: boolean
  scrollSpringConfig?: SpringOptions
  scrollContainer?: RefObject<HTMLElement | null> | HTMLElement | null

  // Item repetition
  repeat?: number

  // Drag properties
  draggable?: boolean
  dragSensitivity?: number
  dragVelocityDecay?: number
  dragAwareDirection?: boolean
  grabCursor?: boolean

  // Z-index properties
  enableRollingZIndex?: boolean
  zIndexBase?: number
  zIndexRange?: number

  cssVariableInterpolation?: CSSVariableInterpolation[]

  // Responsive properties
  responsive?: boolean
}

const MarqueeItem = ({
  itemIndex,
  itemsLength,
  baseOffset,
  easing,
  calculateZIndex,
  cssVariableInterpolation,
  child,
  itemRefs,
  itemKey,
  draggable,
  grabCursor,
  path,
  enableRollingZIndex,
  repeatIndex,
  isHovered,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const itemOffset = useTransform(baseOffset, (v: number) => {
    const position = (itemIndex * 100) / itemsLength
    const wrappedValue = wrap(0, 100, v + position)
    return `${easing ? easing(wrappedValue / 100) * 100 : wrappedValue}%`
  })

  const currentOffsetDistance = useMotionValue(0)

  const zIndex = useTransform(currentOffsetDistance, (value: number) =>
    calculateZIndex(value)
  )

  useEffect(() => {
    const unsubscribe = itemOffset.on("change", (value: string) => {
      const match = value.match(/^([\d.]+)%$/)
      if (match && match[1]) {
        currentOffsetDistance.set(parseFloat(match[1]))
      }
    })
    return unsubscribe
  }, [itemOffset, currentOffsetDistance])

  const cssVariables = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cssVariableInterpolation || []).map(({ property, from, to }: any) => [
      property,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTransform(currentOffsetDistance, [0, 100], [from, to]),
    ])
  )

  return (
    <motion.div
      ref={(el) => {
        if (el) itemRefs.current.set(itemKey, el)
      }}
      className={cn(
        "absolute top-0 left-0",
        draggable && grabCursor && "cursor-grab"
      )}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        zIndex: enableRollingZIndex ? zIndex : undefined,
        willChange: "offset-distance",
        backfaceVisibility: "hidden",
        ...cssVariables,
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {child}
    </motion.div>
  )
}

const MarqueeAlongSvgPath = ({
  children,
  className,

  // Path defaults
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",

  // Marquee defaults
  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,

  // Scroll defaults
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  // Items repetition
  repeat = 3,

  draggable = false,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  // Z-index defaults
  enableRollingZIndex = true,
  zIndexBase = 1, // Base z-index value
  zIndexRange = 10, // Range of z-index values to use

  cssVariableInterpolation = [],

  // Responsive defaults
  responsive = false,
}: MarqueeAlongSvgPathProps) => {
  const container = useRef<HTMLDivElement>(null)
  const marqueeContainerRef = useRef<HTMLDivElement>(null)
  const baseOffset = useMotionValue(0)

  const pathRef = useRef<SVGPathElement>(null)

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Responsive scaling using direct DOM manipulation (no re-renders)
  useEffect(() => {
    if (!responsive) return

    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)
    const originalWidth = vbWidth || 100
    const originalHeight = vbHeight || 100

    const updateScale = () => {
      const wrapper = container.current
      const marqueeContainer = marqueeContainerRef.current
      if (!wrapper || !marqueeContainer) return

      const wrapperWidth = wrapper.clientWidth
      const wrapperHeight = wrapper.clientHeight

      const scaleX = wrapperWidth / originalWidth
      const scaleY = wrapperHeight / originalHeight
      const scale = Math.min(scaleX, scaleY)

      // Calculate the scaled dimensions
      const scaledWidth = originalWidth * scale
      const scaledHeight = originalHeight * scale

      // Center the marquee container within the wrapper
      const offsetX = (wrapperWidth - scaledWidth) / 2
      const offsetY = (wrapperHeight - scaledHeight) / 2

      // Set fixed dimensions on the container
      marqueeContainer.style.width = `${originalWidth}px`
      marqueeContainer.style.height = `${originalHeight}px`

      // Apply scale and position to center
      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      marqueeContainer.style.transformOrigin = "top left"
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [responsive, viewBox])

  // Create an array of items outside of the render function
  const items = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children)

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex
        const key = `${childIndex}-${repeatIndex}`
        return {
          child,
          childIndex,
          repeatIndex,
          itemIndex,
          key,
        }
      })
    )
  }, [children, repeat])

  // Function to calculate z-index based on offset distance
  const calculateZIndex = useCallback(
    (offsetDistance: number) => {
      if (!enableRollingZIndex) {
        return undefined
      }

      // Simple progress-based z-index
      const normalizedDistance = offsetDistance / 100
      return Math.floor(zIndexBase + normalizedDistance * zIndexRange)
    },
    [enableRollingZIndex, zIndexBase, zIndexRange]
  )

  // Stable across server and client render. Math.random() here produced a
  // different id on each, which React reported as a hydration mismatch.
  const reactId = useId()
  const id = pathId || `marquee-path-${reactId.replace(/:/g, "")}`

  // Scroll tracking
  const { scrollY } = useScroll({
    container: (scrollContainer as RefObject<HTMLDivElement | null>) || container,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  // Hover and drag state tracking
  const isHovered = useRef(false)
  const isDragging = useRef(false)
  const dragVelocity = useRef(0)

  // Direction factor for changing direction based on scroll or drag
  const directionFactor = useRef(direction === "normal" ? 1 : -1)

  // Motion values for animation
  const hoverFactorValue = useMotionValue(1)

  // Animation loop
  useAnimationFrame((t, delta) => {
    // 1. Determine base speed based on direction
    const defaultSpeed = baseVelocity * (direction === "normal" ? 1 : -1)

    // 2. Adjust speed based on hover
    if (slowdownOnHover) {
      const targetHoverFactor = isHovered.current && !isDragging.current ? slowDownFactor : 1
      // Smoothly animate to the target hover factor
      hoverFactorValue.set(
        hoverFactorValue.get() + (targetHoverFactor - hoverFactorValue.get()) * 0.1
      )
    }

    // 3. Adjust speed based on scroll
    let scrollSpeed = 0
    if (useScrollVelocity) {
      const currentVelocity = smoothVelocity.get()
      if (scrollAwareDirection && currentVelocity !== 0) {
        directionFactor.current = currentVelocity > 0 ? 1 : -1
      }
      scrollSpeed = currentVelocity * 0.05 // Tune this multiplier as needed
    }

    // 4. Adjust speed based on drag
    let currentDragVelocity = 0
    if (draggable) {
      if (isDragging.current) {
        // While dragging, animation is paused (velocity = 0)
        dragVelocity.current = 0
      } else {
        // Apply decay to drag velocity for momentum effect
        dragVelocity.current *= dragVelocityDecay
        currentDragVelocity = dragVelocity.current

        if (dragAwareDirection && Math.abs(currentDragVelocity) > 0.1) {
          directionFactor.current = currentDragVelocity > 0 ? 1 : -1
        }
      }
    }

    // Calculate final velocity
    // When dragging, pause normal animation. When releasing, add momentum.
    let finalVelocity = 0
    if (!isDragging.current) {
      finalVelocity =
        defaultSpeed * hoverFactorValue.get() + scrollSpeed + currentDragVelocity

      // If we are aware of direction changes (from scroll or drag),
      // we might want to ensure the base velocity respects it.
      if (scrollAwareDirection || dragAwareDirection) {
        // Override the sign of defaultSpeed if directionFactor changed it
        finalVelocity =
          Math.abs(defaultSpeed * hoverFactorValue.get()) * directionFactor.current +
          scrollSpeed +
          currentDragVelocity
      }
    } else {
      // While dragging, we only move via the drag event itself (handled in onPan),
      // but we need to keep the loop running without adding automatic velocity.
      finalVelocity = 0
    }

    // Convert velocity to offset delta.
    // 1000 is a scaling factor to make baseVelocity values reasonable.
    const deltaOffset = (finalVelocity * delta) / 1000

    // Update the base offset
    baseOffset.set(baseOffset.get() + deltaOffset)
  })


  return (
    <div
      ref={container}
      className={cn("relative w-full h-full overflow-hidden", className)}
    >
      <div
        ref={marqueeContainerRef}
        className="relative"
        style={{ contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? "currentColor" : "none"}
            fill="none"
            ref={pathRef}
          />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <MarqueeItem
            key={key}
            itemKey={key}
            child={child}
            repeatIndex={repeatIndex}
            itemIndex={itemIndex}
            itemsLength={items.length}
            baseOffset={baseOffset}
            easing={easing}
            calculateZIndex={calculateZIndex}
            cssVariableInterpolation={cssVariableInterpolation}
            itemRefs={itemRefs}
            draggable={draggable}
            grabCursor={grabCursor}
            path={path}
            enableRollingZIndex={enableRollingZIndex}
            isHovered={isHovered}
          />
        ))}
      </div>
    </div>
  )
}

export default MarqueeAlongSvgPath
