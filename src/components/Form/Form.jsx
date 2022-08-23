import { useEffect, useState, useRef } from 'react'
import css from './Form.module.scss'
import Input from './Input'
import useInput from '../../hooks/useInput'

const generateFormData = inputList => {
  const obj = {}
  ;[...inputList].forEach(input => {
    obj[input.config.name] = input.state.value.trim()
  })
  return obj
}
const validateName = value => {
  return [value.length > 3, 'Enter at least 4 char']
}
const validatePassword = value => {
  return [value.length > 5, 'Enter at least 6 char']
}
const validateEmail = value => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
  const status = regex.test(value.trim())
  return [status, 'Please enter a valid email.']
}

const Form = ({ submit }) => {
  const currentInputRef = useRef()
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const inputList = [
    {
      state: useInput(validateName),
      config: {
        type: 'text',
        name: 'name',
        placeholder: 'Name',
      },
    },
    {
      state: useInput(validateEmail),
      config: {
        type: 'text',
        name: 'email',
        placeholder: 'Email',
      },
    },
    {
      state: useInput(validatePassword),
      config: {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
      },
    },
  ]
  const currentInput = inputList[index]

  const handleFormSubmit = () => {
    const formData = generateFormData(inputList)
    submit(formData)
  }
  const handleNextClick = () => {
    if (!currentInput.state.isValid) return
    setIndex(prev => ++prev)
  }
  const handlePrevClick = () => {
    setIndex(prev => --prev)
  }
  const handleKeydownForEnter = e => {
    if (e.keyCode !== 13) return
    currentInput.state.set.isTouched(true)
    if (inputList.length - 1 === index) handleFormSubmit()
    else handleNextClick()
  }

  useEffect(() => {
    let successfullIndex = index
    if (currentInput.state.isValid) successfullIndex++
    setProgress(successfullIndex / inputList.length)
  }, [index, currentInput.state.isValid])

  return (
    <div className={css.formContainer}>
      <div className={css.form__progress}>
        <div style={{ width: `${progress * 100}%` }}></div>
      </div>

      <div className={css.form}>
        <div className={css.input}>
          <Input
            {...currentInput.config}
            ref={currentInputRef}
            value={currentInput.state.value}
            error={currentInput.state.error}
            onBlur={currentInput.state.handler.blur}
            onKeyDown={handleKeydownForEnter}
            onChange={currentInput.state.handler.change}
          />
        </div>

        <div className={css.control}>
          <button
            className={css.control__Prev}
            type="button"
            hidden={!index}
            onClick={handlePrevClick}
          >
            Prev
          </button>

          <button
            className={css.control__Next}
            type="button"
            disabled={!currentInput.state.isValid}
            hidden={inputList.length - 1 === index}
            onClick={handleNextClick}
          >
            Next
          </button>

          <button
            className={css.control__Submit}
            type="button"
            disabled={!currentInput.state.isValid}
            hidden={inputList.length - 1 !== index}
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form
