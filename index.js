const allGrp = ['O-', 'O', 'A-', 'A', 'B-', 'B', 'AB-', 'AB'];
const oNegative = {
  'O-': ['O-', 'O', 'A-', 'A', 'B-', 'B', 'AB-', 'AB'],
  O: ['O', 'A', 'B', 'AB'],
  'A-': ['A-', 'A', 'AB-', 'AB'],
  A: ['A', 'AB'],
  'B-': ['B-', 'B', 'AB-', 'AB'],
  B: ['B', 'AB'],
  'AB-': ['AB-', 'AB'],
  AB: ['AB'],
};

let forwards = 'forwards';
let backwards = 'backwards';

Array.prototype.diff = function (a) {
  return this.filter((group) => a.indexOf(group) < 0);
};

// dynamic sheets
const sheet = (function () {
  let style = document.createElement('style');
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);
  return style.sheet;
})();

for (let blood of Object.keys(oNegative)) {
  document.querySelector(`#${blood}`).addEventListener('click', () => {
    if (
      document.querySelector('.hose div').classList.contains('hose-progress')
    ) {
      sheet.insertRule(
        '.forwards { animation: move-forwards 0.5s linear 0s 1 normal forwards;}',
        0
      );
      sheet.insertRule(
        '.backwards {animation: move-backwards 0.5s linear 0s 1 normal forwards;}',
        1
      );
    }
    document.querySelector('.blood').classList.add('reduce-blood');
    document.querySelector('.hose div').classList.add('hose-progress');
    let rest = allGrp.diff(oNegative[blood]);

    for (let bloodClass of oNegative[blood]) {
      let bloodElement;
      bloodElement = document.querySelector(`.${bloodClass} div`);
      if (bloodClass.indexOf('-') === -1) {
        if (bloodElement.classList.contains(backwards)) {
          bloodElement.classList.add(forwards);
        } else {
          bloodElement.classList.add(forwards);
        }
      } else {
        if (bloodElement.classList.contains(forwards)) {
          bloodElement.classList.add(backwards);
        } else {
          bloodElement.classList.add(backwards);
        }
      }
    }
    for (let bloodClass of rest) {
      let bloodElement;
      bloodElement = document.querySelector(`.${bloodClass} div`);
      if (bloodClass.indexOf('-') === -1) {
        if (bloodElement.classList.contains(backwards)) {
          bloodElement.classList.remove(backwards);
        }
        if (bloodElement.classList.contains(forwards)) {
          bloodElement.classList.add(backwards);
          bloodElement.classList.remove(forwards);
        }
      } else {
        if (bloodElement.classList.contains(forwards)) {
          bloodElement.classList.remove(forwards);
        } else if (bloodElement.classList.contains(backwards)) {
          bloodElement.classList.add(forwards);
          bloodElement.classList.remove(backwards);
        }
      }
    }
  });
}
