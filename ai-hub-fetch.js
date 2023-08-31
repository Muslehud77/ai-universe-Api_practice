/*All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01
*/
const container = document.getElementById("ai-container");
const showBtn = document.getElementById("show-all");
const bar = document.getElementById("progress");
const sortDate = document.getElementById("sort");


const getAi = async (cmd=false) =>{
    const response = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    if(response.ok) {
      
      console.log('okay')
      const data = await response.json();
       const aiList = data.data.tools;
       getData(aiList , cmd);
    }else{
      console.log('error')
    }
    
   
}

let showAllai = true;
const showAll = () =>{
  bar.classList.remove("hidden");
  
getAi(showAllai)
container.innerHTML= ''
}



let sorting = false;
const sortByDate = () =>{
 bar.classList.remove("hidden");
sortDate.classList.add("hidden");
sorting = true;
container.innerHTML = "";

 getAi();

}





const  getData = (aiList , cmd)=>{

cmd ? aiList : aiList.splice(0, 6);
aiList.length < 7 ? showBtn.classList.remove("hidden") : showBtn.classList.add("hidden") 

let sorted = aiList

if(sorting){
  function sortDate(a, b) {
    return (
      new Date(b.published_in).valueOf() - new Date(a.published_in).valueOf()
    );
  }

  sorted = aiList.sort(sortDate);
}else{
  sorted = aiList
}

  sorted.forEach((ai)=>{
    
    const div = document.createElement("div");
    div.classList = `card bg-base-100 outline outline-gray-300 p-5 space-y-5`;
    div.innerHTML = `  <figure class="h-52">
            <img
              src="${ai.image}"
              alt="Ai"
              class="rounded-lg"
            />
          </figure>
          <div class="space-y-4 h-52">
            <h2 class="text-2xl font-bold">Features</h2>
           <div>
             <p>1. Natural language processing</p>
            <p>2. Contextual Understanding</p>
            <p>3. Text generation</p>
           </div>
            <hr>
           <div class="flex justify-between">
            <div>
                 <h2 class="text-2xl font-bold">${ai.name}</h2>
            <p><i class="fa-solid fa-calendar-days"></i> ${ai.published_in}</p>
            </div>
            <div>
              <button onclick="details('${ai.id}')" class="btn rounded-full text-red-600"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
           </div>
          </div>`;


    
   

  
          
container.appendChild(div); 
bar.classList.add("hidden");
  })

/*<img
              src="${ai.image.ok ? ai.image : "https://i.ytimg.com/vi/Rm9MqgH7DP8/maxresdefault.jpg"}"
              alt="Ai"
              class="rounded-lg"
            />
*/
  
    
};

const details = async (ai) =>{
  const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${ai}`)
  const data = await response.json()

const int = data.data.integrations
const pricing = data.data.pricing; // .price
const features = data.data.features; // .price
const modalContainer = document.getElementById('modal')


 console.log(int); 






const featuresAppend = () =>{
 let fList = ""
 for(const f in features){
  
  fList += `<li>${features[f].feature_name}</li>`;
 }
return fList;

}

const intAppend = () =>{
  let intList = "";
  if(int == null){
    console.log('null')
     intList = "No Data Available";
     return intList;

  }
  else{
    int.forEach((i) => {
      intList += `<li>${i}</li>`;
    });
    return intList;
  }
  
}



let pricingArr = []
pricing?.forEach(price=>{
  pricingArr.push(price.price)
})



modalContainer.innerHTML = `

<div class="bg-red-50 shadow-xl lg:w-9/12 rounded-2xl outline outline-1 outline-red-300 p-5 space-y-5 flex flex-col justify-around items-center">
              <h1 class="text-2xl font-bold">
              ${data.data.description}
              </h1>
              <div class="flex flex-col md:flex-row justify-between gap-5">
                <div class="rounded-xl w-32 p-5 text-center font-semibold text-base bg-white text-green-700 ">${
                  pricingArr[0] || "No Data"
                }</div>
                <div class="rounded-xl w-32 p-5 text-center font-semibold text-base bg-white text-orange-500 ">${
                  pricingArr[1] || "No Data"
                }</div>
                <div class="rounded-xl w-32 p-5 text-center font-semibold text-base bg-white text-red-600 ">${
                  pricingArr[2] || "No Data"
                }</div>
                
              </div>
              <div class="flex flex-col md:flex-row md:gap-44">
                <div>
                  <h3 class="text-2xl font-bold">Features</h3>
                  <ul  class="list-disc">
                    ${featuresAppend()}
                  </ul>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">Integrations</h3>
                  <ul>
                  ${intAppend()} 
                  
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-base-100 shadow-xl space-y-5 md:w-9/12 rounded-2xl outline outline-1 outline-red-300 p-5">
              <figure>
                <img
                  src="${data.data.image_link[0]}"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="text-center">
                <h1 class="text-3xl font-semibold">
                  Can you give any example?
                </h1>
                <p>No! Not Yet! Take a break!!!</p>
              </div>
             <div class="flex justify-end">
  <a  target="_blank" href="${data.data.website}" class="btn">visit ${
  data.data.tool_name
}</a>
</div> 
            </div>


`;


window.location = "#details";

// details.showModal();






  // console.log(data.data.description)
  // console.log(data.data.accuracy.score);
  // console.log(data.data.tool_name);
  // console.log(data.data.integrations); //array
  // console.log(data.data.pricing); //array get price loop
  // console.log(data.data.image_link[0]); 
  // console.log(data.data.website); 
  // console.log(data.data); 
  

  }



getAi();