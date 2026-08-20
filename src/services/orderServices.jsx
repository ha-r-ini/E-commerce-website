const host = import.meta.env.VITE_HOST

export const getUserOrders = async (userID, token) => {

    const response = await fetch(
        `${host}/660/orders?userId=${userID}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders")
    }

    return data
}

export const createOrder = async (order, token) => {

    const response = await fetch(`${host}/660/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Failed to create order")
    }

    return data
}