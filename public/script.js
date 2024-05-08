const audioPlyrElement = document.querySelectorAll(".star-audio-plyr")


console.log("Md Shohanur Rahman")
console.log({ audioPlyrElement }, "Md Shohanur Rahman")



const cssInt = () => {
  var a = document.getElementsByTagName("head")[0];
  var i = document.createElement("link");
  i.rel = "stylesheet";
  i.type = "text/css";
  i.href = "https://updates-ultimately-richardson-benefits.trycloudflare.com" + "/style.css";
  i.media = "all";
  var b = document.createElement("link");
  b.rel = "stylesheet";
  b.type = "text/css";
  b.href = "https://updates-ultimately-richardson-benefits.trycloudflare.com" + "/plyr.css";
  b.media = "all";
  a.appendChild(i);
  return a.appendChild(b);
}


function htmlToElement(html) {
  // Create a temporary template element
  let temp = document.createElement("template");

  // Set the inner HTML of the template
  temp.innerHTML = html;

  // Return the first child of the template's content (the resulting element)
  return temp.content.firstChild;
}

if (audioPlyrElement.length >= 1) {
  cssInt()
  const ids = [];

  Array.from(audioPlyrElement).map((item) => {
    const id = item.getAttribute("data-id")
    ids.push(id)

  })


  fetch("https://updates-ultimately-richardson-benefits.trycloudflare.com/app/api/plyr-data", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(ids),
  })
    .then(res => res.json())
    .then(datas => {
      console.log({ datas })
      Array.from(audioPlyrElement).map((item) => {
        const id = item.getAttribute("data-id")
        ids.push(id)


        const data = datas.audio.find(item => item.id == id)
        const modalElementString = `<div class="player-${id}">
          <audio id="player-${id}"  class="player" controls>
            <source src="${data?.url}" type="audio/mp3" />
          </audio>
        </div>`;
        const styles = `<div>
         <style>


              ${data?.selectedScreen === "screenDefault" ?
            `
                
             .player-${id} :root {
                --plyr-control-icon-size:${data?.[data?.selectedScreen]?.iconSize};
                --plyr-audio-controls-background:${data?.[data?.selectedScreen]?.background};
                --plyr-menu-border-color:${data?.[data?.selectedScreen]?.borderColor};
                --plyr-range-thumb-height:15px;
              }
             .player-${id} .plyr--audio .plyr__controls {
                  border-radius:${data?.[data?.selectedScreen]?.borderRadius};
              }
               .player-${id} .plyr.plyr--full-ui.plyr--audio.plyr--html5.plyr--paused {
                  width:${data?.[data?.selectedScreen]?.width};
                height:${data?.[data?.selectedScreen]?.height};
              }` : ""
          }

         .player-${id}  .plyr .media-controls {
                background:${data?.[data?.selectedScreen]?.background};
                border-radius: ${data?.[data?.selectedScreen]?.borderRadius};
                width:${data?.[data?.selectedScreen]?.width};
                height:${data?.[data?.selectedScreen]?.height};
                border:${data?.[data?.selectedScreen]?.borderWidth + " " + data?.[data?.selectedScreen]?.borderStyle + " " + data?.[data?.selectedScreen]?.borderColor}
              }
            .player-${id}  .demo-1 .container {
                background:${data?.[data?.selectedScreen]?.background};
                border-radius: ${data?.[data?.selectedScreen]?.borderRadius};
                width:${data?.[data?.selectedScreen]?.width};
                height:${data?.[data?.selectedScreen]?.height};
                border:${data?.[data?.selectedScreen]?.borderWidth + " " + data?.[data?.selectedScreen]?.borderStyle + " " + data?.[data?.selectedScreen]?.borderColor};
            }
            .player-${id}  .demo-1 .container .controls{
                background:${data?.[data?.selectedScreen]?.background};
            }
            
             .player-${id} .plyr .media-controls svg {
                width: ${parseInt(data?.[data?.selectedScreen]?.iconSize) + 10 + data?.[data?.selectedScreen]?.iconSize?.match(/[a-z%]+/i)[0]};
                height: ${parseInt(data?.[data?.selectedScreen]?.iconSize) + 10 + data?.[data?.selectedScreen]?.iconSize?.match(/[a-z%]+/i)[0]};
              }
             .player-${id} .demo-1 .container .image-box {
                background-image: url("${data?.[data?.selectedScreen]?.backgroundImage ? data?.[data?.selectedScreen]?.backgroundImage : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"}")
              }
            
          </style>
        </div>`

        console.log(styles)


        let controls = {
          controls: [
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
          ],
        };
        if (data?.selectedScreen === "screenOne") {
          controls = {
            controls: `
          <div class="media-controls plyr__controls">
            <div class="media-buttons">
              <button class="back-button media-button" label="back">
                <span class="back-button__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z" />
                  </svg>
                </span>
                <span class="button-text milli">Back</span>
              </button>

              <button
                class="fast-forward-button media-button"
                label="fast forward"
                data-plyr="rewind"
              >
                <span class="back-button__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z" />
                  </svg>
                </span>
                <span class="button-text milli">Backward</span>
              </button>

             <button class="play-button media-button" label="play" aria-label="Play, {title}"
                data-plyr="play">
          <span class="back-button__icon play-button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="pause icon w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="play icon w-6 h-6" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
 
          </span>
                 
          <span class="button-text milli">Play</span>
        </button>

              <button
                class="fast-forward-button media-button"
                label="fast forward"
                data-plyr="fast-forward"
              >
                <span class="back-button__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z" />
                  </svg>
                </span>
                <span class="button-text milli">Forward</span>
              </button>

              <button class="skip-button media-button" label="skip">
                <span class="back-button__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M676.4 528.95L293.2 829.97c-14.25 11.2-35.2 1.1-35.2-16.95V210.97c0-18.05 20.95-28.14 35.2-16.94l383.2 301.02a21.53 21.53 0 0 1 0 33.9M694 864h64a8 8 0 0 0 8-8V168a8 8 0 0 0-8-8h-64a8 8 0 0 0-8 8v688a8 8 0 0 0 8 8" />
                  </svg>
                </span>
                <span class="button-text milli">Skip</span>
              </button>
            </div>
            <div class="media-progress">
            <div class="progress-bar-wrapper progress">
            <input data-plyr="seek"  type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek" />
            
     
              </div>
             
              <div class="progress-time-current milli plyr__time plyr__time--current" aria-label="Current time">15:23</div>
              <div class="progress-time-total milli plyr__time plyr__time--duration" aria-label="Duration">34:40</div>
            </div>
          </div>
          `,
          };
        } else if (data?.selectedScreen == "screenTwo") {
          console.log({ image: data?.[data?.selectedScreen]?.image })
          controls = {
            controls: `<div class="demo-1">
      <div class="container">
        <div class="image-box">
          <div class="content">
            <div class="cover">
              <img src="${data?.[data?.selectedScreen]?.image || "https://files.bplugins.com/wp-content/uploads/2024/04/429550502_25614821214771859_729153743743869927_n-1.jpg"}" alt="${data?.title}" srcSet="" />
            </div>
            <div>
              <h2 class="title">${data?.title}</h2>
              <div class="total-time">
                <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></span>
                <span>Total Time :</span>
                <span class="progress-time-current plyr__time plyr__time--current" aria-label="Current time">03:03</span>
              </div>
            </div>
          </div>
          </div>
          <div class="progressbar">
            <input data-plyr="seek"  type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek" />
          </div>
        <div class="controls">
          <button class="backward" data-plyr="rewind">
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M485.6 249.9L198.2 498c-8.3 7.1-8.3 20.8 0 27.9l287.4 248.2c10.7 9.2 26.4.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9zm320 0L518.2 498a18.6 18.6 0 0 0-6.2 14c0 5.2 2.1 10.4 6.2 14l287.4 248.2c10.7 9.2 26.4.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9z" />
            </svg>
          </button>
          <button class="play" aria-label="Play, ${data?.title}"
                data-plyr="play">
            <svg stroke="currentColor" class="play-icon" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="pause-icon" viewBox="0 0 320 512">{ /*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/ }<path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" /></svg>
          </button>
          <button class="forward"  data-plyr="fast-forward">
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M825.8 498L538.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L825.8 526c8.3-7.2 8.3-20.8 0-28zm-320 0L218.4 249.9c-10.7-9.2-26.4-.9-26.4 14v496.3c0 14.9 15.7 23.2 26.4 14L505.8 526c4.1-3.6 6.2-8.8 6.2-14 0-5.2-2.1-10.4-6.2-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>`,
          };
        } else {
          controls = {
            controls: [
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "settings",
            ],
          };
        }

        const audioElement = htmlToElement(modalElementString);
        const stylesElement = htmlToElement(styles);

        console.log({ styles, stylesElement })

        audioPlyrElement[0].appendChild(audioElement)
        audioPlyrElement[0].appendChild(stylesElement)

        const player = new Plyr(`#player-${id}`, controls);

      })
    })










}


