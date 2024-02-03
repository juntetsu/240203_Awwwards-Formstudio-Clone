import { lerp } from "./utils.js";


/*================================
スクロールに応じてvideoのscaleを変更
================================*/
const main = document.querySelector("main")
const video = document.querySelector("video");
const videoSection = document.querySelector("#video");

main.addEventListener("scroll", () => {
  animateVideo();
});

function animateVideo() {
  // videoSection要素の境界ボックスを取得し、そのbottomプロパティ（要素の下端の位置）をbottom変数に格納
  let { bottom } = videoSection.getBoundingClientRect();
  let scale = 1 - (bottom - window.innerHeight) * 0.0005;
  scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;
  video.style.transform = `scale(${scale})`;
}
