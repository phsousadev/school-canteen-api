import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts'],
  outDir: 'build',
  format: ['cjs'],
  target: 'es2020',
  clean: true,
  sourcemap: true,
  external: ['vitest'],
  skipNodeModulesBundle: true,
})
