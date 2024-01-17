import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RedirectionPage from './pages/RedirectionPage';

function App() {
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/redirect" element={<RedirectionPage />} />
    </Routes>;

    return <LoginPage />;
}

export default App;
