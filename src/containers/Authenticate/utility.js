export const asyncButton = (loading) => {
    if (loading) {
        document.querySelector('.btn-auth__submit').setAttribute('disabled', 'true');
    } else {
        document.querySelector('.btn-auth__submit').removeAttribute('disabled');
    }
}