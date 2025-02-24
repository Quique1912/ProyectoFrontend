//const URL_BASE = 'http://localhost:3000/api/'
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class AuthService {
    static async loginUser(email: string, password: string) {

        try {
            const response = await fetch(API_URL_BASE + '/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include'
                }
            )
            if (!response.ok) {
                throw new Error('Error al iniciar sesión')
            }
            return await response.json()

        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error desconocido'
            throw new Error(msg)
        }
    }
}