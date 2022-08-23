import { useEffect, useState, useRef, useMemo } from 'react'
import css from './Form.module.scss'
import useInput from '../../hooks/useInput'

const generateFormData = inputList => {
  const obj = {}
  ;[...inputList].forEach(input => {
    obj[input.key] = input.state.value.trim()
  })
  return obj
}

const generateInputList = inputList =>
  inputList.map(input => {
    input.state = useInput(input.validator)
    return input
  })

const Form = ({ submit, inputList }) => {
  inputList = generateInputList(inputList)

  const currentInputRef = useRef()
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const currentInput = inputList[index]
  const Input = currentInput.Input

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
            config={{
              key: currentInput.key,
              type: currentInput.type,
              placeholder: currentInput.placeholder,
              onKeyDown: handleKeydownForEnter,
              value: currentInput.state.value,
              error: currentInput.state.error,
              onBlur: currentInput.state.handler.blur,
              onChange: currentInput.state.handler.change,
            }}
            ref={currentInputRef}
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
