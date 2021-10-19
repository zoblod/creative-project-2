
const api = {
    key: "ddc71c892fc43c56a0c37d8a851f1068f833dc4c97b0758cbfe7c6b13c42ead3",
    base: "https://satellites.fly.dev/passes/25544?"
}

var longitude = "";
var latitude = "";

document.addEventListener('readystatechange', function(){
    if (document.readyState == "complete"){
        const searchBox = document.getElementsByClassName("search-bar")[0];
        const searchBox2 = document.getElementsByClassName("search-bar-2")[0];
        searchBox.addEventListener("keyup", function(event){
            
            if (searchBox.value != null && searchBox2.value != null){
                if (isNaN(searchBox.value) || isNaN(searchBox2.value)){
                    alert("Please make sure that your input only consits of numbers.")
                }else{
                    longitude = searchBox.value;
                }
            }else{
                alert("Please make sure you have an input")
            }
            
        })

        searchBox2.addEventListener("keyup", function(event){
            
            if (searchBox.value != null && searchBox2.value != null){
                if (isNaN(searchBox.value)|| isNaN(searchBox2.value)){
                    alert("Please make sure that your input only consits of numbers.")
                }else{
                    latitude = searchBox2.value;
                }
            }else{
                // fetch random id
            }
            
        })
    }
})


function getResults(){
    if (latitude === "" || longitude === ""){
        alert("Please make sure you have an input.")
    }
    fetch(`${api.base}lat=${latitude}&lon=${longitude}&limit=100&days=7&visible_only=false`)
    .then(result => {
        return result.json();
    }).then(displayResults)
}

function displayResults(result){
    const app = document.querySelector('#results');
    const chunk = result.map((item, index) =>
        `
        <li>
        <a> Satelite <strong>${index}</strong></a><br>
        <div class="rise">
          <a><strong>Rise 🌅</strong></a><br>
          <a> altitude: ${item.rise.alt}</a><br>
          <a> azimuth: ${item.rise.az}</a?<br>
          <a> utc_date: ${item.rise.utc_datetime}</a><br>
          <a> sunlit: ${item.rise.is_sunlit}</a><br>
          <br>
        </div>
        <div class="culmination">
          <a><strong>Culmination ☀️</strong></a><br>
          <a> altitude: ${item.culmination.alt}</a><br>
          <a> azimuth: ${item.culmination.az}</a><br>
          <a> utc_date: ${item.culmination.utc_datetime}</a><br>
          <a> sunlit: ${item.culmination.is_sunlit}</a><br>
          <br>
        </div>
        <div class="set">
          <a><strong>Set 🌇</strong></a><br>
          <a> altitude: ${item.set.alt}</a><br>
          <a> azimuth: ${item.set.az}</a><br>
          <a> utc_date: ${item.set.utc_datetime}</a><br>
          <a> sunlit: ${item.set.is_sunlit}</a><br>
          <br>
        </div>
        <div class="visibility">
          <a><strong> visibility: ${item.visible ? "🐵" : "🙈"}</strong></a>
        </div>
      </li>
        `
        ).join('');
        const range = document.createRange();
        range.selectNode(app)
        const fragment = range.createContextualFragment(chunk);
        app.appendChild(fragment);
}