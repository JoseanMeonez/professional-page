'use client'
import type { TechIcon } from '@/src/data/techIcons'
import { Outlines, RoundedBox } from '@react-three/drei'
import { forwardRef, Ref, useMemo } from 'react'
import * as THREE from 'three'
import { getIconGeometry } from './iconGeometry'

export const INK = '#0a0a0a'

type Props = {
  icon: TechIcon
  /** Receives the inner group that should be rotated; the hard shadow stays put behind it. */
  spinRef?: Ref<THREE.Group>
  shadow?: TileShadow
} & JSX.IntrinsicElements['group']

export type TileShadow = { color: string; opacity: number }

/** Solid ink reads as a black hole behind text in light mode, so tone it per theme. */
export const tileShadowFor = (dark: boolean): TileShadow =>
  dark ? { color: '#f5f0e1', opacity: 0.14 } : { color: INK, opacity: 0.2 }

/**
 * A neo-brutalist tile: flat color, thick ink outline and an extruded logo on
 * both faces, floating over a flat ink slab that acts as its hard offset shadow.
 */
const TechTile = forwardRef<THREE.Group, Props>(function TechTile(
  { icon, spinRef, shadow = { color: INK, opacity: 1 }, ...props },
  ref
) {
  const geometry = useMemo(() => getIconGeometry(icon), [icon])

  return (
    <group ref={ref} {...props}>
      <RoundedBox
        args={[1.2, 1.2, 0.04]}
        radius={0.02}
        smoothness={2}
        position={[0.14, -0.14, -0.5]}
      >
        <meshBasicMaterial
          color={shadow.color}
          transparent={shadow.opacity < 1}
          opacity={shadow.opacity}
          depthWrite={shadow.opacity >= 1}
        />
      </RoundedBox>
      <group ref={spinRef}>
        <RoundedBox args={[1.2, 1.2, 0.26]} radius={0.08} smoothness={3}>
          <meshToonMaterial color={icon.tile} />
          <Outlines thickness={0.04} color={INK} />
        </RoundedBox>
        <mesh geometry={geometry} position={[0, 0, 0.13]} scale={0.7}>
          <meshToonMaterial color={icon.ink} side={THREE.DoubleSide} />
        </mesh>
        <mesh
          geometry={geometry}
          position={[0, 0, -0.13]}
          rotation={[0, Math.PI, 0]}
          scale={0.7}
        >
          <meshToonMaterial color={icon.ink} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
})

export default TechTile
