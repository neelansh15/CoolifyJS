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
      name: 'CoolifyJS',
      formats: ['es', 'cjs'],
      fileName: (format) => `coolifyjs.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [],
    },
    sourcemap: true,
    minify: false,
  },
});
