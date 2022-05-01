let videoCardContainer= document.querySelector("#videocontainer");
let Api_key="AIzaSyAX5WmhCoRRo-Q2tIlzoSTvpQfXAgV3lPs";

let video_http=" https://www.googleapis.com/youtube/v3/videos?";

let channel_http="https://www.googleapis.com/youtube/v3/channels?"


fetch(video_http + new URLSearchParams({
     key:Api_key,
     part: 'snippet',
     chart: 'mostPopular',
     maxResults:20,
     regionCode: 'IN'
}))
.then (res => res.json())
.then(data => {
    console.log(data);
    data.items.forEach(item =>{
        getChannelIcon(item)
    })
})

.catch(err=> console.log(err));

const getChannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key:Api_key,
        part:'snippet',
        id: video_data.snippet.channelId
    }))

    .then(res => res.json())
    .then(data=> {
        // console.log(data)
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data)

        makeVideocard(video_data)
    })
}

makeVideocard = (data) =>{

    videoCardContainer.innerHTML +=`
    <div id="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img class="thumbnail" src="${data.snippet.thumbnails.high.url}" alt="img">
            <div id="content">
                <img id="channel" src="${data.channelThumbnail}" alt="">
                <div id="info">
                    <h4 class="title">${data.snippet.title} </h4>
                    <p id="channlename">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>`;
}


const searchInput=document.querySelector(".search-bar");
const seatchBtn=document.querySelector("#search-btn");

let searchLink="https://www.youtube.com/results?search_query="


// seatchBtn.addEventListener('click', () => {

//     if(searchInput.value.length){

//         location.href= searchLink + searchInput.value;
//     }
// })


let container=document.getElementById("container");



async function searchVideo(){
   
    let userInput=document.querySelector(".search-bar").value;
    console.log(userInput)
    try{
        let res= await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${Api_key}&q=${userInput}&type=video&maxResults=20`);
        let data=await res.json();

      let videoList=data.items;
    //   console.log(videoList)
      displayData(videoList);
    }
    catch(err){
        console.log(err);
    }
}
// searchVideo()

const displayData = (videosArray) =>{
   
    videoCardContainer.innerHTML="";
    console.log(videosArray)
    videosArray.forEach((video) =>{
        
        const{ id:{videoId}, }= video;
        // console.log(videoId)

        let videocard=document.createElement('div');
        videocard.style.marginRight="50px"

        let iframe=document.createElement('iframe');
        iframe.src=`https://www.youtube.com/embed/${videoId}`;
        iframe.setAttribute("allowfullscreen",true)

        videocard.append(iframe);
        videoCardContainer.append(videocard);
    })
}