const $id = id => document.getElementById(id);
const $className = className => document.getElementsByClassName(className);
const $create = elem => document.createElement(elem);
const $append = (parentElem, childElem) => parentElem.appendChild(childElem);
const $addToClassList = (elem, ...classNames) =>
  elem.classList.add(...classNames);
const $removeFromClassList = (elem, ...classNames) =>
  elem.classList.remove(...classNames);

const COLORS = ['red', 'green', 'blue', 'purple', 'brown'];

let currentSlideNumber = 1;
let totalSlidesNumber = 0;
const allShortcuts = [];

const shortcutSlider = $id('shortcutSlider');
const shortcutsWrapper = $id('shortcutsWrapper');
const addShortcutHex = $id('addShortcutHex');
const sliderLeft = $id('sliderLeft');
const sliderRight = $id('sliderRight');
const currentSlideHTML = $id('currentSlide');
const totalSlidesHTML = $id('totalSlides');
const dialog = $id('addShortcutDialog');
const nameInput = $id('nameInput');
const urlInput = $id('urlInput');
const cancelBtn = $id('cancelBtn');
const doneBtn = $id('doneBtn');
const searchBoxForm = $id('searchBox-form');
const searchEngineBtn = $id('search-engine');
console.log('localStorage',localStorage);
const changeDoneBtnClass = () => {
  if (nameInput.value && urlInput.value) {
    $removeFromClassList(doneBtn, 'add-shortcut-done-button-disabled');
    $addToClassList(doneBtn, 'add-shortcut-done-button');
  } else {
    $removeFromClassList(doneBtn, 'add-shortcut-done-button');
    $addToClassList(doneBtn, 'add-shortcut-done-button-disabled');
  }
};

