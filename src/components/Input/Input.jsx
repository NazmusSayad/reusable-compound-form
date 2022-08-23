import { forwardRef } from 'react'
import css from './Input.module.scss'

const Input = forwardRef(({ config }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type={config.type}
        name={config.name}
        value={config.value}
        placeholder={config.placeholder}
        onBlur={config.onBlur}
        onKeyDown={config.onKeyDown}
        onChange={config.onChange}
        autoComplete="off"
      />

      <p>{config.error}</p>
    </div>
  )
})

export default Input
