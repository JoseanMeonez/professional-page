'use client'
import { TECH_ICONS } from '@/src/data/techIcons'
import { Outlines, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MutableRefObject, ReactNode, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import TechTile, { INK } from './TechTile'

const iconByName = (name: string) => TECH_ICONS.find(i => i.name === name)!

type Item = {
  // Position as a fraction of the visible half-width/half-height, plus depth.
  fx: number
  fy: number
  z: number
  scale: number
  spin: [number, number]
  // Tiles only wobble: a full turn would swing their shadow slab in front.
  wobble?: boolean
  delay: number
  node: ReactNode
}

function Shape({ children, color }: { children: ReactNode; color: string }) {
  return (
    <mesh>
      {children}
      <meshToonMaterial color={color} />
      <Outlines thickness={0.035} color={INK} />
    </mesh>
  )
}

const ITEMS: Item[] = [
  {
    fx: 0.5,
    fy: 0.5,
    z: -0.5,
    scale: 1.1,
    spin: [0.3, 0.5],
    delay: 0.1,
    node: (
      <Shape color='#4d7cfe'>
        <torusGeometry args={[0.6, 0.24, 24, 64]} />
      </Shape>
    )
  },
  {
    fx: 0.86,
    fy: 0.02,
    z: -1.2,
    scale: 1,
    spin: [0.4, 0.2],
    delay: 0.2,
    node: (
      <RoundedBox args={[1, 1, 1]} radius={0.06}>
        <meshToonMaterial color='#ff5da2' />
        <Outlines thickness={0.035} color={INK} />
      </RoundedBox>
    )
  },
  {
    fx: 0.3,
    fy: -0.62,
    z: 0.4,
    scale: 0.9,
    spin: [0.2, 0.6],
    delay: 0.3,
    node: (
      <Shape color='#b8ff3b'>
        <coneGeometry args={[0.65, 1.1, 4]} />
      </Shape>
    )
  },
  {
    fx: 0.98,
    fy: 0.68,
    z: -2.2,
    scale: 1,
    spin: [0.1, 0.3],
    delay: 0.35,
    node: (
      <Shape color='#ff7a1a'>
        <sphereGeometry args={[0.55, 32, 32]} />
      </Shape>
    )
  },
  {
    fx: 0.64,
    fy: -0.5,
    z: 1,
    scale: 0.8,
    spin: [0.5, 0.4],
    delay: 0.45,
    node: (
      <Shape color='#a78bfa'>
        <icosahedronGeometry args={[0.65, 0]} />
      </Shape>
    )
  },
  {
    fx: 0.76,
    fy: 0.42,
    z: 1.4,
    scale: 0.75,
    spin: [0.15, 0.45],
    delay: 0.5,
    wobble: true,
    node: <TechTile icon={iconByName('React')} />
  },
  {
    fx: 0.4,
    fy: 0.02,
    z: 1.9,
    scale: 0.6,
    spin: [0.2, 0.35],
    delay: 0.6,
    wobble: true,
    node: <TechTile icon={iconByName('ServiceNow')} />
  },
  {
    fx: 0.96,
    fy: -0.6,
    z: 0.6,
    scale: 0.7,
    spin: [0.25, 0.3],
    delay: 0.7,
    wobble: true,
    node: <TechTile icon={iconByName('.NET')} />
  },
  {
    fx: 0.18,
    fy: 0.62,
    z: -1.4,
    scale: 0.65,
    spin: [0.3, 0.25],
    delay: 0.8,
    wobble: true,
    node: <TechTile icon={iconByName('TypeScript')} />
  },
  {
    fx: 0.62,
    fy: 0.9,
    z: -0.4,
    scale: 0.55,
    spin: [0.2, 0.5],
    delay: 0.9,
    wobble: true,
    node: <TechTile icon={iconByName('Go')} />
  }
]

const easeOutBack = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

function Swarm({
  progress,
  pointer,
  reduced
}: {
  progress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
  reduced: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Group | null)[]>([])
  const smooth = useRef(0)
  const viewport = useThree(s => s.viewport)
  const compact = viewport.width < 7

  // Scatter direction: away from the cluster's center and toward the camera.
  const dirs = useMemo(
    () =>
      ITEMS.map(it => new THREE.Vector3(it.fx - 0.55, it.fy, 0.6).normalize()),
    []
  )

  useFrame((state, delta) => {
    const t = reduced ? 10 : state.clock.elapsedTime
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      progress.current,
      5,
      delta
    )
    const p = smooth.current
    const halfW = viewport.width / 2
    const halfH = viewport.height / 2

    ITEMS.forEach((it, i) => {
      const obj = refs.current[i]
      if (!obj) return
      const intro = reduced
        ? 1
        : easeOutBack(THREE.MathUtils.clamp((t - it.delay) / 0.9, 0, 1))
      const baseX = compact ? (it.fx * 2 - 1) * halfW * 0.85 : it.fx * halfW
      const baseY = it.fy * halfH * (compact ? 0.85 : 0.75)
      const baseZ = it.z - (compact ? 3 : 0)
      const bob = Math.sin(t * 0.9 + i * 1.7) * 0.18

      obj.position.set(
        baseX + dirs[i].x * p * 7,
        baseY + bob + dirs[i].y * p * 5,
        baseZ + p * 5
      )
      obj.rotation.set(
        it.wobble
          ? Math.sin(t * it.spin[0] * 3 + i) * 0.4 + p * 0.5
          : t * it.spin[0] + p * Math.PI * 1.5,
        it.wobble
          ? Math.sin(t * it.spin[1] * 3 + i) * 0.5 + p * 0.6
          : t * it.spin[1] + p * Math.PI,
        0
      )
      obj.scale.setScalar(
        Math.max(0.0001, it.scale * intro * (compact ? 0.6 : 1))
      )
    })

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer.current.x * 0.25,
        3,
        delta
      )
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -pointer.current.y * 0.15,
        3,
        delta
      )
    }
  })

  return (
    <group ref={group}>
      {ITEMS.map((it, i) => (
        <group
          key={i}
          ref={el => {
            refs.current[i] = el
          }}
          scale={0.0001}
        >
          {it.node}
        </group>
      ))}
    </group>
  )
}

export default function HeroScene({
  progress,
  active
}: {
  progress: MutableRefObject<number>
  active: boolean
}) {
  const pointer = useRef({ x: 0, y: 0 })
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 6, 8]} intensity={2.2} />
      <Swarm progress={progress} pointer={pointer} reduced={reduced} />
    </Canvas>
  )
}
