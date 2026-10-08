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
} & JSX.IntrinsicElements['group']

/**
 * A neo-brutalist tile: flat color, thick ink outline and an extruded logo on
 * both faces, floating over a flat ink slab that acts as its hard offset shadow.
 */
const TechTile = forwardRef<THREE.Group, Props>(function TechTile(
  { icon, spinRef, ...props },
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
        <meshBasicMaterial color={INK} />
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
