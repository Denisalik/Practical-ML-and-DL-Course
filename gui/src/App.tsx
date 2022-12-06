import React from 'react';

function App() {
    const [files, setFiles] = React.useState<File[]>([]);
    const [results, setResults] = React.useState<string[]>([]);
    const [count, setCount] = React.useState<number>(-1);
    const updateFiles = (old: File[], current: FileList | null): File[] => {
        const duplicates = [...Array.from(current || []), ...old];
        return [...new Set(duplicates)];
    }
    const handleClickImage = () => {
        const formData = new FormData();
        files.forEach(file => formData.append(`files`, file))
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const url = 'http://localhost:8080/predict/image';
        fetch(url, requestOptions)
            .then(r => r.json())
            .then(res => setResults(res))
    }
    const handleClickCount = () => {
        const formData = new FormData();
        files.forEach(file => formData.append(`files`, file))
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const url = 'http://localhost:8080/predict/count';
        fetch(url, requestOptions)
            .then(r => r.json())
            .then(res => setCount(res))
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
            <button onClick={handleClickImage}>Show Images</button>
            <button onClick={handleClickCount}>Show Count</button>
            {count !== -1 && (
                <div>
                    Animal count: {count}
                </div>
            )}
            {results.length > 0 && (
                <div>
                    {results.map((img) => <img width={800} src={`data:image/jpeg;base64,${img}`} alt={img}/>)}
                </div>
            )}
        </div>
    );
}

export default App;
