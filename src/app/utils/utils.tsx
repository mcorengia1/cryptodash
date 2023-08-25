export async function setFromRequest(URL: string, setFunction: any) {
    try {
        const response = await fetch(URL)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setFunction(data)
        return 200

    } catch (error) {
        console.error('Error fetching coins list:', error)
        return 1
    }
};