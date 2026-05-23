"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { MutableRefObject } from "react";
import type { ThreeEvent } from "@react-three/fiber";

type MiningSceneProps = {
  progressRef: MutableRefObject<number>;
};

function RealisticGlobe({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const planet = useRef<THREE.Mesh>(null);
  const cloudLayer = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const dragState = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    yawOffset: 0,
    pitchOffset: 0,
  });
  const [albedoMap, normalMap, specMap, cloudMap] = useTexture([
    "/textures/earth/earth_atmos_2048.jpg",
    "/textures/earth/earth_normal_2048.jpg",
    "/textures/earth/earth_specular_2048.jpg",
    "/textures/earth/earth_clouds_1024.png",
  ]);

  useMemo(() => {
    [albedoMap, normalMap, specMap, cloudMap].forEach((texture) => {
      texture.colorSpace = texture === albedoMap ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.anisotropy = 8;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
  }, [albedoMap, normalMap, specMap, cloudMap]);

  useFrame((state) => {
    const p = progressRef.current;
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    const drag = dragState.current;

    drag.velocityX *= 0.95;
    drag.velocityY *= 0.95;
    if (!drag.active) {
      drag.yawOffset += drag.velocityX;
      drag.pitchOffset += drag.velocityY;
      drag.pitchOffset = THREE.MathUtils.clamp(drag.pitchOffset, -0.42, 0.42);
    }

    const globe = planet.current;
    if (!globe) return;

    const baseSpin = state.clock.elapsedTime * 0.045;
    const isHeroRange = p < 0.35;
    const pointerYaw = isHeroRange ? pointer.current.x * 0.2 : 0;
    const pointerPitch = isHeroRange ? pointer.current.y * 0.13 : 0;
    const targetYaw = pointerYaw + p * Math.PI * 0.42 + drag.yawOffset;
    const targetPitch = pointerPitch + p * 0.09 + drag.pitchOffset;

    globe.rotation.y = THREE.MathUtils.lerp(globe.rotation.y, baseSpin + targetYaw, 0.05);
    globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x, targetPitch, 0.05);

    const clouds = cloudLayer.current;
    if (clouds) {
      clouds.rotation.y = globe.rotation.y * 1.05 + state.clock.elapsedTime * 0.018;
      clouds.rotation.x = globe.rotation.x;
    }
  });

  return (
    <group>
      <mesh
        ref={planet}
        castShadow
        receiveShadow
        onPointerDown={(event: ThreeEvent<PointerEvent>) => {
          if (progressRef.current >= 0.35) return;
          event.stopPropagation();
          dragState.current.active = true;
          dragState.current.lastX = event.clientX;
          dragState.current.lastY = event.clientY;
          dragState.current.velocityX = 0;
          dragState.current.velocityY = 0;
          const target = event.target as HTMLElement | null;
          target?.setPointerCapture(event.pointerId);
          document.body.style.cursor = "grabbing";
        }}
        onPointerMove={(event: ThreeEvent<PointerEvent>) => {
          const drag = dragState.current;
          if (!drag.active) return;
          event.stopPropagation();
          const deltaX = event.clientX - drag.lastX;
          const deltaY = event.clientY - drag.lastY;
          drag.lastX = event.clientX;
          drag.lastY = event.clientY;
          drag.yawOffset += deltaX * 0.0075;
          drag.pitchOffset += deltaY * 0.0052;
          drag.pitchOffset = THREE.MathUtils.clamp(drag.pitchOffset, -0.42, 0.42);
          drag.velocityX = deltaX * 0.0012;
          drag.velocityY = deltaY * 0.00082;
        }}
        onPointerUp={(event: ThreeEvent<PointerEvent>) => {
          const drag = dragState.current;
          if (!drag.active) return;
          event.stopPropagation();
          drag.active = false;
          const target = event.target as HTMLElement | null;
          target?.releasePointerCapture(event.pointerId);
          document.body.style.cursor = "";
        }}
        onPointerCancel={(event: ThreeEvent<PointerEvent>) => {
          dragState.current.active = false;
          event.stopPropagation();
          const target = event.target as HTMLElement | null;
          target?.releasePointerCapture(event.pointerId);
          document.body.style.cursor = "";
        }}
        onPointerOut={() => {
          if (!dragState.current.active) {
            document.body.style.cursor = "";
          }
        }}
        onPointerOver={() => {
          if (progressRef.current < 0.35 && !dragState.current.active) {
            document.body.style.cursor = "grab";
          }
        }}
      >
        <sphereGeometry args={[2.4, 160, 160]} />
        <meshPhongMaterial
          map={albedoMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          specularMap={specMap}
          specular={new THREE.Color("#c5d6ea")}
          shininess={24}
        />
      </mesh>

      <mesh ref={cloudLayer}>
        <sphereGeometry args={[2.45, 120, 120]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function GlobeMotionGroup({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef.current;
    const mobile = state.size.width < 768;
    const slideToCenter = THREE.MathUtils.smoothstep(p, 0.03, 0.45);

    let targetX: number;
    let targetY: number;
    let targetScale: number;
    if (mobile) {
      targetX = THREE.MathUtils.lerp(0, 0, slideToCenter);
      targetY = THREE.MathUtils.lerp(-0.12, 0.02, slideToCenter);
      targetScale = THREE.MathUtils.lerp(0.62, 0.86, slideToCenter);
    } else {
      targetX = THREE.MathUtils.lerp(3.2, 0.15, slideToCenter);
      targetY = THREE.MathUtils.lerp(-0.2, -0.05, slideToCenter);
      targetScale = THREE.MathUtils.lerp(0.8, 1.1, slideToCenter);
    }

    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.06);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.06));

    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <group ref={group}>
      <RealisticGlobe progressRef={progressRef} />
    </group>
  );
}

function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const target = useRef(new THREE.Vector3());
  useFrame(({ camera, size }) => {
    const p = progressRef.current;
    const mobile = size.width < 768;
    const z = (mobile ? 9.4 : 8.8) - p * 2.9;
    const y = p * 0.9 + 0.05;
    const x = Math.sin(p * 0.85) * (mobile ? 0.28 : 0.9);
    target.current.set(x, y, z);
    camera.position.lerp(target.current, 0.06);
    camera.lookAt(0, p * 0.12, 0);
  });
  return null;
}

export function MiningScene({ progressRef }: MiningSceneProps) {
  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 11, 30]} />

      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#9bb7d7", "#0b1023", 0.42]} />
      <pointLight position={[6, 5, 7]} intensity={1.35} color="#f4f8ff" />
      <pointLight position={[-5, -3, -4]} intensity={0.45} color="#284c7d" />
      <directionalLight
        position={[7, 3, 4]}
        intensity={1.25}
        color="#fff6dd"
      />

      <Stars
        radius={90}
        depth={40}
        count={5200}
        factor={3.5}
        saturation={0}
        fade
        speed={0.25}
      />

      <Sparkles
        count={70}
        scale={13}
        size={1.6}
        speed={0.23}
        opacity={0.4}
        color="#d4af37"
      />

      <GlobeMotionGroup progressRef={progressRef} />

      <CameraRig progressRef={progressRef} />
    </>
  );
}
