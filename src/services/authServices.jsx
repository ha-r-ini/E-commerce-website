const host = import.meta.env.VITE_HOST

export const loginUser = async (formData) => {

    const response = await fetch(`${host}/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    })


    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Invalid email or password")
    }

    return data

}

export const RegisterUser = async (formData) => {
    const response = await fetch(`${host}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
    })

    console.log("REGISTER data:", response)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Registration failed")
    }

    return data
}