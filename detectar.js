import { getUser } from './verify-user.js';

const sectionLogin = document.getElementById("isLogin");
const sectionDetectar = document.getElementById("detectar");

(async () => {
    const user = await getUser();

    console.log(user)
    if(user && user.id) {
        sectionLogin.style.display = "none";   
        sectionDetectar.style.display = "block";
    } else {
        sectionLogin.style.display = "block";   
        sectionDetectar.style.display = "none";
    }
})();