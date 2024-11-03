import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);

  // Fetch usernames from server on component mount
  useEffect(() => {
    fetch('http://localhost:5000/usernames')
      .then(response => response.json())
      .then(data => {
        if (data.u_name_list) {
          setUsernames(data.u_name_list.map(name => ({ name, checked: false })));
        }
      })
      .catch(error => console.error('Error fetching usernames:', error));
  }, []);

  const handleAdd = () => {
    if (username.trim() && usernames.length < 100) {
      setUsernames([...usernames, { name: username, checked: false }]);
      setUsername('');
    }
  };

  const toggleCheckbox = (index) => {
    const updatedUsernames = [...usernames];
    updatedUsernames[index].checked = !updatedUsernames[index].checked;
    setUsernames(updatedUsernames);
  };

  const deleteUser = async () => {
    const updatedUsernames = usernames.filter(user => !user.checked);
    setUsernames(updatedUsernames);

    try {
      await fetch('http://localhost:5000/update-usernames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: updatedUsernames.map(user => user.name) }),
      });
      console.log('Usernames updated on the server:', updatedUsernames.map(user => user.name));
    } catch (error) {
      console.error('Error updating usernames on server:', error);
      alert('Failed to update usernames on server');
    }
  };

  const handleSave = async () => {
    try {
      await fetch('http://localhost:5000/update-usernames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: usernames.map(user => user.name) }),
      });
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Manage Usernames</h2>
        <div className="input-section">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            maxLength="50"
          />
          <button onClick={handleAdd} disabled={usernames.length >= 100}>
            Add
          </button>
        </div>

        <div className="username-list">
          {usernames.map((user, index) => (
            <div key={index} className="username-item">
              <input
                type="checkbox"
                checked={user.checked}
                onChange={() => toggleCheckbox(index)}
              />
              <span>{user.name}</span>
            </div>
          ))}
        </div>

        <button className="butt" onClick={deleteUser} disabled={usernames.every(user => !user.checked)}>
          Delete Checked
        </button>

        <button onClick={handleSave} disabled={usernames.length === 0}>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
