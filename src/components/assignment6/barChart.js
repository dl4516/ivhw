import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;

    // Determine the maximum count from the data for the xScale domain
    let maximumCount = max(data, d => d.Count);
    const xScale = scaleLinear().range([0, width]).domain([0, maximumCount]).nice();
    const yScale = scaleBand().range([0, height]).domain(data.map(a => a.AirlineName)).padding(0.2);

    // Click event handler to toggle the selected airline
    const onClick = (airlineId) => {
        if (selectedAirline === airlineId) {
            setSelectedAirline(null);  // Unselect the airline if it's already selected
        } else {
            setSelectedAirline(airlineId);  // Select the airline
        }
    };

    // Dynamic coloring based on selection
    let color = (d) => d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599";

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {data.map(d => (
                <rect key={d.AirlineID} x={0} y={yScale(d.AirlineName)}
                    width={xScale(d.Count)} height={yScale.bandwidth()}
                    onClick={() => onClick(d.AirlineID)}
                    stroke="black" fill={color(d)} />
            ))}
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
            <XAxis xScale={xScale} width={width} height={height} />
        </g>
    );
}
