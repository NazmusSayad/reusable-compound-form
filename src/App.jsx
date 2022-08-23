import Signup from './layouts/Signup/Signup'

const App = () => {
  const getSignUpInfo = info => {
    console.log(info)
  }

  return <Signup submit={getSignUpInfo} />
}

export default App
