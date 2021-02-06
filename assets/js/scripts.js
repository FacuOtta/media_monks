const slide = document.querySelector('.slide');
const sentences = document.querySelectorAll('#sentencesContainer > div')
const mainImage = slide.querySelector('img');
const maxImageWidth = 12226; // original image width in pixels
const tabsCounter = document.querySelector('#counter');
const templeOpenMsg = document.querySelector('.temple-open');
const liMessage = document.querySelector('.tab-counter-msg');

// slide to this positions. Based on original image size
let slidesLeftPosition = [0, 1510, 2510, 3610, 4910, 6710, 8010, 9510, 9900, 11410];
// what percentage of the image represents each slideLeftPosition so i can recalculate later
let percentages = [0, 12, 20, 30, 40, 55, 65, 78, 81, 93];
let currentPosition = 0;

const calculateStartingPositions = () => {
  const imageNewWidth = mainImage.width;
  percentages.forEach((percentage, index) => {
    slidesLeftPosition[index] = Math.floor((percentage * imageNewWidth) / 100);
  });
}

const prev = () => {
  hideCurrentSentence();
  currentPosition--;
  goToSlide(currentPosition)
}

const next = () => {
  hideCurrentSentence();
  currentPosition++;
  goToSlide(currentPosition)
}

const goToSlide = (position) => {
  hideCurrentSentence();
  currentPosition = position;
  setSelectedTab();
  slide.style.transform = `translateX(-${slidesLeftPosition[position]}px)`;
}

const isLastSlide = () => {
  return currentPosition === slidesLeftPosition.length - 1;
}

const isFirstSlide = () => {
  return currentPosition === 0;
}

const hideCurrentSentence = () => {
  sentences[currentPosition].style.display = 'none';
}

const showNextSentence = () => {
  sentences[currentPosition].style.display = 'block';
}

const setSelectedTab = () => {
  let lis = document.querySelectorAll('.nav li'); // get all LIs
  
  // loop through array of LIs
  lis.forEach((li, index) => {
    if (index === currentPosition){ // if this tab is selected, add 'selected' class
      li.querySelector('span').classList.add('selected');
    } else { // if not, remove 'selected' class
      li.querySelector('span').classList.remove('selected');
    }
  });
  tabsCounter.textContent = currentPosition; // changing number of step

  // show or hide tab counter message accordingly
  if ((isFirstSlide() || isLastSlide())){
    // hide last LI
    liMessage.style.display = 'none';
  } else {
    // show last LI
    liMessage.style.display = 'flex';
  }
}

const togglePrevBtn = () => {
  if (isFirstSlide()) {
    document.querySelector('#prevBtn').style.display = 'none';
  } else {
    document.querySelector('#prevBtn').style.display = 'block';
  }
}

const toggleNextBtn = () => {
  if (isLastSlide()) {
    document.querySelector('#nextBtn').style.display = 'none';
  } else {
    document.querySelector('#nextBtn').style.display = 'block';
  }
}

const toggleTempleOpenMsg = () => {
  if (isFirstSlide()) {
    templeOpenMsg.style.display = 'block';
  } else {
    templeOpenMsg.style.display = 'none';
  }
}

const loadSlider = () => {
  // after one second we hide the loading image and display the slider
  setTimeout(() => {
    document.querySelector('.patience').style.display = 'none';
    document.querySelector('.slider').style.top = 0;
  }, 1000);
} 

// EVENT LISTENERS

// when the screen finished loading do this
window.onload = () => {

  // after one second we hide the first message, show the second one and call the function that loads the Slider
  setTimeout(() => {
    const loadingMessages = document.querySelectorAll('.loading-message > div');
    loadingMessages[0].style.display = 'none';
    loadingMessages[1].style.display = 'block';
    loadSlider();
  }, 1000);

  if (window.innerHeight < mainImage.height) {
    mainImage.height = window.innerHeight;
    calculateStartingPositions();
  }

  togglePrevBtn();
  toggleNextBtn();
}

// recalculate positions after resizing the window
window.addEventListener('resize', () => {
  setTimeout(() => {
    if (window.innerHeight != mainImage.height && window.innerHeight < maxImageWidth) {
      mainImage.height = window.innerHeight;
      calculateStartingPositions();
    }
  }, 1000);
})

// perform this actions after the transition is over
slide.addEventListener('transitionend', () => {
  showNextSentence();
  togglePrevBtn();
  toggleNextBtn();
  toggleTempleOpenMsg();
});