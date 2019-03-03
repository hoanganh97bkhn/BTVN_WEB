window.onload = ()=>{
    // find element
  
    const textArea = document.getElementById('content');
    textArea.addEventListener('input', (event)=>{
        const contentLeng=textArea.value.length;
        console.log(contentLeng);
        //find element
  
        const remainCharacters=document.getElementById('remain-characters');
        remainCharacters.innerText = `${200-contentLeng} characters left`;
        
  
  
        //change content
    });
  
  
    //addeventlistener
  };