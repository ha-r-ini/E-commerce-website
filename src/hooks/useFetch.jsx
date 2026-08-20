import { useState, useEffect } from "react"
import { toast } from 'react-toastify';

const useFetch = (url) => {

    const [product, setProduct] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`error: ${response.status} status code`)
                }

                const data = await response.json()
                setProduct(data);

            } catch (error) {
                setError(error)
                toast.error(`error: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }
        fetchData()


    }, [url])

    return { product, error, loading }
}

export default useFetch