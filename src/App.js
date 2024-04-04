import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomaPage';
import PurchaseRegistrationPage from './pages/PurchaseRegistrationPage';
import DepartmentTable from './components/DepartmentTable/DepartmentTable';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='ახალი შესყიდვა' element={<PurchaseRegistrationPage/>} />
        <Route path='დეპარტამენტები' element={<DepartmentTable/>} />
        <Route path='თანამშრომლები' element={<EmployeeTable/>} />
      </Routes>
    </>
  );
}

export default App;
