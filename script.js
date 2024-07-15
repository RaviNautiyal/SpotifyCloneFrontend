
Arrayofsong = []
currentFolder= "cs"
var currentSong = new Audio()
function convertSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00"
  // Calculate the number of minutes
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  // Calculate the remaining seconds
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0');
  // Return the result as a string in the format "minutes:seconds"
  return `${minutes}:${remainingSeconds}`;
}




const playMusic =  async (track,folder, SongPaused) => {

  currentSong.src = (`/songs/${folder}/` + track)
  document.querySelector("#songinfo").innerHTML = track
  if (SongPaused) {

    currentSong.paused
    play.innerHTML = `
     
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
     <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
     </svg>  
     `



  }
  else {
    currentSong.play()

    play.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
      <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
      <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />
      </svg>
      `
  }

  document.getElementById("songtime").innerHTML = `00:00 / 00:00`
}

var playlist = []


getSongs = async (folder) => {
  currentFolder=folder
  songs = await fetch(`/songs/${currentFolder}`);
  
  response = await songs.text() //parsing the response
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName('a')
  playlist = []
  for (let index = 1; index < as.length; index++) {
    let element = as[index]
    if (element.href.endsWith("mp3")) {
      playlist.push(as[index].href)

    }
  }
  
  let songUL = document.querySelector(".songlist ul")
  songUL.innerHTML=""
  Arrayofsong=[]
  for (const song of playlist) {
    songUL.innerHTML += `<li>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="27" height="24" color="#000000" fill="none" >
    <circle cx="6.5" cy="18.5" r="3.5" stroke="currentColor" stroke-width="1.5" />
    <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5" />
    <path d="M10 18.5L10 7C10 6.07655 10 5.61483 10.2635 5.32794C10.5269 5.04106 11.0175 4.9992 11.9986 4.91549C16.022 4.57222 18.909 3.26005 20.3553 2.40978C20.6508 2.236 20.7986 2.14912 20.8993 2.20672C21 2.26432 21 2.4315 21 2.76587V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 10C15.8667 10 19.7778 7.66667 21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="info">
    <div class="songname">${song.replaceAll("%20", " ").split("/").pop()}</div>
    
    </div>
    <div class="playnow">
    <img src="https://www.svgrepo.com/show/474332/google-play.svg" alt="Google Play Vector SVG Icon - SVG Repo" class=" nofocus" tabindex="0" aria-label="Google Play Vector SVG Icon - SVG Repo" role="button" data-bm="6">
    <span style="color: white;">PlayNow</span>
    
    </div>
    </li>
    
    `
    Arrayofsong.push(song.replaceAll("%20", " ") .split("/").pop())
  }
  await playMusic(playlist[0].replace("%20", " ").split("/").pop(),currentFolder, true)
 
  
  
 
 
  Array.from(document.querySelectorAll('.songlist ul li')).forEach(element => {
    element.addEventListener("click", async (e) => {
      // Prevent default behavior if necessary (optional)
      e.preventDefault();

      
        
       

    

      // Find the .info element and its first child element within the clicked <li>
      const infoElement = element.querySelector(".info");
      if (infoElement && infoElement.firstElementChild) {

        track = infoElement.firstElementChild.innerHTML
        // Trimming is essential as to remove the extra space else we will not get our song 
      console.log("track clicked")
        // Await the playMusic function passing the first child element of .info
       await playMusic(track, currentFolder, false);
      } else {
        console.error("No .info or first child found inside the clicked <li>");
      }
    })
  })
}


displayAlbums = async ()=>{
  let albums = await fetch(`/songs/`);

  response = await albums.text()
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchor = div.getElementsByTagName('a')
  albums = []
  console.log(albums)
  console.log(anchor)
  for (let index = 2 ; index < anchor.length; index++) {
    let element = anchor[index]
    console.log(element)
    if (element.href.includes("songs") && !element.href.includes(".htaccess")) {
      console.log(anchor[index].href.split("/").filter(part => part.trim() !== "").pop())
      albums.push(anchor[index].href.split("/").filter(part => part.trim() !== "").pop())
      
    }
  }
  console.log(albums)

for (const items of albums) { 
  const  data = await fetch(`/songs/${items}/info.json`);
  const response = await data.json();
  document.querySelector(".card-container").innerHTML+= ` <div class="card" data-folder = "${items}">
  <img aria-hidden="false" draggable="false" loading="lazy" src="${response.coverimage}" data-testid="card-image" alt="" class="mMx2LUixlnN_Fu45JpFB yMQTWVwLJ5bV8VGiaqU3 Yn2Ei5QZn19gria6LjZj">
  <h3 style="color: grey;  ">${response.heading}</h3>
  <p>
    ${response.paragraph}
  </p>
  <div class="play">
    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
  </div>
  </div>`
  
}
}

const main = async () => {
  await displayAlbums()
   await getSongs("cs")
    const hamburger = document.querySelector(".hamburger")
    hamburger.addEventListener("click", () => {
      document.querySelector(".left").style.left = 0 + "%"
    })
    const cross = document.querySelector(".cross")
    cross.addEventListener("click", () => {
      document.querySelector(".left").style.left = -100 + "%"
      
    })
    
    const play = document.getElementById("play");
  play.addEventListener("click", (e) => {
    if (currentSong.paused) {
      currentSong.play()
      play.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
            <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />
            </svg>
            `
    }
    else {
      currentSong.pause()

      play.innerHTML = `
      
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>  
            `
    }

  })
 
  const next = document.getElementById("next")
  next.addEventListener("click", () => {

    const index = playlist.indexOf(currentSong.src)




    if (index < (playlist.length) - 1) {
      playMusic(Arrayofsong[index + 1], currentFolder)
    }




  })

  const previous = document.getElementById("previous")
  previous.addEventListener("click", () => {

    const index = playlist.indexOf(currentSong.src)


    

    if (index > 0) {
      playMusic(Arrayofsong[index - 1],currentFolder)
    }



  })
    
    
    
    
    
    currentSong.addEventListener("timeupdate", async (e) => {
   
      document.getElementById("songtime").innerHTML = `${convertSeconds(currentSong.currentTime)}:${convertSeconds(currentSong.duration)}`
      document.querySelector('.seekbar .circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    const seekbar = document.querySelector('.seekbar')
    seekbar.addEventListener("click", (e) => {
      
    
      document.querySelector('.circle').style.left = e.offsetX / e.target.getBoundingClientRect().width * 100 + "%"
      currentSong.currentTime = (currentSong.duration) * (e.offsetX / e.target.getBoundingClientRect().width * 100) / 100
      
    })
    
    
    
    
  })
 

  const volume = document.getElementById("vol").firstElementChild


  const input = document.getElementById("volumerange")
  input.addEventListener("change", (e)=>{
    
    currentSong.volume=parseInt((e.target.value))/100
    if(currentSong.volume == 0){
      volume.src=
      "   https://cdn-icons-png.flaticon.com/512/5949/5949045.png " 
    }
    else{
      volume.src = "https://cdn-icons-png.flaticon.com/512/4024/4024628.png"
    }

  })


  volume.addEventListener("click" , ()=>{
    if(volume.src == "https://cdn-icons-png.flaticon.com/512/4024/4024628.png"){
    volume.src=
    "   https://cdn-icons-png.flaticon.com/512/5949/5949045.png " 
    currentSong.volume=parseInt((0))/100
    input.value ="0"}

    else{
      volume.src="https://cdn-icons-png.flaticon.com/512/4024/4024628.png"
      currentSong.volume=parseInt((10))/100
      input.value ="10"
    }
  })
  
Array.from(document.querySelectorAll(".card")).forEach( e=>{
  e.addEventListener("click" , async e=>{
    console.log(e.currentTarget.dataset.folder)
    console.log("Card clicked")
    await getSongs(e.currentTarget.dataset.folder)
    

  })
})

}




















main()