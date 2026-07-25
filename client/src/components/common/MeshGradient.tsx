import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Mesh = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.1 + pointer.y * 0.3;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.08 + pointer.x * 0.3;
      mesh.current.position.x = pointer.x * 0.5;
      mesh.current.position.y = pointer.y * 0.5;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#6366F1') },
    uColor2: { value: new THREE.Color('#A78BFA') },
    uColor3: { value: new THREE.Color('#818CF8') },
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    void main() {
      vUv = uv;
      vec3 pos = position;
      vElevation = pos.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec2 uv = vUv;
      float wave = sin(uv.x * 10.0 + uTime * 0.5) * 0.5 + 0.5;
      float wave2 = cos(uv.y * 8.0 + uTime * 0.4) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, wave);
      color = mix(color, uColor3, wave2);
      float alpha = 0.3 + 0.1 * wave;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={mesh} scale={[2, 2, 2]}>
      <icosahedronGeometry args={[1.5, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
};

export const MeshGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 md:opacity-50">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Mesh />
      </Canvas>
    </div>
  );
};
