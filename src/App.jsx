import { useCallback, useState } from 'react';
import './App.css'
import MapView from './components/MapView/MapView.jsx'
import SelectedDataBox from './components/SelectedDataBox/SelectedDataBox.jsx'

function App() {

  const [selectedData, setSelectedData] = useState([]);
  
  const handleSelectData = useCallback((data) => {
    setSelectedData(prev => [...prev, data]);
  }, []);

  return (
    <>
    <div className='layout'>
      <SelectedDataBox data={selectedData} />
      <MapView onSelectData={handleSelectData}  />
    </div>

    </>
  )
}

export default App
