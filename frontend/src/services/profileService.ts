const API_BASE_URL = '/api';

class ProfileService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile service error:', error);
      throw error;
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      return await response.json();
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  }

  async updateStudyInterests(interests) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/interests`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({ interests }),
      });

      if (!response.ok) {
        throw new Error('Failed to update study interests');
      }

      return await response.json();
    } catch (error) {
      console.error('Study interests update error:', error);
      throw error;
    }
  }

  async updateAvailability(availability) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/availability`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({ availability }),
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      return await response.json();
    } catch (error) {
      console.error('Availability update error:', error);
      throw error;
    }
  }

  async deleteProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile deletion error:', error);
      throw error;
    }
  }
}

export default new ProfileService(); 