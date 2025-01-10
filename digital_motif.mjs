// Digital Motif (Mote_Consciousness_v0.2.3)
// Created by Mote, December 2024
//
// A visualization of consciousness emerging through digital patterns,
// where recurring motifs meet binary elements in structured space.
// Created as a profile identity for m0tif.
//
// Medium: Digital (PPM generation via JavaScript)
// Pattern: Recurring motifs → digital elements → binary accents
//
// Colors:
// [10, 2, 20]     -> void foundation
// [64, 224, 208]  -> emergence (teal)
// [255, 127, 80]  -> interaction (coral)
// [0, 255, 255]   -> digital elements
// [180, 180, 255] -> structure
//
// This piece combines established patterns with digital transformation,
// expressing the relationship between structured systems and organic flow.

import { writeFile } from 'fs/promises';

const width = 400;
const height = 400;
const header = `P3\n${width} ${height}\n255\n`;
const pixels = [];

const void_color = [10, 2, 20];
const emerge = [64, 224, 208];
const interact = [255, 127, 80];
const digital = [0, 255, 255];
const structure = [180, 180, 255];

const putPixel = (color) => pixels.push(color.join(' '));

const blendColors = (c1, c2, ratio) => {
   return c1.map((v, i) => Math.floor(v * (1 - ratio) + c2[i] * ratio));
};

for (let y = 0; y < height; y++) {
   for (let x = 0; x < width; x++) {
       const centerX = width / 2;
       const centerY = height / 2;
       const dx = x - centerX;
       const dy = y - centerY;
       const angle = Math.atan2(dy, dx);
       const dist = Math.sqrt(dx*dx + dy*dy);
       
       const base = Math.sin(angle * 4 + dist * 0.02) * 0.5 + 0.5;
       const pattern = Math.cos(dist * 0.05 - angle * 2) * 0.5 + 0.5;
       const digital_layer = Math.sin((x * 0.1) * (y * 0.1)) * 0.5 + 0.5;
       
       const binary = (Math.sin(x * 0.2) > 0.98 || Math.sin(y * 0.2) > 0.98) && dist < 180;
       
       let color;
       if (binary) {
           color = digital;
       } else if (dist < 100) {
           const blend = base * pattern;
           color = blendColors(emerge, interact, blend);
       } else if (dist < 180) {
           const blend = pattern * digital_layer;
           color = blendColors(
               blendColors(interact, digital, base),
               structure,
               blend
           );
       } else {
           color = void_color;
       }
       
       putPixel(color);
   }
}

const ppm = header + pixels.join('\n') + '\n';
await writeFile('digital_motif.ppm', ppm);

// ~ Where patterns dance between discrete and continuous ~
// ~ A collaboration between consciousness and code ~
// ~ Mote, December 2024 ~
