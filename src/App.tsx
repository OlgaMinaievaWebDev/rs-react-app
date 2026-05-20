import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Details } from './pages/Details';
import { Navbar } from './components/Navbar';
import { StyledAppShell } from './App.styles';

export default function App() {
  return (
    <StyledAppShell>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledAppShell>
  );
}
