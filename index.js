const oNegative = ['O-', 'O', 'A-', 'A', 'B-', 'B', 'AB-', 'AB'];

document.querySelector('#O-').addEventListener('click', () => {
  document.querySelector('.blood').classList.toggle('reduce-blood');
  document.querySelector('.hose div').classList.toggle('hose-progress');
  for (let blood of oNegative) {
    document
      .querySelector(`.${blood} div`)
      .classList.toggle(`${blood}-progress`);
  }
});
