'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Technology } from '@prisma/client';

const categories = ['Languages', 'Infrastructure', 'Data Management', 'Datastores'] as const;
type Category = (typeof categories)[number];

const categoryAngles: Record<Category, [number, number]> = {
  Languages: [0, Math.PI / 2],
  Infrastructure: [Math.PI / 2, Math.PI],
  'Data Management': [Math.PI, 1.5 * Math.PI],
  Datastores: [1.5 * Math.PI, 2 * Math.PI],
};

const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
const colors = ['#5ba300', '#009eb0', '#c7ba00', '#e09b96'];

const data = [
  { name: 'Next.js', category: 'Languages', value: 90 },
  { name: 'TypeScript', category: 'Languages', value: 85 },
  { name: 'GraphQL', category: 'Data Management', value: 70 },
  { name: 'Tailwind', category: 'Languages', value: 65 },
  { name: 'Docker', category: 'Infrastructure', value: 40 },
  { name: 'Kubernetes', category: 'Infrastructure', value: 30 },
  { name: 'Redis', category: 'Datastores', value: 55 },
  { name: 'PostgreSQL', category: 'Datastores', value: 75 },
  { name: 'MongoDB', category: 'Data Management', value: 20 },
];

export default function TechRadar({ technologies }: { technologies: Technology[] }) {
  const ref = useRef<SVGSVGElement>(null);

  technologies?.forEach((c) => console.log(c.name));

  useEffect(() => {
    const width = 600;
    const height = 600;
    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, 250]);

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
        .attr('stroke', colors[i])
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

    data.forEach((point) => {
      const [angleMin, angleMax] = categoryAngles[point.category as keyof typeof categoryAngles];
      const angle = d3.randomUniform(angleMin, angleMax)();
      const r = radiusScale(point.value);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 6).attr('fill', '#333');

      svg
        .append('text')
        .attr('x', x + 10)
        .attr('y', y)
        .text(point.name)
        .attr('font-size', '12px')
        .attr('fill', '#333');
    });
  }, []);

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
