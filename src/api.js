// development url: http://localhost:3000
// production url: https://backend-workasana.vercel.app

export const baseUrl = `https://backend-workasana.vercel.app`;
// -------------------------------------------------------------------------
export async function signup(payload) {
    
    try {
        const response = await fetch(`https://backend-workasana.vercel.app/auth/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Signup failed.")
        }

        const data = await response.json();
        if (data) {
            return data;
        }

    } catch (error) {
        throw error;
    }
}
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
export async function login(payload) {
    try {
        const response = await fetch(`https://backend-workasana.vercel.app/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Login failed.")
        }
        const {token} = await response.json();
        return token;
    } catch (error) {
        throw error;
    }
}
// -------------------------------------------------------------------------