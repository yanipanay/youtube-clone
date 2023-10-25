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
    const isoTime = videoDetails.snippet.publishedAt;
    const date = new Date(isoTime);
    const vidId = videoDetails.id;

    container.innerHTML += `
            <div class="video-box" onclick="openVideoDetails('${vidId}')">
                <div class="video-image">
                    <img src=${thumbnail} width="370" height="220" alt="">
                </div>
                <div class="video-description">
                    <div class="avatar">
                        <img src="resources/images/User-Avatar.png" width='35px' alt="">
                    </div>
                    <div class="text-details">
                    <div class="video-title">
                        ${videoTitle}
                    </div>
                    <div class="video-info">
                        <div>${channelName}</div>
                        <div class="view-time">
                            <p class="video-views">${getViews(views)} views</p>
                            <p class="video-time">${getInterval(date)} ago</p>
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

function getViews(views) {
  if (views > 1000000000) {
    views = views / 1000000000;
    return Math.round(views * 10) / 10 + "B";
  } else if (views > 1000000) {
    views = views / 1000000;
    return Math.round(views * 10) / 10 + "M";
  } else if (views > 1000) {
    views = views / 1000;
    return Math.round(views * 10) / 10 + "K";
  } else return views;
}

function getInterval(uploaded) {
  let today = new Date();
  let diff = Math.round((today.getTime() - uploaded.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff > year) {
    return (
      Math.round(diff / year) +
      (Math.round(diff / year) == 1 ? " year" : " years")
    );
  } else if (diff > month) {
    return (
      Math.round(diff / month) +
      (Math.round(diff / month) == 1 ? " month" : " months")
    );
  } else if (diff > week) {
    return (
      Math.round(diff / week) +
      (Math.round(diff / week) == 1 ? " week" : " weeks")
    );
  } else if (diff > day) {
    return (
      Math.round(diff / day) + (Math.round(diff / day) == 1 ? " day" : " days")
    );
  } else if (diff > hour) {
    return (
      Math.round(diff / hour) +
      (Math.round(diff / hour) == 1 ? "hour" : "hours")
    );
  } else if (diff > minute) {
    return (
      Math.round(diff / min) + (Math.round(diff / min) == 1 ? " min" : " mins")
    );
  } else return "1 min";
}
