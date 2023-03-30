import React, { useState } from 'react'
import {
  Box,
  Stack,
  Container,
  Typography,
  Button,
  Link,
  Avatar,
  useMediaQuery,
  Grid,
  TextField,
  Grid2ClassKey,
} from '@mui/material'
import axios from 'axios'
import '../Styles/Home.css';
import ReactPlayer from 'react-player'
import { ArcherContainer, ArcherElement } from "react-archer";
import { AudioRecorder } from 'react-audio-voice-recorder';

interface props {
  // pred_text: string
}


export default function Home({ }: props) {
  let isLargeScreen = useMediaQuery('(min-width:450px')
  const [inputs, setInputs] = useState({
    text: "",
  });
  const [output, setOutput] = useState({
    pred: "",
    pred_list: [

    ],
    links: [{
      gloss: "",
      link: "",
    }],
  });

  // Arrow stuff
  const rootStyle = { display: "flex", justifyContent: "center" };
  const rowStyle = {
    margin: "200px 0",
    display: "flex",
    justifyContent: "space-between",
  };

const boxStyle = { padding: "10px", border: "1px solid black" };

  const apiCall = async (input: string) => {
    try {
     //const url = 'http://localhost:8080/translate/text'
     const url = 'http://localhost:8080/translate/text/ncslgr_use_dict_add_word'
      const { data } = await axios.post(url, { 'sentence': input })
      setOutput(data)
      console.log(data)

      // box.length = 0;

      // // I initiated days as 0 instead of 31 and if days are less than 31 then
      // // for loop iterates over it until it reaches that number.
      // for (let gloss in output.links) {
      //   // Then the code pushes each time it loops to the empty array I initiated.
      //   let link = output.links[gloss as keyof typeof output.links];
      //   box.push(
      //     <Grid item>
      //       <ReactPlayer url='https://aslsignbank.haskins.yale.edu/dictionary/protected_media/glossvideo/ASL/GR/GRANDFATHER-1863.mp4'
      //   type="video/mp4"
      //   controls //If you want play button or not
      //   playing //If you want autoplay or not
      //    />
      //     </Grid>
      //   );
      // }
    } catch (err:any) {
      console.log(err)
    }
  }

  const transcriptionCall = async (blob: any) => {
    try {
      let config = {
        headers: {
          // TODO: replace TOKEN with secret
          "Authorization": "Bearer <TOKEN>",
          "Content-Type": "multipart/form-data"
        }
      }    
      const form = new FormData();
      form.append('model', 'whisper-1');
      form.append('file', blob, 'myTrainingFile.webm');
      const urlTranscribe = 'https://api.openai.com/v1/audio/transcriptions'
      const { data } = await axios.post(urlTranscribe, form, config)
      console.log(data)
      setInputs(data)
      apiCall(data.text);
    } catch (err:any) {
      console.log(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(inputs)
    apiCall(inputs.text)
    // 2nd API call helps fix the arrows (otherwise they can get messed up)
    apiCall(inputs.text)
  }

  const addAudioElement = async (blob: any) => {
    // const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    // console.log(url);

    transcriptionCall(blob);

    // var FileSaver = require('file-saver');
    // FileSaver.saveAs(blob, "voice.webm");
  };

  return (
    <Box 
    sx={{ pt: 4, pb: 6 }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        {/* <Avatar alt={name} src={img} sx={{ width: 100, height: 100 }} /> */}
        {/* <Typography
          variant={isLargeScreen ? 'h1' : 'h2'}
          textTransform="uppercase">
          {name}
        </Typography> */}
        <Typography variant={isLargeScreen ? 'h3' : 'h4'}>
          Say something, or type something!
        </Typography>
        <Grid container wrap='nowrap' style={{ gap: 5 }}
  alignItems="center"
  justifyContent="center">
        <AudioRecorder onRecordingComplete={addAudioElement}/>
        <div>
          <form onSubmit={handleSubmit} >
            <TextField id="outlined-basic" variant="outlined" color="secondary"
                    value={inputs.text} name="text" onChange={handleChange}
                    focused
                    sx={{
                      "& .MuiInputBase-root": {
                          color: 'primary.main',
                          width: 400,
                          mt: 2,
                          mr: 2,
                          ml: 4,
                          mb: 2,
                         //fontSize: 28
                      }
                    }}      
              />
            <Button type='submit' variant="contained" sx = {{mt: 3}} >Submit</Button>
          </form>
        </div>
        </Grid>
        <ArcherContainer strokeColor="red">
        {
          output.pred_list.map(item => (
            <ArcherElement
              id={item}
              relations={[
                {
                  targetId: item + "link",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                  style: { strokeDasharray: "5,5" },
                },
              ]}
            >
            <Typography 
              display="inline" 
              align="center" 
              variant="subtitle1" 
              //variant='h4'
              textTransform="capitalize" 
              sx = {{
                margin: 0.3
              }}
              paragraph>
              {item}
            </Typography>
            </ArcherElement>
          ))
        }
        {/* This div is for making sure successive typography components are next to each other, not on new lines */}
        {/* <div style={{display:"flex"}}>
        <Typography display="inline" align="center" variant="subtitle1" textTransform="capitalize" paragraph>
          {output.pred}
        </Typography>
        </div> */}
          {/* <ReactPlayer url='https://aslsignbank.haskins.yale.edu/dictionary/protected_media/glossvideo/ASL/GR/GRANDFATHER-1863.mp4'
            type="video/mp4"
            controls //If you want play button or not
            playing //If you want autoplay or not
          /> */}
          <div className="mar"></div>
          <Grid container wrap='nowrap' style={{ gap: 5 }}>
            {/* And here I render the box array */}
            {
              output.links.map(item => (
                <div>
                  <ArcherElement id={item.gloss + "link"}>
                    <Typography
                      display="inline"
                      align="center"
                      variant="subtitle1"
                      //variant='h4'
                      textTransform="capitalize"
                      paragraph>
                      {item.gloss}
                    </Typography>
                  </ArcherElement>
                  <div className='player-wrapper'>
                    <ReactPlayer 
                      className='react-player'
                      url={item.link}
                      type="video/mp4"
                      controls //If you want play button or not
                      playing //If you want autoplay or not
                      width='100%'
                      height='100%'
                    />
                  </div>
                </div>
              ))
            }
          </Grid>
        </ArcherContainer>
      </Container>
      
      
      
      {/* <div style={{ height: "500px", margin: "50px" }}>
         <ArcherContainer strokeColor="red">
            <div style={rootStyle}>
               <ArcherElement
                   id="root"
                   relations={[
                     {
                        targetId: "element2",
                        targetAnchor: "top",
                        sourceAnchor: "bottom",
                        style: { strokeDasharray: "5,5" },
                      },
                  ]}
                >
                <div style={boxStyle}>Root</div>
               </ArcherElement>
            </div>
            <div style={rowStyle}>
               <ArcherElement
               id="element2"
               relations={[
                  {
                     targetId: "element3",
                     targetAnchor: "left",
                     sourceAnchor: "right",
                     style: { strokeColor: "blue", strokeWidth: 1 },
                     label: <div style={{ marginTop: "-20px"}}>Arrow 2</div>,
                  },
               ]}
            >
            <div style={boxStyle}>Element 2</div>
                </ArcherElement>
                <ArcherElement id="element3">
                   <div style={boxStyle}>Element 3</div>
               </ArcherElement>

              <ArcherElement
                 id="element4"
                 relations={[
                    {
                       targetId: "root",
                       targetAnchor: "right",
                       sourceAnchor: "left",
                       label: "Arrow 3",
                   },
               ]}
            >
            <div style={boxStyle}>Element 4</div>
            </ArcherElement>
         </div>
      </ArcherContainer>
   </div> */}
    </Box>
  )
}
