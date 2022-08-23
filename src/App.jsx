import Form from './components/Form/Form'

const App = () => {
  const formSubmit = value => {
    console.log({ value })
  }

  return <Form submit={formSubmit} />
}

export default App
