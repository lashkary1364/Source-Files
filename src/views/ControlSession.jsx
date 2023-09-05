export default function ControlSession() {

    if (localStorage.getItem("access-tocken") == null) {
        window.location.replace('/');
        return;
    }

    if (sessionStorage.getItem("mohitId") == null) {
        window.location.replace('/');
        return;
    }

    if (sessionStorage.getItem("salId") == null) {
        window.location.replace('/');
        return;
    }

    if (sessionStorage.getItem("salMali") == null) {
        window.location.replace('/');
        return;
    }

    if (sessionStorage.getItem("LoginTocken") == null) {
        window.location.replace('/');
        return;
    }
    
}
