let allImages = document.querySelectorAll("img");
allImages.forEach((value) => {
  value.oncontextmenu = (e) => {
    e.preventDefault();
  };

  console.log('Script loaded')
});
