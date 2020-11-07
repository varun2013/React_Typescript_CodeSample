export function setUserDetails(data: object) {
    localStorage.setItem('typeData', btoa(JSON.stringify(data)));
}

export const getUserDetails = () => {
    if (localStorage.getItem('typeData') === null) {
        return '';
    }
    try {
        let data: any = localStorage.getItem('typeData')
        const userData = JSON.parse(atob(data));
        return userData;
    } catch (e) {
        return e;
    }
}