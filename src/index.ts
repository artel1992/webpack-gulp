import {showDropMenu} from "./components/header"

let headerAvatar = document.getElementById('header-avatar')
headerAvatar.addEventListener('click', (event) => showDropMenu(event))
