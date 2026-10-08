'use client'
import { TECH_ICONS } from '@/src/data/techIcons'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MutableRefObject, useMemo, useRef } from 'react'
import * as THREE from 'three'
import TechTile from './TechTile'

const ROWS = 6
const PER_ROW = 11
const SPACING = 1.75
const ROW_WIDTH = PER_ROW * SPACING
const ROW_GAP = 1.75

/**
 * Rows of 3D tech logos. Scroll progress slides alternate rows in opposite
 * horizontal directions, flips the tiles and drifts the whole wall vertically.
 */
function Wall({
  progress,
  reduced
}: {
  progress: MutableRefObject<number>
  reduced: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const tiles = useRef<(THREE.Group | null)[]>([])
  const spins = useRef<(THREE.Group | null)[]>([])
  const smooth = useRef(0)
  const viewport = useThree(s => s.viewport)

  const rows = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, r) =>
        Array.from(
          { length: PER_ROW },
          (_, i) => TECH_ICONS[(r * 7 + i * 3) % TECH_ICONS.length]
        )
      ),
    []
  )

  useFrame((state, delta) => {
    const t = reduced ? 0 : state.clock.elapsedTime
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      progress.current,
      4,
      delta
    )
    const p = smooth.current

    rows.forEach((row, r) => {
      const dir = r % 2 === 0 ? -1 : 1
      const offset = dir * (p * 16 + t * 0.35) + (r % 2) * (SPACING / 2)
      row.forEach((_, i) => {
        const obj = tiles.current[r * PER_ROW + i]
        const spin = spins.current[r * PER_ROW + i]
        if (!obj || !spin) return
        const raw = i * SPACING + offset
        obj.position.x =
          (((raw % ROW_WIDTH) + ROW_WIDTH) % ROW_WIDTH) - ROW_WIDTH / 2
        spin.position.z = Math.sin(t * 1.1 + i * 0.9 + r) * 0.2
        spin.rotation.y = dir * p * Math.PI * 2 + Math.sin(t * 0.8 + i) * 0.2
        spin.rotation.x = Math.sin(t * 0.7 + i * 1.3 + r) * 0.15
      })
    })

    if (group.current) {
      // Portrait screens get bigger tiles; rows overflow sideways, which the loop hides.
      const fit = Math.min(1, viewport.width / (viewport.aspect < 1 ? 6 : 10.5))
      group.current.scale.setScalar(fit)
      group.current.position.y = THREE.MathUtils.lerp(-1.6, 1.6, p) * fit
      group.current.rotation.x = THREE.MathUtils.lerp(0.45, -0.45, p)
      group.current.rotation.z = THREE.MathUtils.lerp(-0.12, 0.12, p)
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        state.pointer.x * 0.2,
        3,
        delta
      )
    }
  })

  return (
    <group ref={group}>
      {rows.map((row, r) =>
        row.map((icon, i) => (
          <TechTile
            key={`${r}-${i}`}
            icon={icon}
            position={[0, ((ROWS - 1) / 2 - r) * ROW_GAP, 0]}
            ref={el => {
              tiles.current[r * PER_ROW + i] = el
            }}
            spinRef={el => {
              spins.current[r * PER_ROW + i] = el
            }}
          />
        ))
      )}
    </group>
  )
}

export default function TechScene({
  progress,
  active
}: {
  progress: MutableRefObject<number>
  active: boolean
}) {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 11], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <Wall progress={progress} reduced={reduced} />
    </Canvas>
  )
}
