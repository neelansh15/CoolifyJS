import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CoolifySDK',
      formats: ['es', 'cjs'],
      fileName: (format) => `coolify-sdk.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [],
    },
    sourcemap: true,
    minify: false,
  },
});
