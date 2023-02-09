// class Common {

//     makeUid() {
//         let d = new Date().getTime();
//         let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
//         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//             let r = Math.random() * 16;
//             if (d > 0) {
//                 r = (d + r) % 16 | 0;
//                 d = Math.floor(d / 16);
//             } else {
//                 r = (d2 + r) % 16 | 0;
//                 d2 = Math.floor(d2 / 16);
//             }
//             return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//         });
//     }
//     browserInfo() {
//         let ua = navigator.userAgent, tem,
//             M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
//         if (/trident/i.test(M[1])) {
//             tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
//             return {name: 'IE', version: (tem[1] || '')};
//         }
//         if (M[1] === 'Chrome') {
//             tem = ua.match(/\bOPR|Edge\/(\d+)/)
//             if (tem != null) {
//                 return {name: 'Opera', version: tem[1]};
//             }
//         }
//         M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
//         if ((tem = ua.match(/version\/(\d+)/i)) != null) {
//             M.splice(1, 1, tem[1]);
//         }
//         return M[1];
//     }
//     encodeUrlParams(data) {
//         const ret = [];
//         for (let d in data)
//             ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
//         return ret.join('&');
//     }
// }

// let common_functions = new Common();

// let USER_ID = "";
// let SECRET;
// let ffVersion = common_functions.browserInfo();

// var SEARCH_DOMAIN = "spacespiders.net";
// var EXTENSION = "SpaceSpiders";
// var EXTENSION_CODE = 16;
// let utm_uid = "";

// let installation_week = "0";
// let installation_year = "";

// chrome.storage.local.get(["secret", "userId", "utm_uid", "installation_week", "installation_year"], function(items) {
//     if(items.userId !== undefined)
//     {
//         USER_ID = items.userId;
//     }
//     if(items.secret !== undefined)
//     {
//         SECRET = items.secret;
//     }
//     if(items.utm_uid !== undefined)
//     {
//         utm_uid = items.utm_uid;
//     }
//     if (items.installation_week !== undefined) {
//         installation_week = items.installation_week;
//     }
//     if (items.installation_year !== undefined) {
//         installation_year = items.installation_year;
//     }
// });


// chrome.runtime.onInstalled.addListener(onRuntimeInstalled);

// function onRuntimeInstalled(details) {
//     if (details.reason === "install")
//         onExtensionInstalled();
//     else if (details.reason === "update")
//         onExtensionUpdated();
// }

// function fireInstallPixel(userId) {
//     const url = "https://" + SEARCH_DOMAIN + "/ch/install.php";
//     let parameters = {
//         uid: userId,
//         b: "chrome",
//         extension: EXTENSION,
//         theme_index: EXTENSION_CODE
//     };
//     fetch(url, {
//         method: "POST",
//         body: JSON.stringify(parameters)
//     })
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         SECRET = data["ch"];
//         utm_uid = data["utm_uid"];
//         chrome.storage.local.set({ secret: SECRET, utm_uid: utm_uid });

//         if (installation_year === "" && installation_week === "0") {
//             if ("week" in data) {
//                 back_calculated_week = data["week"];
//                 installation_week = String(back_calculated_week)
//                 chrome.storage.local.set({"installation_week": installation_week});
//             }
//             if ("year" in data) {
//                 back_calculated_year = data["year"];
//                 installation_year = String(back_calculated_year);
//                 chrome.storage.local.set({"installation_year": installation_year});
//             }
//         }
//     });
// }
// function getWeekNumber(d) {
//     d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
//     d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
//     let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
//     let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
//     return [d.getUTCFullYear(), weekNo];
// }

// function onExtensionInstalled(){

//     try {
//         let year_and_week = getWeekNumber(new Date());
//         installation_week = String(year_and_week[1]);
//         installation_year = String(year_and_week[0]);
//         chrome.storage.local.set({
//             "installation_week": installation_week,
//             "installation_year": installation_year});
//     } catch {
//         console.log("Error getting week number");
//     }

//     USER_ID = common_functions.makeUid();
//     chrome.storage.local.set({ userId: USER_ID }, function() {
//         fireInstallPixel(USER_ID);
//     });
//     var uninstallURL = "https://" + SEARCH_DOMAIN + "/ch/uninstall.php?&uid=" + USER_ID;
//     chrome.runtime.setUninstallURL(uninstallURL);

// }

// function onExtensionUpdated(){
//     if(USER_ID === "" || USER_ID === undefined){
//         chrome.storage.local.get("userId", function(items) {
//             if(items.userId === undefined){
//                 USER_ID = common_functions.makeUid();
//                 chrome.storage.local.set({ userId: USER_ID });
//                 var uninstallURL = "https://" + SEARCH_DOMAIN + "/ch/uninstall.php?&uid=" + USER_ID;
//                 chrome.runtime.setUninstallURL(uninstallURL);
//             }
//             else{
//                 USER_ID = items.userId;
//             }
//         });
//     }
// }
