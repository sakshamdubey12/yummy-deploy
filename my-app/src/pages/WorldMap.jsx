

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import worldMap from '../../src/world.geojson';

const WorldMap = () => {
    const apiBase = process.env.REACT_APP_API_URL;
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const navigate = useNavigate();

    const handleCountryClick = (country) => {
        console.log(country);
        navigate(`/cuisines/${country.name}`); 
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-purple-400 to-blue-500">
            <h1 className="text-5xl font-bold text-white mb-4 shadow-lg">
                World Cuisine Explorer
            </h1>
            <div className="flex justify-center items-center relative w-full max-w-4xl h-full">
                <ComposableMap width={800} height={600}>
                    <Geographies geography={worldMap}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.id} 
                                    geography={geo}
                                    onClick={() => handleCountryClick(geo.properties)}
                                    onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                    style={{
                                        default: { fill: "#7E22CE", outline: "1" },
                                        hover: { fill: "#A161D9", outline: "none" },
                                        pressed: { fill: "#A161D9", outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
                {hoveredCountry && (
                    <div className="absolute text-black bg-white rounded-lg p-2 shadow-lg" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                        {hoveredCountry}
                    </div>
                )}
            </div>
            <footer className="absolute bottom-10 text-white text-sm">
                <p>Click on a country to explore its cuisine!</p>
            </footer>
        </div>
    );
};

export default WorldMap;
