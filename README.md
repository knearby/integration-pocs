# Knearby Proof-of-Concepts

# APIs

## Eventbrite
Get your API key and place it in a `.env` file at the root of this repository such that the line looks like:

```
EVENTBRITE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Available APIs

- [Get events](./apis/eventbrite/get-events.js)

## Google
Get your API key, enable Google Places API, and place it in a `.env` file at the root of this repository such that the line looks like:

```
GOOGLE_PLACES_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Available APIs

- [Get places](./apis/google/get-places.js)

## Meetup
Get your API key and place it in a `.env` file at the root of this repository such that the line looks like:

```
MEETUP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Available APIs

- [Get events](./apis/meetup/get-events.js)

**Notes**
- To modify the search parameters, open the file and change the query options
- With each request, the request is hashed and the data is saved locally to avoid sending too many requests to the API - you will find the JSON files in the directory with the name being the script being run followed by a hash of the request string

# Components

In [the components directory](./components), run:

```sh
npm install;
```

This will install all required testing dependencies.

## Geohasher
Geohashing is a method used to force a latitude and longitude into an easily searchable string.

This method takes a binary search approach to the latitude and longitude starting at -90/+90 and -180/+180 and zoning in on a latitude and longitude based on whether the bit is 1 (take the upper half) or 0 (take the lower half).

# Platforms

## Firebase Cloud Functions
Confirm that you have NPM installed, then install the Firebase CLI tools:

```sh
npm install -g firebase-tools;
```

Follow instructions in the [Firebase POC directory](./platforms/firebase) for more.
