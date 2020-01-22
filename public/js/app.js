

console.log('client js is loaded')


const weatherForm = document.querySelector('form') ;
const search = document.querySelector('input') ;
const messageOne = document.querySelector('#message-1') ;
const messageTwo = document.querySelector('#message-2') ;

messageOne.textContent ='123å'

weatherForm.addEventListener('submit', (e)=>{
    messageOne.textContent ='loading ....'
    const location = search.value
fetch(`http://localhost:3001/weather?adress=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent =data.error;
            return;
           
        }
        messageOne.textContent =`Loctaion ${data.location}`;
        messageTwo.textContent =` ${data.forcast}`;
    })});

    e.preventDefault();
    
    console.log('testing',location)
})