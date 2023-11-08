function checkLocalStorage() {
  if (localStorage.getItem('dark-mode')) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

window.addEventListener('load', checkLocalStorage());
document.getElementById('lightDarkBtn').addEventListener('click', () => {
  let darkModeFlag = false;
  if (localStorage.getItem('dark-mode')) {
    darkModeFlag = true;
  } else {
    darkModeFlag = false;
  }
  if (darkModeFlag) {
    localStorage.removeItem('dark-mode');
    checkLocalStorage();
  } else {
    localStorage.setItem('dark-mode', true);
    checkLocalStorage();
  }
})