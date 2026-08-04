import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARACTERS,
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click')

  const containerRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const directionRef = useRef('forward')
  const orderRef = useRef([])
  const pointerRef = useRef(0)
  const revealedRef = useRef(new Set())
  const iterationRef = useRef(0)

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
        : characters.split(''),
    [useOriginalCharsOnly, text, characters]
  )

  const shuffleText = useCallback(
    (original, revealed) =>
      original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (revealed.has(i)) return original[i]
          return availableChars[Math.floor(Math.random() * availableChars.length)]
        })
        .join(''),
    [availableChars]
  )

  const computeOrder = useCallback(
    len => {
      const order = []
      if (len <= 0) return order
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i)
        return order
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i)
        return order
      }
      const middle = Math.floor(len / 2)
      let offset = 0
      while (order.length < len) {
        const idx = offset % 2 === 0 ? middle + offset / 2 : middle - Math.ceil(offset / 2)
        if (idx >= 0 && idx < len) order.push(idx)
        offset++
      }
      return order.slice(0, len)
    },
    [revealDirection]
  )

  const fillAllIndices = useCallback(() => {
    const s = new Set()
    for (let i = 0; i < text.length; i++) s.add(i)
    return s
  }, [text])

  const getNextIndex = useCallback(
    revealed => {
      const len = text.length
      if (revealDirection === 'start') return revealed.size
      if (revealDirection === 'end') return len - 1 - revealed.size
      const middle = Math.floor(len / 2)
      const offset = Math.floor(revealed.size / 2)
      const next = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1
      if (next >= 0 && next < len && !revealed.has(next)) return next
      for (let i = 0; i < len; i++) if (!revealed.has(i)) return i
      return 0
    },
    [text, revealDirection]
  )

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length)
      pointerRef.current = 0
    }
    revealedRef.current = new Set()
    directionRef.current = 'forward'
    iterationRef.current = 0
    setIsAnimating(true)
  }, [sequential, computeOrder, text])

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse()
      pointerRef.current = 0
    }
    const full = fillAllIndices()
    revealedRef.current = full
    setDisplayText(shuffleText(text, full))
    directionRef.current = 'reverse'
    iterationRef.current = 0
    setIsAnimating(true)
  }, [sequential, computeOrder, text, fillAllIndices, shuffleText])

  const encryptInstantly = useCallback(() => {
    revealedRef.current = new Set()
    setDisplayText(shuffleText(text, revealedRef.current))
    setIsDecrypted(false)
  }, [text, shuffleText])

  // Drives the scramble/reveal tick loop while animating; mirrors the reveal
  // logic once per tick instead of via functional state updates so refs stay
  // authoritative between renders.
  useEffect(() => {
    if (!isAnimating) return

    const id = setInterval(() => {
      if (sequential) {
        if (directionRef.current === 'forward') {
          if (revealedRef.current.size < text.length) {
            const next = new Set(revealedRef.current)
            next.add(getNextIndex(revealedRef.current))
            revealedRef.current = next
            setDisplayText(shuffleText(text, next))
          } else {
            setIsAnimating(false)
            setIsDecrypted(true)
          }
        } else if (pointerRef.current < orderRef.current.length) {
          const idxToRemove = orderRef.current[pointerRef.current++]
          const next = new Set(revealedRef.current)
          next.delete(idxToRemove)
          revealedRef.current = next
          setDisplayText(shuffleText(text, next))
          if (next.size === 0) {
            setIsAnimating(false)
            setIsDecrypted(false)
          }
        } else {
          setIsAnimating(false)
          setIsDecrypted(false)
        }
      } else if (directionRef.current === 'forward') {
        setDisplayText(shuffleText(text, revealedRef.current))
        iterationRef.current++
        if (iterationRef.current >= maxIterations) {
          setIsAnimating(false)
          setDisplayText(text)
          setIsDecrypted(true)
        }
      } else {
        let cur = revealedRef.current
        if (cur.size === 0) cur = fillAllIndices()
        const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)))
        const arr = Array.from(cur)
        for (let i = 0; i < removeCount && arr.length > 0; i++) {
          arr.splice(Math.floor(Math.random() * arr.length), 1)
        }
        const next = new Set(arr)
        revealedRef.current = next
        setDisplayText(shuffleText(text, next))
        iterationRef.current++
        if (next.size === 0 || iterationRef.current >= maxIterations) {
          setIsAnimating(false)
          setIsDecrypted(false)
          revealedRef.current = new Set()
          setDisplayText(shuffleText(text, new Set()))
        }
      }
    }, speed)

    return () => clearInterval(id)
  }, [isAnimating, sequential, text, speed, maxIterations, getNextIndex, shuffleText, fillAllIndices])

  const handleMouseEnter = useCallback(() => {
    if (isAnimating) return
    revealedRef.current = new Set()
    setIsDecrypted(false)
    setDisplayText(text)
    directionRef.current = 'forward'
    setIsAnimating(true)
  }, [isAnimating, text])

  const handleMouseLeave = useCallback(() => {
    setIsAnimating(false)
    revealedRef.current = new Set()
    setDisplayText(text)
    setIsDecrypted(true)
    directionRef.current = 'forward'
  }, [text])

  const handleClick = useCallback(() => {
    if (clickMode === 'once') {
      if (isDecrypted) return
      triggerDecrypt()
    } else if (isDecrypted) {
      triggerReverse()
    } else {
      triggerDecrypt()
    }
  }, [clickMode, isDecrypted, triggerDecrypt, triggerReverse])

  // Mount + prop-change setup: click mode starts encrypted, everything else starts plain.
  useEffect(() => {
    if (animateOn === 'click') {
      encryptInstantly()
    } else {
      setDisplayText(text)
      setIsDecrypted(true)
    }
    revealedRef.current = new Set()
    directionRef.current = 'forward'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, text])

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            triggerDecrypt()
            hasAnimatedRef.current = true
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [animateOn, triggerDecrypt])

  const isHoverMode = animateOn === 'hover' || animateOn === 'inViewHover'

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      onMouseEnter={isHoverMode ? handleMouseEnter : undefined}
      onMouseLeave={isHoverMode ? handleMouseLeave : undefined}
      onClick={animateOn === 'click' ? handleClick : undefined}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            className={
              revealedRef.current.has(index) || (!isAnimating && isDecrypted)
                ? typeof className === 'function' ? className(index) : className
                : encryptedClassName
            }
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}
