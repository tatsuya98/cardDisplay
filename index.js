const getErrorName = () =>{
    return document.querySelector('.error-name')
}

const getErrorBlank = () =>{
    return document.querySelectorAll('.error')
}

const getErrorNumber = () =>{
    return document.querySelector('.error-number')
}

const getSubmitButton = () =>{
    return document.querySelector('.button')
}

const getCardNumber = () =>{
    return document.querySelector('.card-number')
}

const getCardName = () =>{
    return document.querySelector('.card-name')
}

const getCardExpire = () =>{
    return document.querySelector('.card-expire')
}

const getCardBackcode = () =>{
    return document.querySelector('.back-code')
}

const getInputs = () => {
    return document.querySelectorAll('input[type=text]')
}
const getForm = () =>{
    return document.querySelector('.card-info')
}


const validNameCheck = (input) => {
   return /^[a-zA-Z ]{2,30}$/.test(input.value)
}

const cardNumberCheck = (cardNumber) =>{
    return /^[0-9]{16}$/.test(cardNumber.value)
}
const changeBorderColor = () => {
    getInputs().forEach(item =>{
        item.addEventListener('click', () =>{
            item.style.borderColor = 'linear-gradient(hsl(249, 99%, 64%), hsl(278, 94%, 30%))'
        })
    })
}
const resetError = () =>{
    let errors = getErrorBlank()
    getInputs().forEach(item =>{
        item.style.borderColor = 'hsl(278, 68%, 11%)'
            if (item.name === 'month' ||item.name === 'year'){
                errors[2].style.display = 'none'
            }
            if (item.name === 'cardName' ){
                errors[0].textContent = 'Please enter a valid name'
                errors[0].style.display = 'none'
            }
            if (item.name === 'cardNumber' ){
                errors[1].textContent = 'Wrong format, nubmers only'
                errors[1].style.display = 'none'
            }
            if (item.name === 'code'){
                errors[3].style.display = 'none'
            }
    })
}
const addReset = () => {
    getInputs().forEach(item =>{
        item.addEventListener('click',resetError)
    })
}

const displayError = (element) =>{
    let errors = getErrorBlank()
    if(element.name === 'cardName' && !validNameCheck(element)){
        errors[0].textContent = 'Enter a name with at least 2 letters'
        errors[0].style.display = 'inline-block'
    }else if(element.name === 'CardName'){
        errors[0].style.display = 'inline-block'
    }
    else if(element.name === 'month' || element.name === 'year'){
        errors[2].style.display = 'inline-block'
    } else if(element.name === 'code'){
        errors[3].style.display = 'inline-block'
    }else if(element.name === 'cardNumber' && !cardNumberCheck(element)){
        errors[1].textContent = 'Please enter a 16 digit number'
        errors[1].style.display = 'inline-block'
    }else if(element.name === 'cardNumber' && !cardNumberCheck(element) && element.value.length > 16){
        errors[1].textContent = 'Please enter a 16 digit number'
        errors[1].style.display = 'inline-block'
    }
    else{

        errors[1].style.display = 'inline-block'
    }
   element.style.borderColor = 'hsl(0, 100%, 66%)'
   addReset()
}

const isEmpty = () =>{
    let empty = false
    getInputs().forEach(item =>{
        if(item.value.length < 2 || (!cardNumberCheck(item) && item.name === 'cardNumber')){
            displayError(item)
            empty = true
        }
    })
    return empty
}

const pageSwitch = () =>{
    const inputs = getInputs()
    if (isEmpty()){
        return
    }else{
        getSubmitButton().removeEventListener('click',(e)=>{
            e.preventDefault()
        })
        document.location = `./thanks.html?cardName=${inputs[0].value}&cardNumber=${inputs[1].value}&month=${inputs[2].value}&year=${inputs[3].value}&code=${inputs[4].value}`
    }
}

const updateCard = () =>{
    const params = new URL(window.location.href).searchParams
    getCardNumber().textContent = params.get('cardNumber')
    getCardExpire().textContent = `${params.get('month')}/${params.get('year')}`
    getCardName().textContent = params.get('cardName')
    getCardBackcode().textContent = params.get('code')
}

getSubmitButton().addEventListener('click', pageSwitch)
getSubmitButton().addEventListener('click', (e) =>{
    e.preventDefault()
})
changeBorderColor()