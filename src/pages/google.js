import { useEffect } from "react"
import { useRouter } from "next/router"
import fetch from "node-fetch"

const google = () => {

    const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
    const router = useRouter()
    useEffect(() => {
        if(!router.isReady) return;
        const email = localStorage.getItem('email')
        const { code } = router.query
        fetch(`${BACK_END_URL}/googleAuth`, {
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