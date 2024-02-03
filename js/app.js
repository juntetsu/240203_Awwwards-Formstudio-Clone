import { lerp } from "./utils.js";
import { createProjects } from "./projects.js";

const main = document.querySelector("main");
const video = document.querySelector("video");
const videoSection = document.querySelector("#video");

createProjects();

main.addEventListener("scroll", () => {
  animateVideo();
});

// Video
const headerLeft = document.querySelector(".video__text-left");
const headerRight = document.querySelector(".video__text-right");

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

// Projects
const projectsSticky = document.querySelector(".projects__sticky");
const projectsSlider = document.querySelector(".projects__slider");
let projectTargetX = 0;
let projectCurrentX = 0;

let percentages = {
  small: 700,
  medium: 300,
  large: 100,
};

let limit =
  window.innerWidth <= 600
    ? percentages.small
    : window.innerWidth <= 1100
    ? percentages.medium
    : percentages.large;

function setLimits() {
  limit =
    window.innerWidth <= 600
      ? percentages.small
      : window.innerWidth <= 1100
      ? percentages.medium
      : percentages.large;

  // console.log(limit);
}

window.addEventListener("resize", setLimits);

function animateProjects() {
  let offsetTop = projectsSticky.parentElement.offsetTop;
  let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
  projectTargetX = percentage;
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
  projectsSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0, 0)`;
}

function animate() {
  animateProjects();
  requestAnimationFrame(animate);
}

animate();
