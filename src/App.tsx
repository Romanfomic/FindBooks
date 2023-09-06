import React from 'react';
import { Books } from './components/Books';
import { Searcher } from './components/Searcher'

function App() {
  return (
    <div>
      <div>
        <Searcher/>
      </div>
      <Books/>
    </div>
  );
}

export default App;
