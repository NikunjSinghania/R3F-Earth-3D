import './App.css';
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Earth } from './compenents/earth'
import Content from './compenents/content'
function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
      <Content />
    </div>
  );
}

export default App;
