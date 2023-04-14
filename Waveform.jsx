'use client';

import { useEffect, useRef, useState } from "react";

export default function Waveform({
    options, bgColor, height, audioLink, setDuration, setTimePlayed, playState, playFromSeconds, trig }) {
    const [currentTime, setCurrentTime] = useState(0)
    const [loaded, setLoaded] = useState(false)

    //Ref setup
    const waveformRef = useRef(null); //Container for Wavesurfer
    const wavesurfer = useRef(null); //Wavesurfer element

    //Setup and creation of waavesurfer element.
    useEffect(() => {
        create()
        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    //Listens to the trig prop to fire playFromSeconds function from remote component.
    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current?.play(playFromSeconds)
        }
    }, [trig])

    //Send current playtime to parent
    useEffect(() => {
        setTimePlayed(currentTime)
    }, [currentTime])

    //Setup helper function with dynamic import of wavesurfer library.
    const create = async () => {
        //Create wavesurfer instance and load audio.
        const WaveSurfer = (await import("wavesurfer.js")).default;
        const waveoptions = options(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(waveoptions);
        wavesurfer.current.load(audioLink);

        //Set up listeners.
        wavesurfer.current.on('ready', function () {
            const dur = Math.round(wavesurfer.current.getDuration());
            setDuration(dur);
            setLoaded(true)
        });
        wavesurfer.current.on('audioprocess', function () {
            setCurrentTime(wavesurfer.current.getCurrentTime().toFixed(1))
        });
        wavesurfer.current.on('seek', function (seek) {
            const time = (seek * 100).toFixed(1)
            const duration = wavesurfer.current.getDuration() / 100
            setCurrentTime((time * duration).toFixed(1))
        });
        wavesurfer.current.on('error', function (error) {
            console.log(error)
        });
    };

    //Listen for play/pause inputs from parent.
    useEffect(() => {
        if (wavesurfer?.current) {
            switch (playState) {
                case "pause":
                    wavesurfer.current.pause()
                    break;
                case "play":
                    wavesurfer.current.play()
                    break;
                case "playFrom":
                    wavesurfer.current.play(playFromSeconds ? playFromSeconds : 0)
                    break;
                case "default":
                    break;
            }
        }
    }, [playState])

    //Return waveform element
    return (
        <div style={{ backgroundColor: bgColor, height: height }}>
            <div id="waveform" ref={waveformRef} className=""></div>
        </div >

    );
}



