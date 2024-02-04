import { lerp } from "./utils.js";
import { createProjects } from "./projects.js";
import { createBlogPosts } from "./blogs.js";

const main = document.querySelector("main");
const video = document.querySelector("video");
const videoSection = document.querySelector("#video");

createProjects();
createBlogPosts();

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
  // console.log(main.scrollTop, offsetTop, window.innerHeight)
  percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
  projectTargetX = percentage;
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
  projectsSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0, 0)`;
}

// Post animation
const blogSection = document.querySelector("#blog");
const blogPosts = [...document.querySelectorAll(".blog__post")];

const scrollBlogPosts = () => {
  const blogSectionTop = blogSection.getBoundingClientRect().top;
  for (let i = 0; i < blogPosts.length; i++) {
    if (blogPosts[i].parentElement.getBoundingClientRect().top <= 1) {
      // +1 to account for the first BLOG title div
      let offset = (blogSectionTop + window.innerHeight * (i + 1)) * 0.0005;
      offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
      blogPosts[i].style.transform = `scale(${1 + offset})`;
    }
  }
};

// Circle animation
const circleSection = document.querySelector("#circle__section");
const circle = document.querySelector(".circle");

const scrollCircle = () => {
  let { top } = circleSection.getBoundingClientRect();
  let scaleTop = Math.abs(top);
  let scale = scaleTop / window.innerHeight;
  scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
  if (top <= 0) {
    circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
  } else {
    circle.style.transform = `translate(-50%, -50%) scale(${0})`;
  }
};

function animate() {
  animateProjects();
  requestAnimationFrame(animate);
}

main.addEventListener("scroll", () => {
  scrollBlogPosts();
  scrollCircle();
});

animate();
