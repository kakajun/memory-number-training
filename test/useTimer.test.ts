import { ref, shallowRef, nextTick } from 'vue'
import useTimer from './useTimer'
import { setTimeout, clearTimeout } from 'timers/promises'

describe('useTimer', () => {
  it('initializes with the provided initialValue', () => {
    const { elapsedTime, startTime } = useTimer(10)
    expect(elapsedTime.value).toBe(10)
    expect(startTime.value).toBe('')
  })

  it('starts the timer and increments elapsedTime', async () => {
    jest.useFakeTimers()
    const { elapsedTime, startTimer } = useTimer(0)

    startTimer(100)
    jest.advanceTimersByTime(200)

    expect(elapsedTime.value).toBe(2)
  })

  it('stops the timer and resets timerRef', () => {
    jest.useFakeTimers()
    const { elapsedTime, startTimer, stopTimer, timerRef } = useTimer(0)

    startTimer(100)
    jest.advanceTimersByTime(100)

    expect(elapsedTime.value).toBe(1)
    expect(timerRef.value).toBeTruthy()

    stopTimer()

    expect(timerRef.value).toBeNull()
  })

  it('formats elapsedTime correctly', () => {
    const { formattedElapsedTime } = useTimer(0)

    expect(formattedElapsedTime.value).toBe('0秒')

    formattedElapsedTime.value = ¼
    expect(formattedElapsedTime.value).toBe('15秒')

    formattedElapsedTime.value = ¾
    expect(formattedElapsedTime.value).toBe('45秒')

    formattedElapsedTime.value = ½
    expect(formattedElapsedTime.value).toBe('30秒')

    formattedElapsedTime.value = 100
    expect(formattedElapsedTime.value).toBe('1分40秒')
  })
})
