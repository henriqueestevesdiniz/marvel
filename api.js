const publicKey = "fc0858395d34292262221508e501153a";
const privateKey = "ee17cdabb93ef8a6d844bce52edcbc14ed6bde68";

const baseURL = 'http://gateway.marvel.com/v1/public';

const imgChar = document.querySelector('.img-char')
const characterName = document.querySelector('.character-name');
const characterDescription = document.querySelector('.description')

const getCharacter = function(event, form) {
    event.preventDefault();
    console.log(form);
    const charName = form.charName.value;
    console.log(charName);
    let ts = Date.now();

    let hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

    let queryString = `${baseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${charName}`;

    fetch(queryString).then((response) => {
        response.json().then(jsonData => {
            console.log(jsonData);
            const name = jsonData.data.results[0].name;
            const description = jsonData.data.results[0].description;
            const imageUrl = jsonData.data.results[0].thumbnail.path;
            const imageExtension = jsonData.data.results[0].thumbnail.extension;
            const imgSrc = `${imageUrl}.${imageExtension}`;
            characterName.textContent = name;
            characterDescription.textContent = description;
            imgChar.src = imgSrc;
            imgChar.alt = name;
        })
    })
}