import './style.postcss';


function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
        registration.pushManager.subscribe({userVisibleOnly: true});
      }).catch(registrationError => {
      });
    });
  }
}


window.addEventListener('load', ()=> {
  new AjaxStage()
})

export default class AjaxStage {
  constructor () {
    this.EventBind()
  }

  EventBind () {
    this.FetchReq()
  }

  FetchReq() {
    fetch('https://spla2.yuu26.com/schedule')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const
        type = myJson.result.gachi
      console.log(type)

      type.forEach((element,index)=> {
        const  Parent = document.getElementById('app')       

        if(index === 0) {
          const
            itemRule = element.rule,
            ruleParagraph = `<p>${itemRule} <span>今はこれ</span></p>`
          Parent.insertAdjacentHTML('beforebegin',ruleParagraph)
              
        } else {
          const
            itemRule = element.rule,
            ruleParagraph = `<p>${itemRule} <span>${index*2}時間後くらい</span></p>`
          Parent.insertAdjacentHTML('beforebegin',ruleParagraph)
        }




        for (let index = 0; index < element.maps_ex.length; index++) {
          const
            itemimage = element.maps_ex[index].image,
            itemName = element.maps_ex[index].name,
            imageHTML = `<figure><img src="${itemimage}" /></figure>`,
            itemParagpraph = `<span>${itemName}</span>`

          Parent.insertAdjacentHTML('beforebegin',itemParagpraph)

          Parent.insertAdjacentHTML('beforebegin',imageHTML)
        }

      });        
    });
  }
}