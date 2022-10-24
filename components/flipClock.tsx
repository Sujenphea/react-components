import { css } from '@emotion/react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
let timingFunction = { ease: [0.66, 0.15, 0.1, 0.95], duration: 0.3 }

/* -------------------------------------------------------------------------- */
/*                                   display                                  */
/* -------------------------------------------------------------------------- */
const ColonDisplay = (props: { labelColor: string | undefined }) => {
  return (
    <div
      css={css({
        fontSize: '40px',
        paddingBottom: '24px',
        color: props.labelColor === undefined ? '#888' : props.labelColor,
      })}
    >
      :
    </div>
  )
}

const DigitDisplay = (props: { digit: string }) => {
  const storedValue = useRef('')
  const pushControls = useAnimationControls()
  const squishedControls = useAnimationControls()

  useEffect(() => {
    pushControls
      .start({
        y: -24,
        scaleY: 0,
        opacity: 0.3,
        transition: { duration: 0, ease: 'linear' },
      })
      .then(() => {
        pushControls.start({ y: 0, scaleY: 1, opacity: 1 })
      })

    squishedControls
      .start({
        y: 0,
        opacity: 1,
        scaleY: 1,
        transition: { duration: 0, ease: 'linear' },
      })
      .then(() => {
        squishedControls.start({ y: 24, opacity: 0.3, scaleY: 0 })
      })

    storedValue.current = props.digit
  }, [props.digit])

  return (
    <div
      css={css({
        flex: '1 1',
        height: '56px',
        width: '24px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& > *': {
          position: 'absolute',
          bottom: 0,
        },
      })}
    >
      <motion.div
        animate={squishedControls}
        transition={timingFunction}
        children={storedValue.current}
      />
      <motion.div
        animate={pushControls}
        transition={timingFunction}
        children={props.digit}
      />
    </div>
  )
}

const UnitTimeDisplay = (props: {
  time: number
  unit: string
  showLabel: boolean | undefined
  labelColor: string | undefined
}) => {
  const time = props.time.toString().padStart(2, '0')

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        width: '48px',
      })}
    >
      {/* time */}
      <div
        css={css({
          display: 'flex',
          fontSize: '40px',
        })}
      >
        {time.split('').map((v, i) => {
          return <DigitDisplay digit={v} key={props.unit + i} />
        })}
      </div>

      {/* label */}
      {props.showLabel ? (
        <div
          css={css({
            fontSize: '12px',
            color: props.labelColor === undefined ? '#888' : props.labelColor,
          })}
        >
          {props.unit.concat(1 !== props.time ? 's' : '')}
        </div>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    clock                                   */
/* -------------------------------------------------------------------------- */
/**
 *
 * @param props
 * @returns By default is a clock, optional for turning to a countdown clock
 */
export default function FlipClock(props: {
  isCountdown?: boolean
  time?: string
  showLabels?: boolean
  showDay?: boolean
  showHour?: boolean
  showMinute?: boolean
  showSecond?: boolean

  labelColor?: string
}) {
  /* -------------------------------- variables ------------------------------- */
  const [clockTime, setClockTime] = useState(0)
  const [displayDay, setDisplayDay] = useState<Boolean | undefined>(
    (props.showDay === undefined || props.showDay) && props.isCountdown
  )
  const [displayHour, setDisplayHour] = useState<Boolean | undefined>(
    props.showHour === undefined || props.showHour
  )
  const [displayMinute, setDisplayMinute] = useState<Boolean | undefined>(
    props.showMinute === undefined || props.showMinute
  )
  const [displaySecond, setDisplaySecond] = useState<Boolean | undefined>(
    props.showSecond === undefined || props.showSecond
  )

  /* ---------------------------------- hooks --------------------------------- */
  const clockTimeObject = useMemo(() => {
    return {
      days: Math.floor(clockTime / 864e5),
      hours: Math.floor((clockTime / 36e5) % 24),
      minutes: Math.floor((clockTime / 1e3 / 60) % 60),
      seconds: Math.floor((clockTime / 1e3) % 60),
    }
  }, [clockTime])

  /* --------------------------------- effect --------------------------------- */
  // setup timer
  useEffect(() => {
    // reset timer whenever isCountdown changes

    const updateTime = () => {
      let currentTime = new Date()
      let timezoneOffset = 6e4 * currentTime.getTimezoneOffset()
      let newTime = 0

      // countdown
      if (props.isCountdown) {
        newTime =
          new Date(props.time ?? '').getTime() -
          currentTime.getTime() +
          timezoneOffset
      }

      // normal clock
      else {
        newTime = currentTime.getTime() + timezoneOffset
      }

      setClockTime(newTime)
    }

    const timer = setInterval(() => {
      updateTime()
    }, 1e3)

    return () => clearInterval(timer)
  }, [props.isCountdown])

  useEffect(() => {
    setDisplayDay(
      (props.showDay === undefined || props.showDay) && props.isCountdown
    )
  }, [props.showDay, props.isCountdown])

  useEffect(() => {
    setDisplayHour(props.showHour === undefined || props.showHour)
  }, [props.showHour])

  useEffect(() => {
    setDisplayMinute(props.showMinute === undefined || props.showMinute)
  }, [props.showMinute])

  useEffect(() => {
    setDisplaySecond(props.showSecond === undefined || props.showSecond)
  }, [props.showSecond])

  /* --------------------------------- display -------------------------------- */
  // time units
  // - day not shown in normal clock mode
  const dayDisplay = () => {
    return (
      <>
        {displayDay ? (
          <UnitTimeDisplay
            time={clockTimeObject.days}
            unit="day"
            showLabel={props.showLabels}
            labelColor={props.labelColor}
          />
        ) : null}
      </>
    )
  }

  const hourDisplay = () => {
    return (
      <>
        {displayHour ? (
          <UnitTimeDisplay
            time={clockTimeObject.hours}
            unit="hour"
            showLabel={props.showLabels}
            labelColor={props.labelColor}
          />
        ) : null}
      </>
    )
  }

  const minuteDisplay = () => {
    return (
      <>
        {displayMinute ? (
          <UnitTimeDisplay
            time={clockTimeObject.minutes}
            unit="minute"
            showLabel={props.showLabels}
            labelColor={props.labelColor}
          />
        ) : null}
      </>
    )
  }

  const secondDisplay = () => {
    return (
      <>
        {displaySecond ? (
          <UnitTimeDisplay
            time={clockTimeObject.seconds}
            unit="second"
            showLabel={props.showLabels}
            labelColor={props.labelColor}
          />
        ) : null}
      </>
    )
  }

  // colons
  const colon1Display = () => {
    // exlusive for day & hour
    return (
      <>
        {displayDay && displayHour ? (
          <ColonDisplay labelColor={props.labelColor} />
        ) : null}
      </>
    )
  }

  const colon2Display = () => {
    return (
      <>
        {(displayDay || displayHour) && displayMinute ? (
          <ColonDisplay labelColor={props.labelColor} />
        ) : null}
      </>
    )
  }

  const colon3Display = () => {
    return (
      <>
        {(displayDay || displayHour || displayMinute) && displaySecond ? (
          <ColonDisplay labelColor={props.labelColor} />
        ) : null}
      </>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      })}
    >
      {dayDisplay()}

      {colon1Display()}

      {hourDisplay()}

      {colon2Display()}

      {minuteDisplay()}

      {colon3Display()}

      {secondDisplay()}
    </div>
  )
}
