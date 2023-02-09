// //settings
// const settingsIcon = $id('settingsIcon');
// const settingsWindow = $id('settingsWindow');
// const resetTimerInput = $id('resetTimerInput');
// const waveSpeed = $id('waveSpeed');
// const rotatingSpeed = $id('rotatingSpeed');

// waveSpeed.value = localStorage.getItem('waveSpeed') || 4;
// rotatingSpeed.value = localStorage.getItem('rotatingSpeed') || 0;

// DISPLAY = {
//   block: 'block',
//   none: 'none',
// };

// settingsWindow.addEventListener('click', e => e.stopPropagation());

// settingsIcon.addEventListener('click', e => {
//   e.stopPropagation();

//   if (settingsWindow.style.display === DISPLAY.none) {
//     settingsWindow.style.display = DISPLAY.block;
//   } else {
//     settingsWindow.style.display = DISPLAY.none;
//   }
// });

// // Searchbox
// document
//   .querySelector(".searchbox [type='reset']")
//   .addEventListener('click', () =>
//     this.parentNode.querySelector('input').focus()
//   );

// const searchBox = $id('searchBox');
// searchBox.addEventListener('click', e => e.stopPropagation());

// // Settings
// const setSettings = (setting, maxValue) =>
//   setting.addEventListener('input', event => {
//     event.preventDefault();
//     const value = event.target.value;

//     if (value < 0) setting.value = 0;
//     if (value > maxValue) setting.value = maxValue;
//     localStorage.setItem(setting.id, setting.value);
//   });

// setSettings(waveSpeed, 10);
// setSettings(rotatingSpeed, 30);


// var USER_ID = '';
// var SECRET = '';
// var utm_uid = '';

// var installation_week = '0';
// var installation_year = '';
//здесь связываемся с SpaceSpiders
// window.addEventListener('load', function() {
//     chrome.storage.local.get(["secret", "userId", "utm_uid", "installation_week", "installation_year"
//     ], function (items) {
//       console.log(typeof USER_ID,'items ',items);
//         if (items.userId !== undefined) {
//             USER_ID = items.userId;
//         }
//         if (items.secret !== undefined) {
//             SECRET = items.secret;
//         }
//         if (items.utm_uid !== undefined) {
//             utm_uid = items.utm_uid;
//         }
//         if (items.installation_week !== undefined) {
//             installation_week = items.installation_week;
//         }
//         if (items.installation_year !== undefined) {
//             installation_year = items.installation_year;
//         }

//         document.getElementById("ext_ch").value = SECRET
//         document.getElementById("ext_e_uid").value = USER_ID
//         document.getElementById("ext_click_id").value = utm_uid
//         document.getElementById("ext_e_title").value = "SpaceSpiders"
//         document.getElementById("ext_e_install_week").value = installation_week
//         document.getElementById("ext_e_install_year").value = installation_year
//     });
// })