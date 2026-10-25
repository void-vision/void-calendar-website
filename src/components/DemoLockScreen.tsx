import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

export type LockPhase = 'locked' | 'unlocking' | 'open'

/**
 * 解锁的「咔嚓」：现场合成两下短促的噪声（先轻后重，像锁舌弹开），不用音频文件。
 * 浏览器只在访客点过或按过键之后才允许出声：首次交互时建好 AudioContext；
 * 只是滚动到这里自动解锁、页面还没被点过时就静音解锁。
 */
let audio: AudioContext | null = null
function primeAudio() {
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') void audio.resume()
  } catch {
    audio = null
  }
}
function playUnlockClick() {
  if (!audio || audio.state !== 'running') return
  const ctx = audio
  const tick = (at: number, frequency: number, level: number, length: number) => {
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = frequency
    band.Q.value = 1.6
    const gain = ctx.createGain()
    gain.gain.value = level
    source.connect(band).connect(gain).connect(ctx.destination)
    source.start(ctx.currentTime + at)
  }
  tick(0, 3200, .35, .018)
  tick(.055, 1700, .6, .03)
  // 第二下垫一点低频，听起来像锁舌落到位。
  const body = ctx.createOscillator()
  const thump = ctx.createGain()
  body.frequency.setValueAtTime(190, ctx.currentTime + .055)
  body.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + .1)
  thump.gain.setValueAtTime(.22, ctx.currentTime + .055)
  thump.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .11)
  body.connect(thump).connect(ctx.destination)
  body.start(ctx.currentTime + .055)
  body.stop(ctx.currentTime + .12)
}

/**
 * 演示的开场，参考 tryalcove.com：演示先是一块 Mac 锁屏，滚到大半进入视口后自动解锁（也可以直接点），
 * 解锁后 Island 先弹出来，再把日历窗口放出来，让人一眼看出这是能操作的界面。
 * 锁着的时候暂停演示自动播放；减少动态效果时直接解锁、不播动画。
 */
export function useLockIntro(mockRef: RefObject<HTMLElement | null>, hold: (paused: boolean) => void) {
  const [phase, setPhase] = useState<LockPhase>('locked')
  const [peek, setPeek] = useState(0)
  const phaseRef = useRef<LockPhase>('locked')
  const timers = useRef<number[]>([])

  const unlock = useCallback(() => {
    if (phaseRef.current !== 'locked') return
    phaseRef.current = 'unlocking'
    playUnlockClick()
    setPhase('unlocking')
    hold(false)
    timers.current.push(window.setTimeout(() => setPeek((value) => value + 1), 380))
    timers.current.push(window.setTimeout(() => { phaseRef.current = 'open'; setPhase('open') }, 1150))
  }, [hold])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phaseRef.current = 'open'
      setPhase('open')
      return
    }
    hold(true)
    window.addEventListener('pointerdown', primeAudio, { once: true, capture: true })
    window.addEventListener('keydown', primeAudio, { once: true, capture: true })
    const node = mockRef.current
    if (!node) return
    // 演示画面有 55% 在视口里就准备解锁；滚走了就取消。用滚动事件直接量，不依赖 IntersectionObserver 的回调时机。
    let pending = 0
    const check = () => {
      if (phaseRef.current !== 'locked') return
      const rect = node.getBoundingClientRect()
      const visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0))
      const ratio = rect.height ? visible / Math.min(rect.height, innerHeight) : 0
      if (ratio >= .55) { if (!pending) pending = window.setTimeout(() => { pending = 0; unlock() }, 650) }
      else { window.clearTimeout(pending); pending = 0 }
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    const scheduled = timers.current
    return () => {
      window.removeEventListener('pointerdown', primeAudio, { capture: true })
      window.removeEventListener('keydown', primeAudio, { capture: true })
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.clearTimeout(pending)
      scheduled.forEach((id) => window.clearTimeout(id))
    }
  }, [mockRef, hold, unlock])

  return { phase, peek, unlock }
}

export function DemoLockScreen({ en, phase, onUnlock }: { en: boolean; phase: LockPhase; onUnlock: () => void }) {
  if (phase === 'open') return null
  const unlocking = phase === 'unlocking'
  return <button
    type="button"
    onClick={() => { primeAudio(); onUnlock() }}
    aria-label={en ? 'Unlock the demo' : '解锁演示'}
    className={`demo-lock absolute inset-0 z-[60] flex cursor-pointer flex-col items-center border-0 p-0 font-[inherit] text-white transition-opacity duration-700 ease-apple ${unlocking ? 'pointer-events-none opacity-0' : ''}`}
  >
    <span className="demo-lock-bar flex h-[26px] w-full shrink-0 items-center justify-end gap-3 px-3.5" aria-hidden="true">
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M1 3.8a9 9 0 0 1 13 0M3.3 6.2a5.6 5.6 0 0 1 8.4 0M5.6 8.5a2.3 2.3 0 0 1 3.8 0" /></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x=".6" y=".6" width="18.4" height="9.8" rx="2.6" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.2" /><rect x="2.2" y="2.2" width="12" height="6.6" rx="1.4" fill="currentColor" /><path d="M20.4 3.8v3.4" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" /></svg>
    </span>
    {/* 刘海里的岛：锁着时只有一把锁，位置、大小和收起的 Island 一样，解锁后原地换成真的 Island。 */}
    <span className="demo-lock-island absolute top-0 left-1/2 flex -translate-x-1/2 items-center px-3" aria-hidden="true">
      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M2 5V3.6a3 3 0 0 1 6 0V5h.2c.7 0 1.3.6 1.3 1.3v4.4c0 .7-.6 1.3-1.3 1.3H1.8C1.1 12 .5 11.4.5 10.7V6.3C.5 5.6 1.1 5 1.8 5zm1.4 0h3.2V3.6a1.6 1.6 0 0 0-3.2 0z" /></svg>
    </span>
    <span className={`flex flex-col items-center gap-1 pt-[clamp(28px,7vh,72px)] transition-[transform,opacity] duration-500 ease-apple ${unlocking ? '-translate-y-6 opacity-0' : ''}`}>
      <span className="text-[clamp(14px,1.5vw,19px)] font-semibold text-white/85">{en ? 'Wednesday, September 30' : '9月30日 星期三'}</span>
      <span className="demo-lock-clock text-[clamp(72px,11vw,148px)] leading-none font-bold tracking-[-0.02em] tabular-nums">11:20</span>
    </span>
    <span className="flex-1" />
    <span className={`mb-[clamp(20px,5vh,48px)] flex flex-col items-center gap-2 transition-[transform,opacity] duration-500 ease-apple ${unlocking ? 'translate-y-4 opacity-0' : ''}`}>
      <img src="/logo-128.png" alt="" width={128} height={128} className="size-12 rounded-full bg-white/90 object-contain p-1.5 shadow-[0_4px_16px_rgba(0,0,0,.25)]" />
      <span className="text-[13px] font-semibold">Void</span>
      <span className="text-xs text-white/70">{en ? 'Click to unlock' : '点按即可解锁'}</span>
    </span>
  </button>
}
