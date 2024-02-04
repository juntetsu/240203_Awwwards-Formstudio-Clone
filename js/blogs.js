const blogPosts = [
  {
    title: "BLOG POST ONE",
    time: "3 MIN",
    image:
      "https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "BLOG POST TWO",
    time: "4 MIN",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "BLOG POST THREE",
    time: "5 MIN",
    image:
      "https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80&w=2602&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const createBlogPosts = () => {
  blogPosts.forEach((post) => {
    const blogPostSection = document.createElement("div");
    blogPostSection.classList.add("blog__post");
    
    const postDiv = document.createElement("a");
    postDiv.classList.add("post");
    postDiv.href = "/";

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post__image-container");

    const image = document.createElement("img");
    image.classList.add("post__image");
    image.src = post.image;

    const postDetails = document.createElement("div");
    postDetails.classList.add("post__details");

    const postTitle = document.createElement("h3");
    postTitle.classList.add("post__title");
    postTitle.innerText = post.title;

    const postTime = document.createElement("p");
    postTime.classList.add("post__time");
    postTime.innerText = post.time;

    imageContainer.appendChild(image);
    postDetails.append(postTitle, postTime);
    postDiv.append(imageContainer, postDetails);
    blogPostSection.appendChild(postDiv);

    document.getElementById("blog").appendChild(blogPostSection);
  });
};

export { createBlogPosts };