const resetInputFields = () => {
  nameInput.value = null;
  urlInput.value = null;
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBrowserBookmark(title, url) {
  chrome.bookmarks
    .create({
      parentId: '1',
      title,
      url,
    })
    .then(({ id }) => {
      if (
        currentSlideNumber === totalSlidesNumber &&
        shortcutsWrapper.childElementCount < 5
      ) {
        addShortcut(title, url, id);
      }

      allShortcuts.push({ title, url, id });
      updateTotalSlidesNumber();
      updateSlider();
      totalSlidesHTML.innerText = totalSlidesNumber;
      closeDialog();
    })
    .catch(e => alert(e));
}

const updateTotalSlidesNumber = () =>
  (totalSlidesNumber = Math.ceil(allShortcuts.length / 5));

const addShortcut = (name, url, removeId) => {
  const shortcut = $create('div');
  $addToClassList(shortcut, 'shortcut');

  // shortcuts children
  const hexagonWrapper = $create('div');
  $addToClassList(hexagonWrapper, 'hexagon-wrapper');

  const shortcutName = $create('span');
  $addToClassList(shortcutName, 'shortcut-name');
  shortcutName.innerText =
    name.length < 18 ? name : `${name.substring(0, 14)}...`;

  // hexagonWrapper children
  const innerHexagonWrapper = $create('div');
  $addToClassList(innerHexagonWrapper, 'inner-hexagon-wrapper');

  const outerHexagon = $create('div');
  $addToClassList(outerHexagon, 'hexagon', 'outer-hexagon1');

  const remove = $create('div');
  remove.innerText = 'X';
  $addToClassList(remove, 'remove-shortcut');
  remove.addEventListener('click', e => {
    e.stopPropagation();

    chrome.bookmarks.remove(`${removeId}`).then(() => {
      const removedShortcutIndex = allShortcuts.findIndex(
        shortcut => shortcut.id === removeId
      );
      allShortcuts.splice(removedShortcutIndex, 1);
      updateTotalSlidesNumber();
      updateSlider();
    });
  });

  // innerHexagonWrapper child
  const innerHexagon = $create('div');
  $addToClassList(innerHexagon, 'hexagon', 'inner-hexagon1');

  // innerHexagon child
  const inInnerHexagon = $create('div');
  $addToClassList(inInnerHexagon, 'hexagon-in1');

  // inInnerHexagon child
  const inInnerHexagonChild = $create('div');
  $addToClassList(inInnerHexagonChild, 'hexagon-in2', 'inner-hexagon-in2');
  // inInnerHexagonChild.style.backgroundColor = COLORS[randomInteger(0, 4)];
  inInnerHexagonChild.style.backgroundImage = `url('https://s2.googleusercontent.com/s2/favicons?domain_url=${url}')`;

  // inInnerHexagonChild child
  const shortcutLetterInHexagon = $create('span');
  $addToClassList(shortcutLetterInHexagon, 'shortcut-letter');
  // shortcutLetterInHexagon.innerText = name.charAt(0);

  // outerHexagon child
  const inOuterHexagon = $create('div');
  $addToClassList(inOuterHexagon, 'hexagon-in1');

  // inOuterHexagon child
  const shortcutUrl = $create('a');
  shortcutUrl.href = url;

  // shortcutUrl child
  const shortcutUrlChild = $create('div');
  $addToClassList(shortcutUrlChild, 'hexagon-in2', 'outer-hexagon-in2');

  //appending
  $append(shortcut, hexagonWrapper);
  $append(shortcut, shortcutName);

  $append(hexagonWrapper, innerHexagonWrapper);
  $append(hexagonWrapper, outerHexagon);
  $append(hexagonWrapper, remove);

  $append(innerHexagonWrapper, innerHexagon);

  $append(innerHexagon, inInnerHexagon);

  $append(inInnerHexagon, inInnerHexagonChild);

  $append(inInnerHexagonChild, shortcutLetterInHexagon);

  $append(outerHexagon, inOuterHexagon);

  $append(inOuterHexagon, shortcutUrl);

  $append(shortcutUrl, shortcutUrlChild);

  shortcutsWrapper.appendChild(shortcut);

  updateTotalSlidesNumber();
};

const updateSlider = () => {
  if (!allShortcuts.length) {
    shortcutSlider.style.display = 'none';
    return;
  }

  if (currentSlideNumber > totalSlidesNumber)
    currentSlideNumber = totalSlidesNumber;

  shortcutSlider.style.display = 'block';

  shortcutsWrapper.innerHTML = '';
  const startIndex = (currentSlideNumber - 1) * 5;
  const endIndex =
    startIndex + 5 < allShortcuts.length ? startIndex + 5 : allShortcuts.length;

  for (let i = startIndex; i < endIndex; i++) {
    const { title, url, id } = allShortcuts[i];
    addShortcut(title, url, id);
  }

  currentSlideHTML.innerText = currentSlideNumber;
  totalSlidesHTML.innerText = totalSlidesNumber;
};

sliderLeft.addEventListener('click', e => {
  e.stopPropagation();

  if (currentSlideNumber === 1) currentSlideNumber = totalSlidesNumber;
  else currentSlideNumber--;

  updateSlider();
});

sliderRight.addEventListener('click', e => {
  e.stopPropagation();

  if (currentSlideNumber === totalSlidesNumber) currentSlideNumber = 1;
  else currentSlideNumber++;

  updateSlider();
});

addShortcutHex.addEventListener('click', e => {
  e.stopPropagation();
  dialog.showModal();
});

dialog.addEventListener('click', e => {
  e.stopPropagation();
});

nameInput.addEventListener('input', changeDoneBtnClass);
urlInput.addEventListener('input', changeDoneBtnClass);

const closeDialog = () => {
  dialog.close();
  resetInputFields();
};

cancelBtn.addEventListener('click', closeDialog);

doneBtn.addEventListener('click', () => {
  const { value: name } = nameInput;
  const { value: url } = urlInput;

  createBrowserBookmark(name, url);
});

window.addEventListener('load', () => {
  chrome.bookmarks
    .getTree()
    .then(trees => {
      trees.forEach(({ children: childNodes }) => {
        childNodes.forEach(({ children: bookmarks }) => {
          bookmarks.forEach(({ title, url, id }) => {
            allShortcuts.push({ title, url, id });
          });
        });
      });
    })
    .then(() => {
      updateTotalSlidesNumber();
      updateSlider();
    });
});

// --------------- change search engine ------------
function changeSearchEngine(searchEngine){
  
  console.log('changeSearchEngine',searchEngine);
  switch(searchEngine){
    case "Google":
      localStorage.setItem('SpaceSearchEngine', "Google");
      searchBoxForm.setAttribute("action","https://google.com/search?q=");
    break;
    case "Bing":
      localStorage.setItem('SpaceSearchEngine', "Bing" );
      searchBoxForm.setAttribute("action","https://www.bing.com/search?q=");
    break;
    case "DuckDuckGo":
      localStorage.setItem('SpaceSearchEngine', "DuckDuckGo" );
      searchBoxForm.setAttribute("action","https://duckduckgo.com/?q=");
    break;
    case "Ecosia":
      localStorage.setItem('SpaceSearchEngine', "Ecosia" );
      searchBoxForm.setAttribute("action","https://www.ecosia.org/search?method=chromedefaultnewtab&q=");
    break;
    default:
      if( ! localStorage.getItem("SpaceSearchEngine"))
      searchBoxForm.setAttribute("action","https://google.com/search?q=");
  }

 let curr = searchEngineBtn.querySelector(`[value="${searchEngine}"]`);//synchromize searchEngine textBtn
 if (curr) curr.selected=true;
}
searchBoxForm.addEventListener('change',(e)=>{
  changeSearchEngine(e.target.value);
});

window.addEventListener('DOMContentLoaded',()=>{
  //check local storadge on saved search engine
let savedEngine = localStorage.getItem('SpaceSearchEngine');
if (savedEngine) changeSearchEngine(savedEngine);
})
