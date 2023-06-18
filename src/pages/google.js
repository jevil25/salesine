import { useEffect } from "react"
import { useRouter } from "next/router"
import fetch from "node-fetch"

const google = () => {

    const router = useRouter()
    useEffect(() => {
        if(!router.isReady) return;
        const email = localStorage.getItem('email')
        const { code } = router.query
        fetch("api/googleAuth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: code ,email: email })
            })
            .then(res => res.json())
            .then(data => {
                router.push('/')
            }).catch(err => {
                console.log(err)
            }
        )
    }, [router.isReady])

    return (
        <div>
            <h1>Checking Google Authorization.....</h1>
        </div>
    )
}

export default google