// if (audioPlyrElement.length > 0) {
//   const ids = [];
//   function htmlToElement(html) {
//     // Create a temporary template element
//     let temp = document.createElement("template");

//     // Set the inner HTML of the template
//     temp.innerHTML = html;

//     // Return the first child of the template's content (the resulting element)
//     return temp.content.firstChild;
//   }

//   let formData = [];
//   let buttonStyles = [];



//   Array.from(audioPlyrElement).map((item) => {
//     const id = item.getAttribute("data-id")
//     ids.push(id)

//     bodyElement.appendChild(<h2>Md Shohanur Rahman</h2>);
//     item.addEventListener("click", () => {

//       // const data = formData.find(item => item.id == id)
//       // const modalElementString = `<audio id="player" controls>
//       //       <source src="https://cdn.shopify.com/s/files/1/0858/6087/6604/files/koyal-bird-voice-17.mp3?v=1714049127" type="audio/mp3" />
//       //     </audio>`;

//       // const modalElement = htmlToElement(modalElementString);

//       // const bodyElement = document.getElementsByTagName("body")[0];


//     });


//   })
//   fetch("https://updates-ultimately-richardson-benefits.trycloudflare.com/app/api/plyr-data", {
//     method: "POST",
//     header: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*"
//     },
//     body: JSON.stringify(ids),
//   })
//     .then(res => res.json())
//     .then(data => {
//       // formData = data.urls
//       // buttonStyles = data.buttonStyles
//       // const buttonHoverStyles = data.buttonHoverStyles


