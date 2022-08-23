import { forwardRef } from 'react'
import css from './Input.module.scss'

const Input = forwardRef(
  (
    { type, name, value, placeholder, onBlur, onChange, error, onKeyDown },
    ref
  ) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
          autoComplete="off"
        />

        <p>{error}</p>
      </div>
    )
  }
)

export default Input
