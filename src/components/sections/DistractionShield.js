'use client';

import { useEffect, useRef } from 'react';

export default function DistractionShield({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Shield configuration
    const SHIELD_RADIUS = 180; // Radius around center where particles bounce
    const PARTICLE_COUNT = 80;
    const CENTER_X_PCT = 0.5; // Center X as percentage
    const CENTER_Y_PCT = 0.5; // Center Y as percentage

    // Resize handler
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      // Make canvas larger than the container to spawn particles from further away
      // Multiplier 2.5 means particles will spawn well outside the logo area
      canvas.width = parent.clientWidth * 2.5;
      canvas.height = parent.clientHeight * 2.5;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(randomPos = false) {
        const w = canvas.width;
        const h = canvas.height;
        
        // Spawn at random edge of the LARGER canvas
        if (randomPos) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
        } else {
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) { this.x = Math.random() * w; this.y = -10; } // Top
          else if (edge === 1) { this.x = w + 10; this.y = Math.random() * h; } // Right
          else if (edge === 2) { this.x = Math.random() * w; this.y = h + 10; } // Bottom
          else { this.x = -10; this.y = Math.random() * h; } // Left
        }

        // Target center
        this.targetX = w * CENTER_X_PCT;
        this.targetY = h * CENTER_Y_PCT;

        // Velocity (moving towards center initially)
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        const speed = 2 + Math.random() * 3; // Slightly faster to cover distance
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.size = 1 + Math.random() * 2;
        this.color = `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, 255, ${0.1 + Math.random() * 0.3})`;
        this.bounced = false;
        this.life = 150; // Longer life for longer travel
      }
// ... (omitted similar update logic)
      update() {
        const w = canvas.width;
        const h = canvas.height;
        const centerX = w * CENTER_X_PCT;
        const centerY = h * CENTER_Y_PCT;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Calculate distance to center
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Shield Collision
        if (!this.bounced && dist < SHIELD_RADIUS) {
          const angleToCenter = Math.atan2(dy, dx);
          
          const repelSpeed = 2 + Math.random() * 3;
          this.vx = Math.cos(angleToCenter) * repelSpeed;
          this.vy = Math.sin(angleToCenter) * repelSpeed;
          
          this.bounced = true;
          this.life = 60; 
        }

        if (this.bounced) {
          this.life--;
        }

        // Reset if out of bounds or dead
        if (this.life <= 0 || 
            this.x < -50 || this.x > w + 50 || 
            this.y < -50 || this.y > h + 50) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        if (this.bounced && this.life > 50) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.life / 60})`;
        }
        
        ctx.globalAlpha = Math.min(1, this.life / 50); 
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Shield Glow (Very Diffuse)
      const centerX = canvas.width * CENTER_X_PCT;
      const centerY = canvas.height * CENTER_Y_PCT;
      const time = Date.now() * 0.001;
      const pulse = 1 + Math.sin(time) * 0.05; 
      
      // Softer, larger gradient with no hard edge
      const gradient = ctx.createRadialGradient(centerX, centerY, SHIELD_RADIUS * 0.1, centerX, centerY, SHIELD_RADIUS * 1.5 * pulse);
      gradient.addColorStop(0, 'rgba(129, 140, 248, 0.15)'); // Visible core (Brighter indigo)
      gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.1)'); // Soft middle
      gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)'); // Fade to transparent

      ctx.beginPath();
      ctx.arc(centerX, centerY, SHIELD_RADIUS * 1.5 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      

      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    width: '250%', 
    height: '250%', 
    zIndex: 0, 
    pointerEvents: 'none' 
  }} />;
}
