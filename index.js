let speech= new SpeechSynthesisisUtterance();

document.querySelector("button").addEventListener("click",()=>{
    speech.text= document.querySelector("textarea").value;
    window.speechSynthesis.speak
})