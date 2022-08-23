import { forwardRef } from 'react'
import css from './Input.module.scss'

const Input = forwardRef(
  (
    {
      config: {
        type,
        key,
        value,
        error,
        placeholder,
        onBlur,
        onKeyDown,
        onChange,
      },
    },
    ref
  ) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          name={key}
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
