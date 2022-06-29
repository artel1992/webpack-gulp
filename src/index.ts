import {showDropMenu} from "./components/header"

console.log()
let headerAvatar = document.getElementById('header-avatar')
headerAvatar.addEventListener('click', (event) => showDropMenu(event))
