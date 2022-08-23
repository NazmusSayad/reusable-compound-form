import css from './Signup.module.scss'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'

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

const inputList = [
  {
    validator: validateName,
    Input,
    key: 'firstname',
    type: 'text',
    placeholder: 'FirstName',
  },
  {
    validator: validateName,
    Input,
    key: 'lastname',
    type: 'text',
    placeholder: 'LastName',
  },
  {
    validator: validateEmail,
    Input,
    key: 'email',
    type: 'email',
    placeholder: 'email',
  },
  {
    validator: validatePassword,
    Input,
    key: 'password',
    type: 'password',
    placeholder: 'password',
  },
]

const Signup = ({ submit }) => (
  <div className={css.signup}>
    <Form submit={submit} inputList={inputList} />
  </div>
)

export default Signup
