import React, { useState } from 'react';

function IntermediateDynamicForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: checked
          ? [...prevData.additionalSkills, value]
          : prevData.additionalSkills.filter((skill) => skill !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.portfolioURL && !/^https?:\/\/\S+\.\S+$/.test(formData.portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
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
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
        {errors.fullName && <p>{errors.fullName}</p>}
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
          Phone Number:
          <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>
          Applying for Position:
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
      </div>
      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <div>
          <label>
            Relevant Experience (years):
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
          </label>
          {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
        </div>
      )}
      {formData.position === 'Designer' && (
        <div>
          <label>
            Portfolio URL:
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
          </label>
          {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
        </div>
      )}
      {formData.position === 'Manager' && (
        <div>
          <label>
            Management Experience:
            <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
          </label>
          {errors.managementExperience && <p>{errors.managementExperience}</p>}
        </div>
      )}
      <div>
        <label>
          Additional Skills:
          <label>
            <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} />
            JavaScript
          </label>
          <label>
            <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} />
            CSS
          </label>
          <label>
            <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} />
            Python
          </label>
        </label>
        {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
      </div>
      <div>
        <label>
          Preferred Interview Time:
          <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
        </label>
        {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IntermediateDynamicForm;
