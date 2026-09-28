import '@testing-library/jest-dom';

// Polyfill web standards for Jest if needed
if (typeof global.Request === 'undefined') {
  global.Request = (globalThis as any).Request || (class Request {
    url: string;
    headers: any;
    constructor(input: any, init?: any) {
      this.url = typeof input === 'string' ? input : input?.url || 'http://localhost';
      this.headers = init?.headers || {};
    }
  } as any);
}

if (typeof global.Response === 'undefined') {
  global.Response = (globalThis as any).Response || (class Response {
    static json(data: any, init?: any) {
      return { data, ...init };
    }
  } as any);
}

if (typeof global.Headers === 'undefined') {
  global.Headers = (globalThis as any).Headers || (class Headers {
    map = new Map();
    constructor(init?: any) {
      if (init) Object.entries(init).forEach(([k, v]) => this.map.set(k.toLowerCase(), v));
    }
    get(name: string) {
      return this.map.get(name.toLowerCase());
    }
  } as any);
}

// Global mocks
global.fetch = jest.fn();

beforeAll(() => {
  // Any setup needed before tests run
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  // Cleanup
});
