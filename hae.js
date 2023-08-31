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
