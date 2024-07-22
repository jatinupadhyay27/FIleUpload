import React from 'react';
import FileUpload from './component/FIleUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl text-center mt-5 font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent ">File Upload And Download</h1>
      </header>
      <main className="p-4">
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
