import { defineConfig } from 'vitest/config'

export default defineConfig({

  test: {

    // Permite usar expect, describe, it sin importar desde vitest
    globals: true,

    // Necesario para probar componentes React
    environment: 'jsdom',

    // Archivo de configuración de pruebas
    setupFiles: './src/test/setup.js',

    // IMPORTANTE:
    // Solo ejecutar pruebas de Vitest
    // No incluir pruebas de Playwright
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'backend/**/*.test.ts'
    ],

    // Configuración de cobertura
    coverage: {

      // Motor de cobertura V8
      provider: 'v8',

      // Reporte en terminal y HTML
      reporter: [
        'text',
        'html'
      ],

      // Umbrales mínimos del laboratorio
      thresholds: {

        lines: 60,

        functions: 60,

        branches: 50,

        statements: 60,

      },

    },

  },

})