'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Ring, Technology, TechnologyCategory } from '@prisma/client';

const categoryAngles: Record<TechnologyCategory, [number, number]> = {
  PLATFORMS: [Math.PI / 2, Math.PI],
  TOOLS: [Math.PI, 1.5 * Math.PI],
  LANGUAGES: [1.5 * Math.PI, 2 * Math.PI],
  TECHNIQUES: [0, Math.PI / 2],
};

const categories = Object.values(TechnologyCategory);
const rings = Object.values(Ring);
const colors = ['#009eb0', '#5ba300', '#c7ba00', '#e09b96'];

export default function TechRadar({ technologies }: { technologies: Technology[] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 600;
    const height = 600;
    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, 250]);

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    rings.forEach((_, i) => {
      svg
        .append('circle')
        .attr('r', ((i + 1) * 250) / rings.length)
        .attr('fill', 'none')
        .attr('stroke', '#bbb')
        .attr('stroke-width', 2);
    });

    svg
      .append('line')
      .attr('x1', -250)
      .attr('y1', 0)
      .attr('x2', 250)
      .attr('y2', 0)
      .attr('stroke', '#bbb');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', -250)
      .attr('x2', 0)
      .attr('y2', 250)
      .attr('stroke', '#bbb');

    technologies.forEach((technology) => {
      const [angleMin, angleMax] =
        categoryAngles[technology.category as keyof typeof categoryAngles];
      const angle = d3.randomUniform(angleMin, angleMax)();

      let ringValue = 0;

      if (technology.ring === Ring.ADOPT) {
        ringValue = getRandomInteger(5, 20);
      } else if (technology.ring === Ring.TRIAL) {
        ringValue = getRandomInteger(35, 45);
      } else if (technology.ring === Ring.ASSESS) {
        ringValue = getRandomInteger(55, 65);
      } else if (technology.ring === Ring.HOLD) {
        ringValue = getRandomInteger(75, 95);
      }

      const r = radiusScale(ringValue);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      if (technology.ring === Ring.ADOPT) {
        svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 6).attr('fill', colors[0]);
      } else if (technology.ring === Ring.TRIAL) {
        svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 6).attr('fill', colors[1]);
      } else if (technology.ring === Ring.ASSESS) {
        svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 6).attr('fill', colors[2]);
      } else if (technology.ring === Ring.HOLD) {
        svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 6).attr('fill', colors[3]);
      }

      svg
        .append('text')
        .attr('x', x + 10)
        .attr('y', y)
        .text(technology.name)
        .attr('font-size', '12px')
        .attr('fill', '#333');
    });
  }, [technologies]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref}></svg>

      <div className="mt-6 flex flex-wrap space-x-6">
        {rings.map((ring, i) => (
          <div key={ring} className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: colors[i] }}></div>
            <span className="text-sm font-medium">{ring}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap space-x-6">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center space-x-2">
            <span className="text-sm font-semibold">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
