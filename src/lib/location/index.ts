export interface LocationProvider {
  geocode(address: string): Promise<{ lat: number; lng: number }>;
  reverseGeocode(lat: number, lng: number): Promise<{ city?: string; country?: string }>;
  getWeather(lat: number, lng: number): Promise<any>;
}

export class DemoLocationProvider implements LocationProvider {
  async geocode(address: string): Promise<{ lat: number; lng: number }> {
    return { lat: 40.7128, lng: -74.0060 }; // NYC
  }

  async reverseGeocode(lat: number, lng: number): Promise<{ city?: string; country?: string }> {
    return { city: 'New York', country: 'USA' };
  }

  async getWeather(lat: number, lng: number): Promise<any> {
    return {
      temperature: 22,
      condition: 'Sunny'
    };
  }
}

export async function recordLocationEvent(userId: string, lat: number, lng: number, eventType: string, occasion?: string) {
  console.log(`Recording location event for user ${userId} at [${lat}, ${lng}]: ${eventType}`);
  // Implement recording to DB here
}

export async function getAggregatedLocations() {
  return [
    { lat: 40.7128, lng: -74.0060, count: 50 },
    { lat: 34.0522, lng: -118.2437, count: 30 },
    { lat: 51.5074, lng: -0.1278, count: 40 }
  ];
}
