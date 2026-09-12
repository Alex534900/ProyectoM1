// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  // Carpeta donde están las pruebas E2E
  testDir: './tests',

  // Ejecutar pruebas en paralelo
  fullyParallel: true,

  // Evita test.only en CI
  forbidOnly: !!process.env.CI,

  // Reintentos en CI
  retries: process.env.CI ? 2 : 0,

  // Workers
  workers: process.env.CI ? 1 : undefined,

  // Reporte HTML
  reporter: 'html',

  /*
   * Configuración general para todas las pruebas
   */
  use: {

    // Nuestra aplicación React
    baseURL: 'http://localhost:5173',

    // Guarda información si falla una prueba
    trace: 'on-first-retry',
  },


  /*
   * Navegadores donde se ejecutarán las pruebas
   */
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],


  /*
   * Levanta automáticamente el frontend antes de ejecutar Playwright
   */
  webServer: {

    command: 'npm run dev',

    url: 'http://localhost:5173',

    reuseExistingServer: true,

  },

});