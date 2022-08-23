import Form from './components/Form/Form'
import useInput from './hooks/useInput.js'
import Input from './components/Form/Input'

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

const App = () => {
  const formSubmit = value => {
    console.log({ value })
  }

  return (
    <Form submit={formSubmit}>
      {[
        {
          state: useInput(validateName),
          Input,
          name: 'key',
        },
        {
          state: useInput(validateEmail),
          Input,
          name: 'key',
        },
        {
          state: useInput(validatePassword),
          Input,
          name: 'key',
        },
      ]}
    </Form>
  )
}

export default App
