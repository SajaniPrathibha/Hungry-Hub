import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css'

function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [model, setModel] = useState('salad_model'); // Default model
  const [weeks, setWeeks] = useState(5); // Default number of weeks
  
  const [uploadDate, setUploadDate] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const [modelFiles, setModelFiles] = useState({
    salad_model: null,
    sandwich_model: null,
    pasta_model: null,
    rice_bowl_model: null,
    beverages_model: null,
    desert_model: null,
    other_snacks_model: null,
  });

  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchUploadDates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/forecast/last-upload');
        const data = response.data;

        const matched = data.find(item => item.modelName === `${model}.pkl`);

        if (matched) {
          const uploadedDate = new Date(matched.uploadDate);
          const now = new Date();
          const diffInMs = now - uploadedDate;
          const weeksPassed = diffInMs / (1000 * 60 * 60 * 24 * 7);

          const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };

          setUploadDate(uploadedDate.toLocaleString('en-US', options));

          // 🔔 Show popup if it's been over 10 weeks
          if (weeksPassed > 10) {
            alert('⚠️ It has been more than 10 weeks. Please upload new files to get results for the next 10 weeks.');
          }

        }
      } catch (error) {
        console.error('Error fetching upload dates:', error);
      }
    };

    fetchUploadDates();
  }, [model]);
 // refetch whenever selected model changes


  const handleFileChange = (event, modelName) => {
    const file = event.target.files[0];
    setModelFiles(prev => ({
      ...prev,
      [modelName]: file,
    }));
  };

  const uploadAllModels = async () => {
    const missingModels = Object.entries(modelFiles)
      .filter(([_, file]) => !file)
      .map(([modelName, _]) => modelName.replace('_model', '').replaceAll('_', ' '));

    if (missingModels.length > 0) {
      setUploadStatus(`Please upload models for: ${missingModels.join(', ')}`);
      return;
    }

    function formatDate(date) {
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    for (const [modelName, file] of Object.entries(modelFiles)) {
      const formData = new FormData(); // Moved inside the loop ✅
      formData.append("modelFile", file);
      formData.append("modelName", modelName); // Optional if backend needs to know which model

      try {
        const response = await axios.post('http://localhost:4000/api/forecast/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log(`${modelName} uploaded successfully`);
        }
      } catch (error) {
        console.error(`Error uploading ${modelName}:`, error);
        setUploadStatus(`Error uploading ${modelName}`);
        return;
      }
    }

    setUploadStatus('All models uploaded successfully!');
    setUploadDate(formatDate(new Date())); // ✅ Set the upload date here
    setPopupOpen(false);
  };


  const fetchForecast = async () => {
    try {
      console.log(model);

      const response = await axios.post('http://localhost:4000/api/forecast', {
        model: model,
        weeks: weeks,
      });

      if (response.status === 200) {
        setForecast(response.data);
      } else {
        console.error('Failed to fetch forecast');
      }
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleWeeksChange = (event) => {
    setWeeks(event.target.value);
  };
  // Prevent text input, only allow number input through increment/decrement
  const preventTextInput = (event) => {
    event.preventDefault();
  };

  return (
    <div className="forecast-container">
      <h1>Forecast Prediction</h1>

      <div className="upload-section">
        <p>upload the files after every 10 weeks</p>

        {uploadDate && (
          <p><strong>Last Uploaded:</strong> {uploadDate || 'No date loaded'}</p>

        )}

        <button onClick={() => setPopupOpen(true)}>Upload Models</button>

        {popupOpen && (
          <div className="popup" ref={popupRef}>
            <h3>Upload All Models (.pkl)</h3>
            {Object.keys(modelFiles).map((modelKey) => (
              <div key={modelKey}>
                <label>{modelKey.replace('_model', '').replaceAll('_', ' ')} Model:</label>
                <input
                  type="file"
                  accept=".pkl"
                  onChange={(e) => handleFileChange(e, modelKey)}
                />
              </div>
            ))}
            <button onClick={uploadAllModels}>Upload All</button>
            <p>{uploadStatus}</p>
          </div>
        )}
      </div>

      <label htmlFor="model-select">Choose a Category:</label>
      <select id="model-select" value={model} onChange={handleModelChange}>
        <option value="salad_model">Salad Category</option>
        <option value="sandwich_model">Sandwich Category</option>
        <option value="pasta_model">Pasta Category</option>
        <option value="rice_bowl_model">Rice Category</option>
        <option value="beverages_model">Beverages Category</option>
        <option value="desert_model">Desert Category</option>
        <option value="other_snacks_model">Others Category</option>

      </select>

      <label htmlFor="weeks-input">Weeks to Forecast:</label>
      <input
        type="number"
        id="weeks-input"
        value={weeks}
        onChange={handleWeeksChange}
        onKeyDown={preventTextInput} // Prevent manual text input
        onPaste={preventTextInput} // Prevent paste
        min="1"
        max="10"
        step="1"

      />

      <button onClick={fetchForecast}>Get Forecast</button>

      {forecast && (
        <div>
          <h2>Forecasted Value:</h2>
          <table border={1}>
            <thead>
              <tr>
                <th>Week</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Forecast;