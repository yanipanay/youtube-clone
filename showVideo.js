
const videoplayer = document.getElementById("video-player");
const videoId=document.cookie.split(";")[0].split("=")[1];

const url=`https://www.youtube.com/embed/${videoId}`;

videoplayer.innerHTML+=`
<iframe width="640" height="455"
src=${url}>
</iframe>
`;