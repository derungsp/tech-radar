'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Ring, Technology, TechnologyCategory } from '@prisma/client';

const categoryAngles: Record<TechnologyCategory, [number, number]> = {
  PLATFORMS: [Math.PI / 2, Math.PI],
  TOOLS: [Math.PI, 1.5 * Math.PI],
  LANGUAGES: [1.5 * Math.PI, 2 * Math.PI],
  TECHNIQUES: [0, Math.PI / 2],
};

const rings = Object.values(Ring);
const colors = ['#009eb0', '#5ba300', '#c7ba00', '#e09b96'];

export default function TechRadar({ technologies }: { technologies: Technology[] }) {
  const ref = useRef<SVGSVGElement>(null);

  const [size, setSize] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setSize(Math.min(window.innerWidth * 0.9, 1000));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const radius = size / 2;
    const radiusScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, radius - 80]);

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .attr('viewBox', `0 0 ${size} ${size}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    rings.forEach((_, i) => {
      svg
        .append('circle')
        .attr('r', ((i + 1) * (radius - 80)) / rings.length)
        .attr('fill', 'none')
        .attr('stroke', '#bbb')
        .attr('stroke-width', 2);
    });

    svg
      .append('line')
      .attr('x1', -radius)
      .attr('y1', 0)
      .attr('x2', radius)
      .attr('y2', 0)
      .attr('stroke', '#bbb');
    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', -radius)
      .attr('x2', 0)
      .attr('y2', radius)
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
        const tooltipGroup = svg.append('g');

        tooltipGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 6)
          .attr('fill', colors[0])
          .on('mouseover', function () {
            d3.select(this).attr('r', 10);
            tooltip.style('display', 'block');
          })
          .on('mousemove', function (event) {
            tooltip
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 20}px`)
              .html(`<strong>${technology.name}</strong><br>${technology.techDescription}`);
          })
          .on('mouseout', function () {
            d3.select(this).attr('r', 6);
            tooltip.style('display', 'none');
          });
      } else if (technology.ring === Ring.TRIAL) {
        const tooltipGroup = svg.append('g');

        tooltipGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 6)
          .attr('fill', colors[1])
          .on('mouseover', function () {
            d3.select(this).attr('r', 10);
            tooltip.style('display', 'block');
          })
          .on('mousemove', function (event) {
            tooltip
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 20}px`)
              .html(`<strong>${technology.name}</strong><br>${technology.techDescription}`);
          })
          .on('mouseout', function () {
            d3.select(this).attr('r', 6);
            tooltip.style('display', 'none');
          });
      } else if (technology.ring === Ring.ASSESS) {
        const tooltipGroup = svg.append('g');

        tooltipGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 6)
          .attr('fill', colors[2])
          .on('mouseover', function () {
            d3.select(this).attr('r', 10);
            tooltip.style('display', 'block');
          })
          .on('mousemove', function (event) {
            tooltip
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 20}px`)
              .html(`<strong>${technology.name}</strong><br>${technology.techDescription}`);
          })
          .on('mouseout', function () {
            d3.select(this).attr('r', 6);
            tooltip.style('display', 'none');
          });
      } else if (technology.ring === Ring.HOLD) {
        const tooltipGroup = svg.append('g');

        tooltipGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 6)
          .attr('fill', colors[3])
          .on('mouseover', function () {
            d3.select(this).attr('r', 10);
            tooltip.style('display', 'block');
          })
          .on('mousemove', function (event) {
            tooltip
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 20}px`)
              .html(`<strong>${technology.name}</strong><br>${technology.techDescription}`);
          })
          .on('mouseout', function () {
            d3.select(this).attr('r', 6);
            tooltip.style('display', 'none');
          });
      }
    });

    const tooltip = d3
      .select('body')
      .append('div')
      .attr(
        'class',
        'absolute bg-white text-sm text-gray-700 shadow-lg rounded px-3 py-2 border border-gray-300',
      )
      .style('display', 'none')
      .style('pointer-events', 'none')
      .style('position', 'absolute')
      .style('z-index', '1000');
  }, [technologies, size]);

  return (
    <div className="flex flex-col items-center">
      <svg className="lg:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[1200px]" ref={ref}></svg>

      <div className="w-full text-left">
        <div className="left-5 top-28 mb-5 md:absolute">
          <h1>TOOLS</h1>
          {renderTechnologyList('TOOLS', technologies)}
        </div>
        <div className="right-5 top-28 mb-5 md:absolute">
          <h1>LANGUAGES</h1>
          {renderTechnologyList('LANGUAGES', technologies)}
        </div>
        <div className="bottom-5 left-5 mb-5 md:absolute">
          <h1>PLATFORMS</h1>
          {renderTechnologyList('PLATFORMS', technologies)}
        </div>
        <div className="bottom-5 right-5 mb-5 md:absolute">
          <h1>TECHNIQUES</h1>
          {renderTechnologyList('TECHNIQUES', technologies)}
        </div>
      </div>
    </div>
  );
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderTechnologyList(category: TechnologyCategory, technologies: Technology[]) {
  const filteredTechnologies = technologies.filter((tech) => tech.category === category);

  if (filteredTechnologies.length === 0) {
    return <p className="text-sm text-gray-500">Keine Technologien</p>;
  }

  const groupedByRing: Record<Ring, Technology[]> = {
    ADOPT: [],
    TRIAL: [],
    ASSESS: [],
    HOLD: [],
  };

  filteredTechnologies.forEach((tech) => {
    if (tech.ring) {
      groupedByRing[tech.ring].push(tech);
    }
  });

  return (
    <div className="mt-2 space-y-3">
      {Object.entries(groupedByRing).map(
        ([ring, techs], index) =>
          techs.length > 0 && (
            <div key={ring}>
              <h2 style={{ color: colors[index] }} className="text-sm font-semibold">
                {index + 1}. {ring}
              </h2>
              <ul className="list-inside list-decimal text-sm text-gray-600">
                {techs.map((tech, i) => (
                  <li className="list-none" key={tech.id}>
                    {index + 1}.{i + 1}. {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          ),
      )}
    </div>
  );
}
