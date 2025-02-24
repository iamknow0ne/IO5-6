import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

const PopulationGraphs: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const data = [10, 20, 30, 40, 50];

    const svg: Selection<SVGSVGElement, unknown, null, undefined> = d3.select(mountRef.current).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d: number, i: number) => i * 50)
  .attr('y', (d: number) => 500 - d * 10)
  .attr('width', 40)
  .attr('height', (d: number) => d * 10)
  .attr('fill', 'blue');

    return () => {
      d3.select(mountRef.current).selectAll('*').remove();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default PopulationGraphs;
