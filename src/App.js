import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import './App.css';
import SummaryForm from './pages/summary/SummaryForm';
import { OrderDetailsProvider } from './contexts/OrderDetails';
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/*summary and entry page need provider confirmation page does not*/}
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
