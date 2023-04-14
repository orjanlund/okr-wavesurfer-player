# okr-wavesurfer-player
Unstyled Wavesurfer.js media player for Nextjs 13

/* 
The playFromSeconds state variable is used by external components to control where to play track from.
When "playFromSeconds" is set to a number other than 0 and the trig function is run,
the Player will start playing the loaded track from {playFromSeconds} seconds.
Player needs at least an audio URL "audioLink" to run. 
 */


//Code to be included in parent component:

export default function ParentComponent() {
  const [playFromSeconds, setPlayFromSeconds] = useState(0);
  const [trig, setTrig] = useState(1)

  const trigger = () => {
    setTrig(prev => prev + 1)
  }

  return (
    <div>
      <Player {...{ audioLink, playFromSeconds, trig }} />
      <div onClick={trigger} >PLAY FROM SECONDS BUTTON</div>
    </div>
  )
