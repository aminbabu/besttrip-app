# API Documentation and Example

## API Endpoint

**URL:** `http://localhost:8123/api/settings/packages/customer`

**Method:** `POST`

### Request Body

The request body should be sent as `form-data` and include the following parameters:

-   **`packageSchedule`** (string): Description of the package schedule.
-   **`packageType`** (string): Type of the package.
-   **`packageDuration`** (string): Duration of the package.
-   **`dataLength`** (string): Length of the data.

### Response

Upon a successful request, the server responds with:

**Status Code:** `200 OK`

**Response Body:**

```json
{
    "message": "Description of the status of the request",
    "data": {
        "umrahPackages": [
            {
                "_id": "Package ID",
                "thumbnail": "Thumbnail URL",
                "title": "Package Title",
                "subtitle": "Package Subtitle",
                "departureLocation": "Departure Location",
                "schedule": "Schedule",
                "journeyDate": "Journey Date",
                "expiryDate": "Expiry Date",
                "type": "Package Type",
                "status": "Package Status",
                "adultPrice": 0,
                "childPrice": 0,
                "infantPrice": 0,
                "subtotal": 0,
                "adultPartialPrice": 0,
                "childPartialPrice": 0,
                "infantPartialPrice": 0,
                "partialSubtotal": 0,
                "seats": 0,
                "inclusions": ["Inclusions"],
                "extraThumbnails": ["Extra Thumbnail URLs"],
                "outboundAirlineCode": "Airline Code",
                "outboundFlightNumber": "Flight Number",
                "outboundBookingClass": "Booking Class",
                "outboundAirCraftModel": "Aircraft Model",
                "outboundDepartureAirport": "Departure Airport",
                "outboundArrivalAirport": "Arrival Airport",
                "outboundDepartureDatetime": "Departure DateTime",
                "outboundArrivalDatetime": "Arrival DateTime",
                "outboundFlightStops": "Flight Stops",
                "outboundLayoverFirstDuration": "First Layover Duration",
                "outboundLayoverFirstAirport": "First Layover Airport",
                "outboundLayoverSecondDuration": "Second Layover Duration",
                "outboundLayoverSecondAirport": "Second Layover Airport",
                "outboundAdultBaggageCheckin": "Adult Baggage Check-in",
                "outboundAdultBaggageCabin": "Adult Baggage Cabin",
                "outboundChildBaggageCheckin": "Child Baggage Check-in",
                "outboundChildBaggageCabin": "Child Baggage Cabin",
                "outboundInfantBaggageCheckin": "Infant Baggage Check-in",
                "outboundInfantBaggageCabin": "Infant Baggage Cabin",
                "makkahHotelThumbnail": "Makkah Hotel Thumbnail",
                "makkahHotelNoOfNights": "Makkah Hotel Number of Nights",
                "makkahHotelName": "Makkah Hotel Name",
                "makkahHotelAddress": "Makkah Hotel Address",
                "makkahHotelRating": "Makkah Hotel Rating",
                "makkahHotelDistance": "Makkah Hotel Distance",
                "makkahHotelDistanceUnit": "Makkah Hotel Distance Unit",
                "makkahHotelWalkDuration": "Makkah Hotel Walk Duration",
                "makkahHotelLocation": "Makkah Hotel Location",
                "makkahHotelNote": "Makkah Hotel Note",
                "makkahHotelExtraThumbnails": [
                    "Makkah Hotel Extra Thumbnail URLs"
                ],
                "madinahHotelThumbnail": "Madinah Hotel Thumbnail",
                "madinahHotelNoOfNights": "Madinah Hotel Number of Nights",
                "madinahHotelName": "Madinah Hotel Name",
                "madinahHotelAddress": "Madinah Hotel Address",
                "madinahHotelRating": "Madinah Hotel Rating",
                "madinahHotelDistance": "Madinah Hotel Distance",
                "madinahHotelDistanceUnit": "Madinah Hotel Distance Unit",
                "madinahHotelWalkDuration": "Madinah Hotel Walk Duration",
                "madinahHotelLocation": "Madinah Hotel Location",
                "madinahHotelNote": "Madinah Hotel Note",
                "madinahHotelExtraThumbnails": [
                    "Madinah Hotel Extra Thumbnail URLs"
                ],
                "inboundAirlineCode": "Airline Code",
                "inboundFlightNumber": "Flight Number",
                "inboundBookingClass": "Booking Class",
                "inboundAirCraftModel": "Aircraft Model",
                "inboundDepartureAirport": "Departure Airport",
                "inboundArrivalAirport": "Arrival Airport",
                "inboundDepartureDatetime": "Departure DateTime",
                "inboundArrivalDatetime": "Arrival DateTime",
                "inboundFlightStops": "Flight Stops",
                "inboundLayoverFirstDuration": "First Layover Duration",
                "inboundLayoverFirstAirport": "First Layover Airport",
                "inboundLayoverSecondDuration": "Second Layover Duration",
                "inboundLayoverSecondAirport": "Second Layover Airport",
                "inboundAdultBaggageCheckin": "Adult Baggage Check-in",
                "inboundAdultBaggageCabin": "Adult Baggage Cabin",
                "inboundChildBaggageCheckin": "Child Baggage Check-in",
                "inboundChildBaggageCabin": "Child Baggage Cabin",
                "inboundInfantBaggageCheckin": "Infant Baggage Check-in",
                "inboundInfantBaggageCabin": "Infant Baggage Cabin",
                "visaType": "Visa Type",
                "visaNoOfEntries": "Visa Number of Entries",
                "visaDuration": "Visa Duration",
                "visaValidity": "Visa Validity",
                "visaOptions": "Visa Options",
                "visaNote": "Visa Note",
                "transportType": "Transport Type",
                "transportAirportToHotel": "Transport Airport to Hotel",
                "transportVisitorPlaces": "Transport Visitor Places",
                "transportHotelToAirport": "Transport Hotel to Airport",
                "transportServices": "Transport Services",
                "transportServiceTypes": "Transport Service Types",
                "transportNote": "Transport Note",
                "ziyarahDays": "Ziyarah Days",
                "ziyarahMakkah": "Ziyarah Makkah",
                "ziyarahMadinah": "Ziyarah Madinah",
                "ziyarahTaif": "Ziyarah Taif",
                "ziyarahMakkaDetails": "Ziyarah Makkah Details",
                "ziyarahMadinaDetails": "Ziyarah Madinah Details",
                "ziyarahTaifDetails": "Ziyarah Taif Details",
                "ziyarahNote": "Ziyarah Note",
                "itineraryDays": "Itinerary Days",
                "umrahThumbnail": "Umrah Thumbnail",
                "umrahTitle": "Umrah Title",
                "umrahExcerpt": "Umrah Excerpt",
                "umrahDescription": "Umrah Description",
                "termsConditions": "Terms and Conditions",
                "subtotal": 0,
                "partialSubtotal": 0
            }
        ],
        "metadata": {
            "total": 0
        },
        "hasMore": true,
        "skip": 0
    }
}
```

