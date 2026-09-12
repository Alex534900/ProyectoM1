import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import FormularioTarea from './FormularioTarea'

describe('FormularioTarea', () => {
  it('llama a onAgregar con el texto escrito por el usuario', async () => {
    const onAgregar = vi.fn()
    const usuario = userEvent.setup()

    render(<FormularioTarea onAgregar={onAgregar} />)

    const input = screen.getByLabelText('Nueva tarea')

    await usuario.type(input, 'Comprar pan')
    await usuario.click(screen.getByText('Agregar'))

    expect(onAgregar).toHaveBeenCalledWith('Comprar pan')
  })

  it('no llama a onAgregar si el campo esta vacio', async () => {
    const onAgregar = vi.fn()
    const usuario = userEvent.setup()

    render(<FormularioTarea onAgregar={onAgregar} />)

    await usuario.click(screen.getByText('Agregar'))

    expect(onAgregar).not.toHaveBeenCalled()
  })
})

it('no permite agregar una tarea con solo espacios', async () => {
  const onAgregar = vi.fn()
  const usuario = userEvent.setup()

  render(<FormularioTarea onAgregar={onAgregar} />)

  const input = screen.getByLabelText('Nueva tarea')

  await usuario.type(input, '   ')
  await usuario.click(screen.getByText('Agregar'))

  expect(onAgregar).not.toHaveBeenCalled()
})