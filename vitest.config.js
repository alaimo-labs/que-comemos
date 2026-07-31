import { defineConfig } from 'vitest/config';

// Config propia (no hereda vite.config.js, cuyo root es "web").
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    setupFiles: ['tests/setup.js'],
  },
});
