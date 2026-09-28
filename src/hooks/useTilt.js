import { useRef, useState, useCallback } from 'react';

/**
 * Hook for smooth Apple-style 3D perspective tilt on mouse hover.
 * Returns { ref, style, onMouseMove, onMouseLeave, shinePos }
 */
export default function useTilt({ maxTilt = 8, scale = 1.02, speed = 400, perspective = 1000 } = {}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shineX: 50,
    shineY: 50,
    shineOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotX = -percentY * maxTilt;
    const rotY = percentX * maxTilt;

    setTransform({
      rotateX: Number(rotX.toFixed(2)),
      rotateY: Number(rotY.toFixed(2)),
      scale,
      shineX: Math.round((x / rect.width) * 100),
      shineY: Math.round((y / rect.height) * 100),
      shineOpacity: 0.16,
      isHovered: true,
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      shineX: 50,
      shineY: 50,
      shineOpacity: 0,
      isHovered: false,
    });
  }, []);

  const tiltStyle = {
    transform: `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`,
    transition: transform.isHovered ? 'transform 100ms ease-out' : `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'transform',
    transformStyle: 'preserve-3d',
  };

  const shineStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    opacity: transform.shineOpacity,
    background: `radial-gradient(circle 320px at ${transform.shineX}% ${transform.shineY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
    transition: 'opacity 300ms ease-out',
    mixBlendMode: 'overlay',
  };

  return {
    ref,
    tiltProps: {
      ref,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: tiltStyle,
    },
    tiltStyle,
    shineStyle,
    isHovered: transform.isHovered,
  };
}
