import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { Zoom_cred_sdk } from '../constants/Zoom_cred_sdk1';
import fetch from 'node-fetch';

const meeting = () => {
    const router = useRouter();
    const backEndURl = 'https://salestine.onrender.com';
    let at;
    useEffect(() => {
        if(!router.isReady) return;
        at=router.query.accessToken;
        const loadZoom = async () => {
            console.log('Loading Zoom Web SDK...');
            const { ZoomMtg } = await import('@zoomus/websdk');
            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();
            // loads language files, also passes any error messages to the ui
            ZoomMtg.i18n.load('en-US');
            ZoomMtg.i18n.reload('en-US');
        }
        loadZoom().then(() => {
            joinMeeting();
        });
    }, [router.isReady]);

    const joinMeeting = () => {
        const meetingId = router.query.meetingId;
            const meetingPassword = router.query.meetingPassword;
            console.log(meetingId);
            console.log(meetingPassword);

            fetch(`${backEndURl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    meetingNumber: meetingId,
                    role: 0
                })
                }).then(res => res.json())
                .then(async response => {
                console.log(response.sdkJWT)
                const signature = response.sdkJWT;
                await startMeeting(signature)
                return signature;
                }).catch(error => {
                console.error(error)
                })

            const startMeeting = async (res) => {
                ZoomMtg.init({
                    leaveUrl: `${backEndURl}/calls`,
                    success: async (data) => {
                        console.log('Zoom SDK initialized.');
                        console.log(at);
                        const result = fetch(`${backEndURl}/api/getUserDetails`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            },
                                        body: JSON.stringify({
                                            accessToken: at,
                                        }),
                                        });
                                        if (result.ok) {
                                            const data = await result.json();
                                            console.log(data);
                                            fetch(`${backEndURl}/api/storeMeetId`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    meetingNumber: meetingId,
                                                    email: data.email,
                                                })
                                                }).then(res => res.json())
                                                .then(async response => {
                                                console.log(response)
                                                }).catch(error => {
                                                console.error(error)
                                                })
                                            ZoomMtg.join({
                                                meetingNumber: meetingId,
                                                userName: data.display_name,
                                                signature: res,
                                                sdkKey: Zoom_cred_sdk.SDK.KEY,
                                                passWord: meetingPassword,
                                                userEmail: data.email,
                                                success: (success) => {
                                                    console.log(success)
                                                },
                                                error: (error) => {
                                                    console.log(error)
                                                }
                                            })
                                        }
                                        else {
                                            console.log("error");
                                        }
                    },
                })
            }
        }
    return (
        <div>
            <h1>Please wait joining meet....</h1>
        </div>
    )
}

export default meeting;
