var level = 1;
const levelBtns = document.querySelectorAll(".main-cont .level-list .level-cont .play-btn");
levelBtns.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    level = parseInt(e.target.dataset.value);
    localStorage.setItem("level", level)
    console.log(level)
  })
})