const API_BASE_URL = 'https://cluj-party-mapster.lovable.app';

export const apiService = {
    async login(name) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async getUserData(name) {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${name}`);

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch user data error:', error);
            throw error;
        }
    }
};
