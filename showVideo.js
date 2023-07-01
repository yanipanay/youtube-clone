
const videoplayer = document.getElementById("video-player");
const videoId=document.cookie.split(";")[0].split("=")[1];
const Apikey = "AIzaSyDhHMiIteiRquDFjDp82pJ19UzsM8HTeE8";
const base_url="https://www.googleapis.com/youtube/v3";

const videoDetailContainer=document.getElementById("player-video-details");

const url=`https://www.youtube.com/embed/${videoId}`;

videoplayer.innerHTML+=`
<iframe width="640" height="455"
src=${url}>
</iframe>
`;

async function getVideoDetails(VideoID){
    const url=`${base_url}/videos?key=${Apikey}&part=snippet,contentDetails,statistics&id=${VideoID}`;
    const response=await(fetch(url));
    const data = await(response.json());
    return data.items[0];
}

//getVideoDetails(videoId);
addChannelDetails();

async function addVideoDetails(){
    const videoDetails = await(getVideoDetails(videoId));
    console.log(videoDetails);
    const channelID=videoDetails.snippet.channelId;
    const videoTitle = videoDetails.snippet.title;
    const views=videoDetails.statistics.viewCount;
    const likes=videoDetails.statistics.likeCount;
    const isoTime=videoDetails.snippet.publishedAt;
    const date = new Date(isoTime);
    const uploadDate = date.toLocaleString();


    // videoDetailContainer.innerHTML+=
`<div class="player-video-title">
    ${videoTitle}
</div>
<div class="bottom-line">
<div class="left-line">
    <div class="player-views">
        ${views}
    </div>
    <div class="player-uploadedDate">
        ${uploadDate}
    </div>
</div>
<div class="right-line">
    <div class="likes">    
        <img src="./resources/images/liked.svg" alt="">
        <span>${likes} likes</span>            
    </div>
    <div class="share">
        <img src="./resources/images/Share.svg" alt="">
        <span class="share-text">SHARE</span>
    </div>
    <div class="save">
        <img src="resources/images/Save.svg" alt="">
        <span class="save-text">SAVE</span>
    </div>
    <div class="more-options">
        <img src="resources/images/More.svg" alt="">
    </div>
</div>  
</div>
`;

//await addChannelDetails(channelID);

}


async function addChannelDetails(channelID){

//     https://www.googleapis.com/youtube/v3/channels?
// key=<YOUR_API_KEY>&
// part=snippet,statistics&
// id=SE0wDh_pILk


    const url=`${base_url}/channels?key=${Apikey}&part=snippet,statistics&id=${channelID}`;
    const response=await(fetch(url));
    const data = await(response.json());
    console.log(data.items[0]);
}

