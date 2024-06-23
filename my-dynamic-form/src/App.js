import React, { useState } from 'react';
import BasicDynamicForm from './BasicDynamicForm';
import IntermediateDynamicForm from './IntermediateDynamicForm';
import AdvancedDynamicForm from './AdvancedDynamicForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Forms</h1>
        <div className="button-group">
          <button onClick={() => setActiveForm('basic')}>Basic Form</button>
          <button onClick={() => setActiveForm('intermediate')}>Intermediate Form</button>
          <button onClick={() => setActiveForm('advanced')}>Advanced Form</button>
        </div>
      </header>
      <main>
        {activeForm === 'basic' && <BasicDynamicForm />}
        {activeForm === 'intermediate' && <IntermediateDynamicForm />}
        {activeForm === 'advanced' && <AdvancedDynamicForm />}
      </main>
    </div>
  );
}

export default App;
