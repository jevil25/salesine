const joinMeeting   = async () => {
    let zoom;

  useEffect(() => {
    const loadZoom = async () => {
      const { ZoomMtg } = await import('@zoomus/websdk');
      zoom = ZoomMtg;
      zoom.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');
      zoom.preLoadWasm();
      zoom.prepareWebSDK();
      // loads language files, also passes any error messages to the ui
      zoom.i18n.load('en-US');
      zoom.i18n.reload('en-US');
    }
    loadZoom().then(() => {
      joinMeeting();
    });
  }, []);

  const joinMeeting = (e) => {
    var authEndpoint = "";
    var sdkKey = Zoom_cred_sdk.SDK.KEY;
    var role = 0;
    var userName = "React";
    var userEmail = "thosparth@gmail.com";
    var registrantToken = "";
    var zakToken = "";
    var leaveUrl = "https://salestine.vercel.app/calls";

    fetch('https://salestine.onrender.com/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetingNumber: "71015515587",
            role: role
          })
        }).then(res => res.json())
        .then(response => {
          console.log(response.sdkJWT)
          var signature = "";
          signature = response.sdkJWT;
          zoomInit(signature);
        }).catch(error => {
          console.error(error)
        })

        const zoomInit = (signature) => {
  zoom.init({
    leaveUrl: 'https://salestine.vercel.app/calls',
    isSupportAV: true,
    success: () => {
      console.log('Zoom SDK initialized.');
      zoom.join({
        meetingNumber: "71015515587",
        userName: userName,
        signature: signature,
        sdkKey: sdkKey,
        passWord: "2r2ake",
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (response) => {
          console.log('Meeting joined successfully.', response);
        },
        error: (error) => {
          console.error('Failed to join the meeting.', error);
        },
      });
    },
    error: (error) => {
      console.error(error);
    },
  });
};
  }
} 