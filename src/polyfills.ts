// Polyfills for Node.js modules in browser environment

// Define global if it doesn't exist
if (typeof global === 'undefined') {
  (window as any).global = window;
}

// Define Buffer if it doesn't exist
if (typeof Buffer === 'undefined') {
  try {
    (window as any).Buffer = require('buffer').Buffer;
  } catch (e) {
    // Fallback if buffer module is not available
    console.warn('Buffer polyfill not available');
  }
}

// Define process if it doesn't exist
if (typeof process === 'undefined') {
  try {
    (window as any).process = require('process');
  } catch (e) {
    // Fallback if process module is not available
    (window as any).process = { env: {} };
  }
} 