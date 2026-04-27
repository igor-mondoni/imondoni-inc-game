import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ClickerPanel from './ClickerPanel'

describe('ClickerPanel', () => {
  it('deve renderizar o valor do clickpower', () => {
    render(<ClickerPanel onManualClick={() => {}} clickpower={1.5} />)

    expect(screen.getByRole('button', { name: /\+1.5 dp/i })).toBeInTheDocument()
  })

  it('deve chamar onManualClick ao clicar', async () => {
    const user = userEvent.setup()
    const onManualClick = vi.fn()

    render(<ClickerPanel onManualClick={onManualClick} clickpower={1} />)

    await user.click(screen.getByRole('button', { name: /\+1 dp/i }))
    expect(onManualClick).toHaveBeenCalledTimes(1)
  })
})