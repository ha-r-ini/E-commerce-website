const host = import.meta.env.VITE_HOST

export const getUserById = async (userID, token) => {

    const response = await fetch(
        `${host}/600/users/${userID}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user")
    }

    return data
}