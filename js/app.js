import { lerp } from "./utils.js";

const main = document.querySelector("main")
const video = document.querySelector("video");
const videoSection = document.querySelector("#video");

main.addEventListener("scroll", () => {
  animateVideo();
});

const headerLeft = document.querySelector(".video__text-left")
const headerRight = document.querySelector(".video__text-right")

function animateVideo() {
  // スクロールに応じてvideoのscaleを変更
  let { bottom } = videoSection.getBoundingClientRect();
  let scale = 1 - (bottom - window.innerHeight) * 0.0005;
  scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;
  video.style.transform = `scale(${scale})`;

  // Text transformation
  let textTrans = bottom - window.innerHeight;
  textTrans = textTrans < 0 ? 0 : textTrans;
  headerLeft.style.transform = `translateX(${-textTrans}px)`;
  headerRight.style.transform = `translateX(${textTrans}px)`;
}
