(() => {

    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookMarks = [];


    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;

         if(type === "NEW") {

            currentVideo = videoId;
            newVideoLoaded();

        }  

        const newVideoLoaded = async () => {

            const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
            
            if(!bookmarkBtnExists){
                
                const bookmarkBtn = document.createdElement("img");

                bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
                bookmarkBtn.className = "ytp-button " + "bookmark-btn";
                bookmarkBtn.title = "Click to bookmark curent timestamp";

                youtubeLeftControls = document.getElementsByClassName("ytb-left-controls")[0];
                youtubePlayer = document.getElementsByClassName("video-stream")[0];

                youtubeLeftControls.appendChild(bookmarkBtn);
                bookmarkBtn.addEventListener("click", addNewBookmarkEventhandler);
 
            }

        }
        
        const addNewBookmarkEventhandler = () => {
            
            const currentTime = youtubePlayer.currentTime;  
             
            const newBookmark = {
                time: currentTime,
                desc: "Bookmark at" + getTime(currentTime),


            };

            console.log(newBookmark);
              
             chrome.storage.sync.set({
                
                [currentVideo]: JSON.stringify([...currentVideoBookMarks, newBookmark].sort((a, b) => a.time - b.time));

            });

            newVideoLoaded();
        }
        

      
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);
    
 
    return date.toISOString().substring(11, 0);
}