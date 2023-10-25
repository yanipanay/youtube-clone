const videoplayer = document.getElementById("video-player");
const videoId = document.cookie.split(";")[0].split("=")[1] || "Ey75Xw_ikqs";
const Apikey = "AIzaSyDhHMiIteiRquDFjDp82pJ19UzsM8HTeE8";
const base_url = "https://www.googleapis.com/youtube/v3";

const videoDetailContainer = document.getElementById("player-video-details");

const url = `https://www.youtube.com/embed/${videoId}`;

videoplayer.innerHTML = `
<iframe width="1045" height="587"
src="${url}?modestbranding=1" >
</iframe>
`;

// videoplayer.innerHTML = `<iframe
// width="1045"
// height="587"
// src="https://www.youtube.com/embed/tgbNymZ7vqY?modestbranding=1"
// >
// </iframe>`;

async function getVideoDetails(VideoID) {
  const url = `${base_url}/videos?key=${Apikey}&part=snippet,contentDetails,statistics&id=${VideoID}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0];
}

//https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDhHMiIteiRquDFjDp82pJ19UzsM8HTeE8&part=snippet,contentDetails,statistics&id=tgbNymZ7vqY

// getVideoDetails(videoId);
addVideoDetails();
// addChannelDetails();

async function addVideoDetails() {
  const videoDetails = await getVideoDetails(videoId);

  const channelID = videoDetails.snippet.channelId;
  const videoTitle = videoDetails.snippet.title;
  const views = videoDetails.statistics.viewCount;
  const likes = videoDetails.statistics.likeCount;
  const isoTime = videoDetails.snippet.publishedAt;
  const date = new Date(isoTime);
  const description = videoDetails.snippet.description;
  //   console.log(videoDetails);
  const channelData = await addChannelDetails(channelID);

  videoDetailContainer.innerHTML = `<div class="player-video-title">
  ${videoTitle}
</div>
<div class="bottom-line">
  <div class="bl-left">
    <div class="channel-avatar">
      <img
        src=${channelData.snippet.thumbnails.default.url}
        width="35px"
        alt=""
      />
    </div>
    <div class="name-subs">
      <div class="channel-name">${channelData.snippet.title}</div>
      <div class="channel-subs">${getViews(
        channelData.statistics.subscriberCount
      )} subscribers</div>
    </div>
    <div class="subscribe-button">SUBSCRIBE</div>
  </div>
  <div class="bl-right">
    <div class="likes">
      <img src="./resources/images/liked.svg" alt="" />
      <span>${getViews(likes)} Likes</span>
      <img
        class="dislike"
        src="./resources/images/liked.svg"
        alt=""
      />
    </div>
    <div class="share">
      <img src="./resources/images/Share.svg" alt="" />
      <span class="share-text">SHARE</span>
    </div>
    <div class="save">
      <img src="resources/images/Save.svg" alt="" />
      <span class="save-text">SAVE</span>
    </div>
    <div class="more-options">
      <img src="resources/images/More.svg" alt="" />
    </div>
  </div>
</div>
<div class="views-and-text">
  <div class="numbers">
    <div class="player-views">${getViews(views)} views</div>
    <div class="player-uploadedDate">${getInterval(date)} ago</div>
  </div>
  <p class="text">
    ${description}
  </p>
</div>`;
}

async function addChannelDetails(channelID) {
  //     https://www.googleapis.com/youtube/v3/channels?
  // key=<YOUR_API_KEY>&
  // part=snippet,statistics&
  // id=SE0wDh_pILk

  const url = `${base_url}/channels?key=${Apikey}&part=snippet,statistics&id=${channelID}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.items[0]);
  return data.items[0];
}

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
