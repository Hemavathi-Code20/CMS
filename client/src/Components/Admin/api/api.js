const BASE_URL = 'http://localhost:5000/api/users';

const api = {
  getUsers: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  },

  addUser: async (user) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: user, // Send the FormData directly
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      throw error; // Rethrow or handle it as needed
    }
  },

  updateUser: async (id, user) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: user, // Send the FormData directly
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  },
};

export default api;
