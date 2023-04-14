import React, { useState } from 'react'
import Waveform from './Waveform'

// PLAYER DISPLAY OPTIONS
const bgColor = "white"
const waveColor = "blue"
const progressColor = "lightblue"
const cursorColor = "black"
const height = 128

// Wavesurfer options
const options = (ref) => ({
    container: ref,
    waveColor: waveColor,
    progressColor: progressColor,
    cursorColor: cursorColor,
    height: height,
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    normalize: true,
    partialRender: true,
    cursorWidth: 2,
    barWidth: 2,
    barHeight: 10,
});
//------------------------------

const Player = ({ audioLink, playFromSeconds, trig }) => {
    const [duration, setDuration] = useState(0);
    const [timePlayed, setTimePlayed] = useState(0);
    const [playState, setPlayState] = useState("default");

    //Control functions.
    const play = () => setPlayState("play")
    const pause = () => setPlayState("pause")
    const playFrom = () => setPlayState("playFrom")
    const playStateDefault = () => setPlayState("default")

    //Rendered waveform with controls.
    return (
        <div className="">
            <Waveform {...{ bgColor, height, options, setDuration, setTimePlayed, playState, playFromSeconds, audioLink, trig }} />
            <div>Played: {timePlayed}</div>
            <div>Duration: {duration}</div>
            <div onClick={play}>Play</div>
            <div onClick={pause}>Pause</div>
            <div onMouseDown={playFrom} onMouseUp={playStateDefault}>Playfrom</div>
        </div>
    )
}

export default Player