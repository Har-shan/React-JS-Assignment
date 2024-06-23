import React, { useState } from 'react';

function BasicDynamicForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be greater than 0';
    if (formData.attendingWithGuest && !formData.guestName) {
      newErrors.guestName = 'Guest name is required';
    }
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label>
          Are you attending with a guest?
          <input type="checkbox" name="attendingWithGuest" checked={formData.attendingWithGuest} onChange={handleChange} />
        </label>
      </div>
      {formData.attendingWithGuest && (
        <div>
          <label>
            Guest Name:
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
          </label>
          {errors.guestName && <p>{errors.guestName}</p>}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default BasicDynamicForm;
