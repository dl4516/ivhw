// Group routes by the airline, creating an object for each airline with the total count of routes
function groupByAirline(data) {
    const result = data.reduce((acc, d) => {
        if (!acc[d.AirlineID]) {
            acc[d.AirlineID] = {
                "AirlineID": d.AirlineID,
                "AirlineName": d.AirlineName,
                "Count": 0
            };
        }
        acc[d.AirlineID].Count++;
        return acc;
    }, {});

    return Object.values(result).sort((a, b) => b.Count - a.Count);
}

// Group routes by airport, creating an object for each airport with the total count of routes
function groupByAirport(data) {
    const result = data.reduce((acc, d) => {
        [d.SourceAirportID, d.DestAirportID].forEach(key => {
            if (!acc[key]) {
                acc[key] = {
                    "AirportID": key,
                    "Airport": key === d.SourceAirportID ? d.SourceAirport : d.DestAirport,
                    "Latitude": key === d.SourceAirportID ? +d.SourceLatitude : +d.DestLatitude,
                    "Longitude": key === d.SourceAirportID ? +d.SourceLongitude : +d.DestLongitude,
                    "City": key === d.SourceAirportID ? d.SourceCity : d.DestCity,
                    "Country": key === d.SourceAirportID ? d.SourceCountry : d.DestCountry,
                    "Count": 0
                };
            }
            acc[key].Count++;
        });
        return acc;
    }, {});

    return Object.values(result);
}

// Group routes by city, creating an object for each city with the total count of routes
function groupByCity(data) {
    const result = data.reduce((acc, d) => {
        [d.SourceCity, d.DestCity].forEach(key => {
            if (!acc[key]) {
                acc[key] = {
                    "AirportID": key,
                    "Airport": key === d.SourceAirportID ? d.SourceAirport : d.DestAirport,
                    "Latitude": key === d.SourceAirportID ? +d.SourceLatitude : +d.DestLatitude,
                    "Longitude": key === d.SourceAirportID ? +d.SourceLongitude : +d.DestLongitude,
                    "City": key === d.SourceAirportID ? d.SourceCity : d.DestCity,
                    "Country": key === d.SourceAirportID ? d.SourceCountry : d.DestCountry,
                    "Count": 0
                };
            }
            acc[key].Count++;
        });
        return acc;
    }, {});

    return Object.values(result);
}

export {
    groupByAirline,
    groupByAirport,
    groupByCity
};
