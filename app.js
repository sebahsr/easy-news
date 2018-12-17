const apikey='100d5aa8b36e44b69e1ec905648fc82c'
const main=document.querySelector('main')
const sourceselector= document.querySelector('#sourceselector')
const defaultsourc='the-washington-post';
window.addEventListener('load',async e=>{
    await updatesource();
   sourceselector.value=defaultsourc
   updatenews();
   if('serviceWorker' in navigator){
       try{
           console.log('works')
           navigator.serviceWorker.register('./ser.js');
           
       }
       catch{
        
       }
   }
});
sourceselector.addEventListener('change',e=>{
   updatenews(e.target.value)})
async function updatesource(){
    const res= await fetch(`https://newsapi.org/v1/sources`)
    const json =await res.json();
    sourceselector.innerHTML=json.sources
    .map(src=>`<option value='${src.id}'>${src.name}</options>`)
    .join('\n')
}
async function updatenews(source=defaultsourc){
    const res= await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`)
    const json =await res.json();
    main.innerHTML= json.articles.map(createarticle).join('\n')
}

function createarticle(article){

    return `
     
    <div class='box'>
    <a href='${article.url}'><h3>${article.title}</h3> </a>
     <img src='${article.urlToImage}'>
      <p>${article.description}</p>
        </div>
       
    `;
}