**Example of Infinite Scroll:**

```
// Example React hook for infinite scroll
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [lastItemId, setLastItemId] = useState(null); // Tracks the last item ID
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        const loadMore = async () => {
            try {
                const response = await axios.post('/api', {
                    lastItemId, // Pass the lastItemId to the API
                    packageSchedule: '', // Replace with actual value
                    packageType: '', // Replace with actual value
                    packageDuration: 1, // Replace with actual value
                    dataLength: 10, // Number of items to fetch per request
                    adultTravellers: 0, // Replace with actual value
                    childTravellers: 0, // Replace with actual value
                    infantsTravellers: 0, // Replace with actual value
                });

                const { umrahPackages, hasMore: moreItemsAvailable } = response.data;

                if (umrahPackages.length > 0) {
                    setItems((prevItems) => [...prevItems, ...umrahPackages]);
                    setLastItemId(umrahPackages[umrahPackages.length - 1]._id); // Update lastItemId with the last item's ID
                }
                setHasMore(moreItemsAvailable);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const handleScroll = () => {
            if (loaderRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore) {
                    loadMore();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastItemId, hasMore]); // Re-run effect when lastItemId or hasMore changes

    return (
        <div>
            {items.map((item) => (
                <div key={item._id}>{item.title}</div>
            ))}
            <div ref={loaderRef}></div>
        </div>
    );
};

export default InfiniteScroll;


export default InfiniteScroll;

```
