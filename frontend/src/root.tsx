import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import { App } from './App';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/Login';
import { RegisterPage } from './components/pages/RegisterPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  </Router>
);
