import React, { useState, useEffect } from 'react';
import './App.css';

function AdvancedDynamicForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: []
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/survey-questions?topic=${topic}`);
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.feedback || formData.feedback.length < 50) {
      newErrors.feedback = 'Feedback must be at least 50 characters';
    }
    if (formData.surveyTopic === 'Technology' && !formData.favoriteProgrammingLanguage) {
      newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
    }
    if (formData.surveyTopic === 'Technology' && (!formData.yearsOfExperience || formData.yearsOfExperience <= 0)) {
      newErrors.yearsOfExperience = 'Years of Experience must be greater than 0';
    }
    if (formData.surveyTopic === 'Health' && !formData.exerciseFrequency) {
      newErrors.exerciseFrequency = 'Exercise Frequency is required';
    }
    if (formData.surveyTopic === 'Health' && !formData.dietPreference) {
      newErrors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education' && !formData.highestQualification) {
      newErrors.highestQualification = 'Highest Qualification is required';
    }
    if (formData.surveyTopic === 'Education' && !formData.fieldOfStudy) {
      newErrors.fieldOfStudy = 'Field of Study is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(JSON.stringify({ ...formData, additionalQuestions }, null, 2));
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
          Survey Topic:
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </label>
      </div>
      {formData.surveyTopic === 'Technology' && (
        <>
          <div>
            <label>
              Favorite Programming Language:
              <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange}>
                <option value="">Select</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
            </label>
            {errors.favoriteProgrammingLanguage && <p>{errors.favoriteProgrammingLanguage}</p>}
          </div>
          <div>
            <label>
              Years of Experience:
              <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
            </label>
            {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
          </div>
        </>
      )}
      {formData.surveyTopic === 'Health' && (
        <>
          <div>
            <label>
              Exercise Frequency:
              <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
            </label>
            {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
          </div>
          <div>
            <label>
              Diet Preference:
              <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </label>
            {errors.dietPreference && <p>{errors.dietPreference}</p>}
          </div>
        </>
      )}
      {formData.surveyTopic === 'Education' && (
        <>
          <div>
            <label>
              Highest Qualification:
              <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </label>
            {errors.highestQualification && <p>{errors.highestQualification}</p>}
          </div>
          <div>
            <label>
              Field of Study:
              <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
            </label>
            {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
          </div>
        </>
      )}
      <div>
        <label>
          Feedback:
          <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
        </label>
        {errors.feedback && <p>{errors.feedback}</p>}
      </div>
      {additionalQuestions.map((question, index) => (
        <div key={index}>
          <label>
            {question.text}
            <input type={question.type} name={`additionalQuestion_${index}`} value={formData[`additionalQuestion_${index}`] || ''} onChange={handleChange} />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Survey Form</h1>
      </header>
      <main>
        <AdvancedDynamicForm />
      </main>
    </div>
  );
}


export default AdvancedDynamicForm;
