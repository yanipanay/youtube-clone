

const Apikey = "AIzaSyAmd_r5T89j5sG8ySj74aXvZyLS-oMxN0k" ;
const base_url="https://www.googleapis.com/youtube/v3";
const container=document.getElementById("video-container");


async function getVideos(q){
    const url=`${base_url}/search?key=${Apikey}&q=${""}&type=videos&maxResults=20`;
    const response=await(fetch(url,{
        method:"get",
    }));
    const data = await(response.json());
    const videoList = data.items;
    getVideoDetailsArray(videoList);
    //console.log("videolist",videoList);
}

async function getVideoDetailsArray(videoList){
    const videoDetailsArray = [];

    for(let i=0;i<videoList.length;i++){
        const video=videoList[i];
        const VideoID=video.id.videoId;
        //console.log(video.id.videoId,VideoID)
        videoDetailsArray.push(await(getVideoDetails(VideoID)));
    }
    addDataToUI(videoDetailsArray);
}


async function getVideoDetails(VideoID){
    const url=`${base_url}/videos?key=${Apikey}&part=snippet,contentDetails,statistics&id=${VideoID}`;
    const response=await(fetch(url));
    const data = await(response.json());
    return data.items[0];
}

function addDataToUI(videoDetailsArray){
    for(let i=0;i<videoDetailsArray.length;i++){
        const videoDetails = videoDetailsArray[i];
        console.log(videoDetails);
        const thumbnail = videoDetails.snippet.thumbnails.standard.url;
        const channelName =  videoDetails.snippet.channelTitle;
        const videoTitle = videoDetails.snippet.title;
        const views=videoDetails.statistics.viewCount
        const publishedDate=videoDetails.snippet.publishedAt


        container.innerHTML+=`
        <a href="/videoDetails.html">
            <div class="video-box">
                <div class="video-image">
                    <img src=${thumbnail} width="250" height="170" alt="">
                </div>
                <div class="video-description">
                    <div class="avatar">
                        <img src="resources/images/User-Avatar.png" alt="">
                    </div>
                    <div class="text-details">
                    <div class="video-title">
                        ${videoTitle}
                    </div>
                    <div class="video-info">
                        <p class="channel-name">${channelName}</p>
                        <div class="view-time">
                            <p class="video-views">${views} views</p>
                            <p class="video-time">1 week ago</p>
                        </div>
                    </div>
                    </div>
                </div>        
            </div>
        </a>`;
        //console.log(thumbnail,channelName,videoTitle,publishedDate, typeof publishedDate);
    }
} 



getVideos("");
getVideoDetails("fwhvuqZ-h0s");