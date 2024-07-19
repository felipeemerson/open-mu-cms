import React, { useEffect, createRef } from 'react';
import { Buffer } from 'buffer';

type GuildLogoProps = { base64Logo: string; size: number };

const GuildLogo: React.FC<GuildLogoProps> = ({ base64Logo, size = 40 }) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const binaryString = Buffer.from(base64Logo, 'base64');
    const hexString = binaryString.toString('hex');

    const colorMap: Record<string, string> = {
      '0': 'rgba(0, 0, 0, 0)',
      '1': '#000000',
      '2': '#8c8a8d',
      '3': '#ffffff',
      '4': '#fe0000',
      '5': '#ff7f00',
      '6': '#ffff00',
      '7': '#8cff01',
      '8': '#00ff00',
      '9': '#01ff8d',
      a: '#00ffff',
      b: '#008aff',
      c: '#0000fe',
      d: '#8c00ff',
      e: '#ff00fe',
      f: '#ff008c',
    };

    const canvas = canvasRef.current;

    if (canvas == null) return;

    const ctx = canvas.getContext('2d');

    if (ctx == null) return;

    const pixelSize = size / 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const colorIndex = hexString[y * 8 + x];
        ctx.fillStyle = colorMap[colorIndex];
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [base64Logo, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default GuildLogo;
