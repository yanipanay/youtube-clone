const Apikey = "AIzaSyDhHMiIteiRquDFjDp82pJ19UzsM8HTeE8";
const base_url = "https://www.googleapis.com/youtube/v3";
const container = document.getElementById("video-container");

async function getVideos(q) {
  const url = `${base_url}/search?key=${Apikey}&q=${q}&type=videos&maxResults=20`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();
  const videoList = data.items;
  getVideoDetailsArray(videoList);
  //console.log("videolist",videoList);
}

async function getVideoDetailsArray(videoList) {
  const videoDetailsArray = [];

  for (let i = 0; i < videoList.length; i++) {
    const video = videoList[i];
    const VideoID = video.id.videoId;
    //console.log(video.id.videoId,VideoID)
    videoDetailsArray.push(await getVideoDetails(VideoID));
  }
  addDataToUI(videoDetailsArray);
}

async function getVideoDetails(VideoID) {
  const url = `${base_url}/videos?key=${Apikey}&part=snippet,contentDetails,statistics&id=${VideoID}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0];
}

function addDataToUI(videoDetailsArray) {
  for (let i = 0; i < videoDetailsArray.length; i++) {
    const videoDetails = videoDetailsArray[i];
    //console.log(videoDetails);
    const thumbnail = videoDetails.snippet.thumbnails.standard.url;
    const channelName = videoDetails.snippet.channelTitle;
    const videoTitle = videoDetails.snippet.title;
    const views = videoDetails.statistics.viewCount;
    const publishedDate = videoDetails.snippet.publishedAt;
    const vidId = videoDetails.id;

    container.innerHTML += `
            <div class="video-box" onclick="openVideoDetails('${vidId}')">
                <div class="video-image">
                    <img src=${thumbnail} width="375" height="220" alt="">
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
            </div>`;
    //console.log(thumbnail,channelName,videoTitle,publishedDate, typeof publishedDate);
  }
}

function openVideoDetails(videoId) {
  document.cookie = `videoid=${videoId}; path=/videoDetails.html`;
  window.location.href = "./videoDetails.html";
  // window.open("/videoDetails.html");
}

async function searchVideos() {
  var x = document.getElementById("search-bar").value;
  container.replaceChildren();
  await getVideos(x);
}

getVideos("");
getVideoDetails("fwhvuqZ-h0s");
