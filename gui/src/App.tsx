import React from 'react';

function App() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [results, setResults] = React.useState<File[]>([]);
  const [count, setCount] = React.useState<number>(-1);
  const updateFiles = (old: File[], current: FileList | null): File[] => {
    const duplicates = [...Array.from(current || []), ...old];
    return [...new Set(duplicates)];
  }
  const handleClick = () => {
      const formData = new FormData();
      files.forEach(file => formData.append(`files`, file))
      const requestOptions = {
          method: 'POST',
          body: formData
      };
      const url = 'localhost:3000';
      fetch(url, requestOptions)
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <div>
            <h2>Upload files</h2>
        </div>
        <div>
            <input
                id='fileUpload'
                type='file'
                multiple
                accept='image/jpeg, image/png'
                placeholder={'Upload files'}
                onChange={(e) => setFiles(updateFiles(files, e.target.files))}
            />
        </div>
      <div>
        {files.map(file => (
            <div>
              {file.name}
            </div>
        ))}
      </div>
        <button onClick={handleClick}>Send Images</button>
        {count !== -1 && (
            <div>
                Animal count: {count}
            </div>
        )}
        {results.length > 0 && (
            <div>
                {results.map(f => f.name)}
            </div>
        )}
    </div>
  );
}

export default App;
