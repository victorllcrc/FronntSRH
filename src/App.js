import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { NavBar2 } from './components/NavBar2';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Courses } from './components/Courses';
import { useAuth } from './AuthContext'; 
import { Banner2 } from './components/Banner2';
import { Shopping } from './components/Shopping';
import { ShoppingProvider } from './ShoppingContext';
import { MyCourses } from './components/MyCourses';
import { CoursePage } from './components/CoursePage';
import { Info } from './components/Info';
import './App.css';

// Página de inicio para usuarios no autenticados
const Home = () => (
  <>
    <NavBar />
    <Banner />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
  </>
);

// Página de inicio para usuarios autenticados
const Home2= () => (
  <>
    <NavBar2 />
    <Banner2 />
    <Footer />
  </>
);


function App() {
  const { user } = useAuth(); // Obtener el estado del usuario

  return (
    <ShoppingProvider> {/* El contexto envuelve todas las rutas */}
      <Routes>
        <Route path="/" element={user ? <Home2 /> : <Home />} />
        <Route path="/course/:id" element ={<CoursePage/>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/shopping" element={<Shopping />} /> 
        <Route path="/info/:id" element={<Info />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ShoppingProvider>
  );
}

export default App;
