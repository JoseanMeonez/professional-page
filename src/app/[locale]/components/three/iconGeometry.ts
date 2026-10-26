import type { TechIcon } from '@/src/data/techIcons'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const cache = new Map<string, THREE.BufferGeometry>()

/**
 * Extrudes a logo's SVG paths into a unit-sized, centered 3D geometry.
 * SVG's y axis points down, so the geometry is mirrored on y; materials
 * using it must render both sides.
 */
export function getIconGeometry(icon: TechIcon): THREE.BufferGeometry {
  const cached = cache.get(icon.name)
  if (cached) return cached

  const [, , width, height] = icon.viewBox.split(/[\s,]+/).map(Number)
  const size = Math.max(width, height)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}">${icon.paths
    .map(d => `<path d="${d}"/>`)
    .join('')}</svg>`

  const shapes = new SVGLoader()
    .parse(svg)
    .paths.flatMap(p => SVGLoader.createShapes(p))
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: size * 0.16,
    bevelEnabled: false,
    curveSegments: 10
  })
  geometry.center()
  geometry.scale(1 / size, -1 / size, 1 / size)
  geometry.computeVertexNormals()

  cache.set(icon.name, geometry)
  return geometry
}