//       // Array.from(audioPlyrElement).map((item) => {
//       //   const id = item.getAttribute("data-id")
//       //   item.style.cursor = "pointer";

//       //   console.log(id)

//       //   // if (data?.[data?.selectedScreen]?.urls?.length > 0) {
//       //   //   const getFormData = data?.[data?.selectedScreen]?.urls?.find(item => item.id == id)
//       //   //   item.innerText = getFormdata?.[data?.selectedScreen]?.title
//       //   // }

//       //   // Object.keys(buttonStyle).forEach(key => {
//       //   //   if (key === "id" || key === "modalId") {
//       //   //     return;
//       //   //   }
//       //   //   item.style[key] = buttonStyle[key];
//       //   // })

//       //   // item.addEventListener("mouseover", async () => {
//       //   //   Object.keys(buttonHoverStyle).forEach(key => {
//       //   //     if (key === "id" || key === "modalId") {
//       //   //       return;
//       //   //     }
//       //   //     item.style[key] = buttonHoverStyle[key];
//       //   //   })
//       //   // })

//       //   // item.addEventListener("mouseout", async () => {

//       //   //   Object.keys(buttonStyle).forEach(key => {
//       //   //     if (key === "id" || key === "modalId") {
//       //   //       return;
//       //   //     }
//       //   //     item.style[key] = buttonStyle[key];
//       //   //   })
//       //   // })


//       // })
//     })

// }


