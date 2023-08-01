import { Route, Routes } from 'react-router-dom'
import Header from './components/common/TheHeader'
import Footer from './components/common/TheFooter'
import PersonalColor from './routes/PersonalColor/PersonalColor'
import SignUp from './routes/SignUp'
import Cart from "./routes/Cart/Cart"

function App() {
  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/PersonalColor' element={<PersonalColor />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Cart' element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
