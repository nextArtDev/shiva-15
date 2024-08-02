'use client'

import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'

const StarBackground = (props: any) => {
  const ref: any = useRef()
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 2 })
  )

  useFrame((state, delta) => {
    // ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 7
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff40"
          // color={['#ff000045', '#00ff0045']}
          size={0.006}
          sizeAttenuation={true}
          dethWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => (
  <section className="canvas w-full h-auto fixed inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </section>
)

export default StarsCanvas
