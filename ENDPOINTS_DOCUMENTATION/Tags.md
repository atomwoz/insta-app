# TAG API Endpoints

## GET /api/tags/raw

Returns all tags.

### Request

No parameters required.

### Response

Returns a JSON array of all tags.

## GET /api/tags

Returns the first N tags.

### Request

No parameters required.

### Response

Returns a JSON array of the first N tags.

## GET /api/tags/{nTAGS}

Returns the first nTAGS tags.

### Request

- nTAGS: The number of tags to return.

### Response

Returns a JSON array of the first nTAGS tags.

## POST /api/tags

Creates a new tag.

### Request

- Body: A JSON object containing the tag data.

### Response

Returns a JSON object of the created tag.

## PATCH /api/tags/photo?id={id}

Updates the tags of a photo.

### Request

- id: The ID of the photo to update.

### Response

Returns a JSON object of the updated photo.