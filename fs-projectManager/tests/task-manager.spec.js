import { test, expect } from '@playwright/test';

test('usuario puede iniciar sesión y crear una tarea', async ({ page }) => {

  // Entrar a la aplicación
  await page.goto('/');


  // Ingresar correo del usuario de prueba
  await page
    .getByPlaceholder('Usuario')
    .fill('jhon@test.com');


  // Ingresar contraseña
  await page
    .getByPlaceholder('Contraseña')
    .fill('123456');


  // Presionar botón iniciar sesión
  await page
    .getByRole('button', { name: 'Iniciar sesión' })
    .click();


  // Verificar que ingresó al sistema
  await expect(
    page.getByText('Task Manager')
  ).toBeVisible();


  // Escribir una nueva tarea
  await page
    .getByPlaceholder('Escribe una nueva tarea')
    .fill('Preparar laboratorio Playwright');


  // Presionar botón Agregar
  await page
    .getByRole('button', { name: 'Agregar' })
    .click();


  // Verificar que la tarea fue creada
  await expect(
    page.getByText('Preparar laboratorio Playwright')
  ).toBeVisible();

});