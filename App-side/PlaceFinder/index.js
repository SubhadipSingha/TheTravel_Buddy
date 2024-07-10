const SubmitButton = document.getElementById("submitbtn");
const savedSights =[];

const Getresults = async (query) => {
  const sightsContainer = document.querySelector('.sights-container');
  sightsContainer.innerHTML=`<img height="350px" width="350px"src="../assets/hScncwd7hUlCjAp9ia.webp"/>`;
  try {
    const response = await fetch(`http://localhost:3000/?query=${query}+Destinations`);
    const data = await response.json();
    
    if (data.top_sights) {
      sightsContainer.innerHTML =""
      data.top_sights.sights.forEach(sight => {
        try {
          const sightsDiv = document.createElement('div');
          sightsDiv.classList.add('sight');
          let additionalInfo = "";

          sightsDiv.innerHTML = `
            <img src="${sight.thumbnail}" class="thumbnail">
            <h3>${sight.title}</h3>
            <p id="additional-info-${sight.title}">${additionalInfo}</p>
            <button class="View-Details">More Info</button>
            <button class="savebtn">Save</button>
          `;
          if (sight.rating && sight.reviews && sight.description ) {
            sightsDiv.innerHTML += `
            <p>${sight.description}</p>
              <p>${sight.rating}✨ (${sight.reviews})</p>
            `;
          } else {
            sightsDiv.innerHTML += `   
            `;
          }
          //   making the sight div to a clickable navigation to google page
          const Thumbnail = sightsDiv.querySelector('.thumbnail');
          Thumbnail.addEventListener('click',(e)=>{
                  e.preventDefault();
                  const googleLink = sight.link;
                  window.open(googleLink, `_blank`);

                 })
               //saving the details 
             const SaveButton = sightsDiv.querySelector('.savebtn');
             SaveButton.addEventListener('click',(e)=>{
                e.preventDefault();
                
                const sightDetails ={
                  title: sight.title.toLowerCase(),
                  thumbnail:sight.thumbnail,
                };
                const existingSight = savedSights.find(savedSights =>savedSights.title.toLowerCase() === sightDetails.title);
                if(!existingSight){
                savedSights.push(sightDetails);
                const savedSightsJSON =JSON.stringify(savedSights);
                localStorage.setItem('savedSights',savedSightsJSON);
                console.log(savedSights);
                }else{
                  console.log('Already Added to The Wishlist');
                }
             });


           const  GetPlaceInfoFromWIki = async (sighttitle) =>{
            const encodedTitle = encodeURIComponent(sight.title);
            const WikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`;
            try{
              const response = await fetch(WikiUrl);
              const data =await response.json();
              return data.extract ||"";
            }catch(error){
              throw error;

            
            }
           }

          sightsContainer.appendChild(sightsDiv);
          const ViewDetails = sightsDiv.querySelector('.View-Details');
          ViewDetails.addEventListener('click', async () => {
            try {
              const info = await GetPlaceInfoFromWIki(sight.title);
              const infoElement = document.getElementById(`additional-info-${sight.title}`);
              infoElement.textContent = info;
              if(!info){
                const googleLink = sight.link;
                window.open(googleLink, `_blank`);
            }
            } catch (error) {
              console.error('Error fetching Wikipedia info:', error);
            }
            
          });

        } catch (error) {
          console.error('Error creating sight element:', error);
          // Optionally handle errors for individual sights (e.g., skip to the next sight)
        }
      });
    } else {
      
      
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally display an error message to the user
  }
};


SubmitButton.addEventListener('click', () => {
  const searchValue = document.getElementById("searchValue").value.trim();
  Getresults(searchValue);
});
