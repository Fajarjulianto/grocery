// Define a type for the expected API response to ensure type safety.
// We only need the 'display_name' and 'error' properties for this example.
interface NominatimResponse {
  display_name?: string;
  error?: string;
}

/**
 * Interface for the payload (the data being sent) to the server.
 */
interface AddressPayload {
  lat: number;
  lon: number;
  label: string;
}

/**
 * Interface for the expected JSON response from the server upon a successful request.
 * You can customize this to match your API's specific response structure.
 */
interface ServerResponse {
  // success: boolean;
  message: string;
}

/**
 * Interface representing a single address object with the updated structure.
 */
interface Address {
  id: string;
  created_at: string;
  address: string;
  label: string;
  lat: string;
  lng: string;
}

export type { NominatimResponse, AddressPayload, ServerResponse, Address };
