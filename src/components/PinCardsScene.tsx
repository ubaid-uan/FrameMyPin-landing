import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Canvas texture generation helper
function createCardTexture(text: string, topColor1: string, topColor2: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Background
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(0, 0, 280, 400);

  // Top 55% gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 220);
  grad.addColorStop(0, topColor1);
  grad.addColorStop(1, topColor2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 280, 220);

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = '36px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // simple word wrap for 2 lines Max
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (let word of words) {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 240 && currentLine !== '') {
      lines.push(currentLine);
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const line1 = lines[0] || '';
  const line2 = lines[1] || '';
  if (line2) {
    ctx.fillText(line1.trim(), 140, 100);
    ctx.fillText(line2.trim(), 140, 140);
  } else {
    ctx.fillText(line1.trim(), 140, 120);
  }

  // Bottom bar
  ctx.fillStyle = '#E3000F';
  ctx.fillRect(20, 350, 240, 3);

  // Brand text
  ctx.fillStyle = '#888888';
  ctx.font = '500 12px "DM Sans", sans-serif';
  ctx.fillText('FrameMyPin', 140, 375);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  return tex;
}

const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return lerp(outMin, outMax, clamp((v - inMin) / (inMax - inMin), 0, 1));
}

const Card = ({ 
  index, 
  texture, 
  initPos, initRot,
  scrollPos, scrollRot
}: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.4, 2)), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const maxScroll = Math.max(1, docHeight - window.innerHeight);
    const progress = clamp(scrollY / maxScroll, 0, 1);
    const p4 = mapRange(progress, 0.8, 1.0, 0, 1);

    // Continuous scroll animation
    const targetX = lerp(initPos[0], scrollPos[0], progress);
    let targetY = lerp(initPos[1], scrollPos[1], progress);
    const targetZ = lerp(initPos[2], scrollPos[2], progress);
    
    // Add continuous spin and rotation based on scroll + time
    const targetRotX = lerp(initRot[0], scrollRot[0], progress);
    const targetRotY = lerp(initRot[1], scrollRot[1], progress) + time * 0.15;
    const targetRotZ = lerp(initRot[2], scrollRot[2], progress) + Math.sin(time + index) * 0.05;

    // Bobbing effect
    targetY += Math.sin(time * 2 + index) * 0.05;
    
    const targetScale = lerp(1, 0, p4);

    // Apply with lerp to group
    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX, 0.06);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY, 0.06);
    groupRef.current.position.z = lerp(groupRef.current.position.z, targetZ, 0.06);
    
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, targetRotZ, 0.06);
    
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, targetScale, 0.06));

    // Fade in on load
    groupRef.current.children.forEach((mesh: any) => {
        if(mesh.material) {
            mesh.material.opacity = lerp(mesh.material.opacity, mesh.type === "LineSegments" ? 0.5 : 1, 0.05);
        }
    });
  });

  return (
    <group ref={groupRef} position={initPos} rotation={initRot}>
      {/* Main card */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1.4, 2]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true} 
          opacity={0} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Back face card */}
      <mesh rotation={[0, Math.PI, 0]} castShadow>
        <planeGeometry args={[1.4, 2]} />
        <meshStandardMaterial color="#111" transparent={true} opacity={0} roughness={0.8}/>
      </mesh>

      {/* Bevel outline */}
      <lineSegments geometry={edgesGeometry} position={[0,0,0.001]}>
        <lineBasicMaterial color="#E3000F" transparent opacity={0} />
      </lineSegments>
    </group>
  );
};

export const PinCardsScene = () => {
    // Generate Textures only once when fonts are loaded
    const [textures, setTextures] = useState<THREE.Texture[]>([]);

    useEffect(() => {
      // Small delay to ensure 'Bebas Neue' font is loaded
      document.fonts.ready.then(() => {
        setTextures([
          createCardTexture("10 Pins That Drive 10K Clicks", "#FF8C00", "#1A1A1A"),
          createCardTexture("How to Automate Your Pinterest", "#B3000C", "#1A1A1A"),
          createCardTexture("Grow From 0 to 50K Followers", "#800008", "#1A1A1A"),
          createCardTexture("Create 200 Pins in 3 Minutes", "#4C0005", "#1A1A1A")
        ]);
      });
    }, []);

    const glowLightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (!glowLightRef.current) return;
        const scrollY = window.scrollY;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const maxScroll = Math.max(1, docHeight - window.innerHeight);
        const progress = clamp(scrollY / maxScroll, 0, 1);
        
        // Red glow increases as user scrolls
        glowLightRef.current.intensity = lerp(1.5, 4.0, progress);
        // Slowly move light up
        glowLightRef.current.position.y = lerp(0, 2, progress);
    });

  return (
    <group>
      <ambientLight color="#ffffff" intensity={0.5} />
      <directionalLight color="#ffffff" position={[2, 5, 5]} intensity={1.5} castShadow />
      
      {/* The Red Glow */}
      <pointLight 
        ref={glowLightRef}
        color="#E3000F" 
        position={[0, 0, 1]} 
        intensity={1.5} 
        distance={15} 
      />
      <pointLight color="#ffffff" position={[-3, -2, -3]} intensity={0.5} />

      {textures.length === 4 && (
        <>
          {/* Card 1 */}
          <Card 
            index={0} 
            texture={textures[0]} 
            initPos={[1.5, -0.5, -1.0]} initRot={[0, -0.3, -0.1]}
            scrollPos={[0, -4, 0]} scrollRot={[0, -1.5, -0.2]}
          />
          {/* Card 2 */}
          <Card 
            index={1} 
            texture={textures[1]} 
            initPos={[2.5, 0.4, 0]} initRot={[0, -0.1, 0.05]}
            scrollPos={[0, -4, 0]} scrollRot={[0, 0, 0.1]}
          />
          {/* Card 3 */}
          <Card 
            index={2} 
            texture={textures[2]} 
            initPos={[3.0, 1.2, -0.5]} initRot={[0, 0.4, 0.15]}
            scrollPos={[0, -4, 0]} scrollRot={[0, 1.5, 0.3]}
          />
          {/* Card 4 */}
          <Card 
            index={3} 
            texture={textures[3]} 
            initPos={[4.0, -0.5, -1.5]} initRot={[0, -0.2, 0.2]}
            scrollPos={[0, -4, 0]} scrollRot={[0, 3, 0.5]}
          />
        </>
      )}
    </group>
  );
};

