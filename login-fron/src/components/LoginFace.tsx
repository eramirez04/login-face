import { useRef, useState, useEffect } from "react";

export const LoginFace = () => {
  const [iniciarGrabacion, setIniciar] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<null | MediaStream>(null);
  const [videoSource, setVideoSource] = useState<string>("");

  /*   useEffect(() => { */
  const prepararStrem = async () => {
    setIniciar(true);
    const gotStream = (stream: MediaStream) => {
      console.log(stream);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log((videoRef.current.srcObject = stream));
      }
    };

    const getStream = async () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      const constrains = {
        video: {
          deviceId: videoSource !== "" ? { exact: videoSource } : undefined,
        },
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constrains);
        gotStream(stream);
      } catch (error) {
        console.log(error);
      }
    };
    await getStream();
  };

  const tomarFoto = () => {
    return;
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks: MediaStreamTrack[] = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  });

  /* prepararStrem(); */
  /* }, []); */

  /*   const initWebCam = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIniciar(true);
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <>
      <div className="bg-gray-50 p-10 rounded-xl shadow-2xl w-full max-w-lg mx-auto mt-12 space-y-6">
        {iniciarGrabacion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full"
          ></video>
        )}
        <div className="relative w-full">
          <input
            type="password"
            name="password"
            /*   onChange={handleonChange} */
            id="floating_password"
            className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="absolute left-4 top-0 text-lg text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
          >
            Password
          </label>
        </div>
        <button
          onClick={prepararStrem}
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>{" "}
      </div>{" "}
    </>
  );
};
