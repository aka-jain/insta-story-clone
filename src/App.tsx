import './App.scss'
import StageComponent from './components/StageComponent'

function App() {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-center text-xl mt-1 font-medium text-gray-700'>Stage</h1>
      <StageComponent />
    </div>
  )
}

export default App
