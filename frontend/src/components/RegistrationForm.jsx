import { useMemo, useState } from 'react';

const initialFormState = {
  fullName: '',
  gender: 'male',
  institution: '',
  phone: '',
  email: ''
};

const RegistrationForm = ({ telegramUser }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_URL || 'http://localhost:5000',
    []
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!telegramUser?.id) {
      setStatus({
        type: 'error',
        message: 'Telegram user data not found. Please open this in Telegram.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          telegramUser
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed.');
      }

      setStatus({
        type: 'success',
        message: result.message || 'Registration successful.'
      });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />
      </label>

      <label>
        Gender
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Institution
        <input
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          placeholder="University / Company"
          required
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 555 123 4567"
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Register'}
      </button>

      {status.message ? (
        <p className={`status-message ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
};

export default RegistrationForm;
