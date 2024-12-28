import { ToastContainer } from 'react-toastify';
import './App.css';
import DataTableComponent from './DataTable';
import FileUpload from './FileUpload';

function App() {
  return (
    <div>
      <ToastContainer />
      <div className='text-xl text-center py-6 font-bold bg-gray-200'>Client Records Management Application</div>
      <FileUpload />
      <DataTableComponent />
    </div>
  );
}

export default App;
