import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostsList from './components/post';
import Header from './components/header/header';
import Counter from './components/counter';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="posts" element={<PostsList />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
