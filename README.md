# Knearby Base

# Getting Started

## APIs

### Eventbrite
Get your API key and place it in a `.env` file at the root of this repository such that the line looks like:

```
EVENTBRITE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### APIs

- Get events

### Google
Get your API key, enable Google Places API, and place it in a `.env` file at the root of this repository such that the line looks like:

```
GOOGLE_PLACES_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### APIs

- Get places

### Meetup
Get your API key and place it in a `.env` file at the root of this repository such that the line looks like:

```
MEETUP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Get Events

- Get events

**Notes**
- To modify the search parameters, open the file and change the query options
- With each request, the request is hashed and the data is saved locally to avoid sending too many requests to the API - you will find the JSON files in the directory with the name being the script being run followed by a hash of the request string