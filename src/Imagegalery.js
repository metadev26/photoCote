import { Suspense } from 'react'
import './styles.css'
import Images from './Images'

const pexel = (id) => `${id}.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(2) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(3) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(4) },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(5) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(6) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(7) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(8) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(9) }
]

export default function Imagegalery() {
  return(
    <Suspense fallback={null}>
      <Images images={images} />
    </Suspense>
  )
}