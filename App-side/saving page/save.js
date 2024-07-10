
const savedSightsContainer = document.getElementById('saved-Sight');
const SavedContent = document.querySelector('.savedcontent')
function loadSavedSights() {
    const savedSightsJSON = localStorage.getItem('savedSights');
    if (savedSightsJSON) {
      savedSights = JSON.parse(savedSightsJSON);
    } else{
        savedSights = []
    }

  }
  
  loadSavedSights();


  function displaySavedSights() {
    savedSightsContainer.innerHTML = ""; 

    if(savedSights.length>0){
      const TripTitle = document.createElement('h3');
          TripTitle.id = "TripTitle";
          TripTitle.innerText = `Your Next Visiting Places Will be`;
          savedSightsContainer.appendChild(TripTitle);
    }
    if (savedSights.length > 0) {
      savedSights.forEach(sight => {
         const sightsDiv = document.createElement('div');
        sightsDiv.classList.add('sight');

        sightsDiv.innerHTML = `
          <img src="${sight.thumbnail}">
          <h3>${sight.title}</h3>
        `;
        
        const Deletebutton = document.createElement('button');
        Deletebutton.id = "Deletebutton";
        Deletebutton.innerText = `remove`;
        sightsDiv.appendChild(Deletebutton);

       Deletebutton.addEventListener('click',()=>{
        const idx = savedSights.findIndex(savedSight =>savedSight===sight);
        if(idx > -1){
          savedSights.splice(idx,1);
          localStorage.setItem('savedSights', JSON.stringify(savedSights));
          displaySavedSights()
         
        }
       });

        savedSightsContainer.appendChild(sightsDiv);
      });
    } else  {
      savedSightsContainer.innerHTML = `
        <h2 class="nosight">No Saved Sights Yet</h2>
        <img id="Gif" src="https://media.tenor.com/SjPc2Ia-BQUAAAAi/lets-go-outside-questions.gif"/>
      `;
    } 
    
  

  }
  

loadSavedSights()
displaySavedSights()
