  
  // POKEDEX

  // 1  Se puede realizar la busqueda mediande el nombre del pokemon o  su numero de ID si lo conoce.
  // 2  Si el pokemon está escrito incorrecto o no existe. 
  
  let body = document.querySelector("body")
  let infoUser = document.createElement("div");
  let namePoke = document.createElement("div");
  let halbilitys  = document.createElement("div");
  let imgPoke  = document.createElement("img");
  let typePoke  = document.createElement("div");
  let buttonFind = document.createElement("button");
  let next = document.createElement("button");
  let previous = document.createElement("button");
  let input = document.createElement("input");
  let divScreen = document.createElement("div");
  infoUser.setAttribute("class", "infoUser")
  buttonFind.setAttribute("class", "find glow-on-hover")
  previous.setAttribute("class", "previous glow-on-hover-previous")
  input.setAttribute("class", "input")
  next.setAttribute("class", "next glow-on-hover-next")
  namePoke.setAttribute("class", "namePoke")
  halbilitys.setAttribute("class", "halbilitys")
  imgPoke.setAttribute("class", "imgPoke")
  typePoke.setAttribute("class", "typePoke")
  body.appendChild(buttonFind);
  infoUser.textContent = "You can search the pokemon by its name"

  body.appendChild(next);
  body.appendChild(previous);
  body.appendChild(divScreen);

 

  buttonFind.addEventListener("click", function( event ) {
    divScreen.setAttribute("class", "backgroung-glow-click") 
      body.appendChild(input);
      body.appendChild(infoUser);
      infoUser.textContent = "You can search the pokemon by its name"
    if ( input.value){
      getPoke(input.value.toLowerCase());
    }else{
      input.value = 1;
      getPoke(input.value)
    }
  }, false);

  next.addEventListener("click", function( event ) {
    // podiamos hacer la comprobacion si el valor del input es o no  numerico con isNaN(number) o isNaN("string")
    divScreen.setAttribute("class", "backgroung-glow-click") 
    body.appendChild(input);
    infoUser.textContent = "You can search the pokemon by its name"
    input.value ++
    getPoke(input.value);

  }, false);

  previous.addEventListener("click", function( event ) {
    infoUser.textContent = "You can search the pokemon by its name"
    input.value --
    getPoke(input.value);
  }, false);


  const getPoke = (pokemon) => {
    
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(data => data.json())
      .then(function(response) {  
        // podemos hacer la comprobacion si el valor del input es o no  numerico con isNaN(number) o isNaN("string")
        const queryParams = new URLSearchParams(window.location.search)
        if(  isNaN(pokemon) )  {
          pokemon = response.id 
          input.value =  response.id
        }  
          if(pokemon >= 650){
            imgPoke.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${pokemon}.png`);
          }  else{
            imgPoke.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon}.gif`);
          }
          response.forms.forEach( e =>  namePoke.innerText = e.name )
          halbilitys.innerText =  response.abilities.map( e => e.ability.name)
          typePoke.innerText = response.types.map( e => e.type.name)
          
          body.appendChild(namePoke);
          body.appendChild(halbilitys);
          body.appendChild(imgPoke);
          body.appendChild(typePoke);
           
      })
      .catch(error => {
        input.value = 1;
        infoUser.textContent = "There is no pokemon or it is misspelled."
        console.log(error)
    })
  };
 
/*   let parkAvenueHouse = {
    address: "50 Park Avenue",
    price: 195000,
    currentOwner: [{
      firstName: "Marie",
      lastName: "McDonald",
      email: "marie.m@real-emails.com",
    }],
  };
   
  console.log (` parkAvenueHouse: ${parkAvenueHouse.currentOwner.firstName}`)
  console.log (` parkAvenueHouse2: ${parkAvenueHouse.currentOwner.map( e=> e.firstName)}`) */
  

