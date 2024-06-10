
import "./App.css";

import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { LocalizationProvider } from '@mui/x-date-pickers';
// If you are using date-fns v2.x, please import `AdapterDateFns`
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// If you are using date-fns v3.x, please import `AdapterDateFnsV3`
import Router from "./routes/sections";
import ThemeProvider from "./theme";
import { ToastContainer, toast } from "react-toastify"; // Correct import
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  useScrollToTop();

  return (
    
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer />
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
