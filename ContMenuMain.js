

/***********************************************
	Resource: app/jsUiElements/ContMenuMain.js
***********************************************/



function createSandBox() {
    var main    = document.getElementById('main');
    var sandBox = document.createElement('div');
    sandBox.id  = "sandbox";
    main.appendChild(sandBox);
    return sandBox;
}
var menuElement1Callback = function() {
    alert("Menu Element 1 pressed");
}
var menuElement2Callback = function() {
    alert("Menu Element 2 pressed");
}

function uiContMenuMain() {
    var sandBox                = createSandBox();
    var display                = document.createElement('div');
    display.id                 = "display";
    display.className          = "settings";
    sandbox.appendChild(display);

    display.innerHTML          = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#BCBEC0" d="M57.68,27.86l6.18-2.56l-4.59-11.09l-6.19,2.56c-1.64-2.27-3.62-4.25-5.85-5.86l2.56-6.18L38.7,0.14 l-2.56,6.18c-1.36-0.22-2.74-0.33-4.15-0.33c-1.39,0-2.77,0.11-4.13,0.34L25.3,0.14L14.21,4.73l2.57,6.2 c-2.28,1.64-4.25,3.63-5.84,5.85l-6.21-2.57L0.14,25.3l6.2,2.57c-0.44,2.7-0.46,5.49-0.01,8.26v0.01L0.14,38.7l4.59,11.09 l6.19-2.56c1.64,2.27,3.62,4.25,5.85,5.86l-2.56,6.18l11.09,4.59l2.56-6.18c1.36,0.22,2.74,0.33,4.15,0.33 c1.39,0,2.77-0.11,4.13-0.34l2.56,6.19l11.09-4.59l-2.56-6.19c2.26-1.62,4.23-3.59,5.85-5.85l6.19,2.56l4.59-11.09l-6.18-2.56 C58.13,33.4,58.13,30.6,57.68,27.86z M45.99,32.7c-0.08,1.58-0.43,3.15-1.06,4.66c-0.62,1.5-1.49,2.86-2.54,4.03 c-0.32,0.35-0.65,0.68-1,1c-1.17,1.05-2.53,1.92-4.03,2.54c-1.5,0.63-3.06,0.98-4.66,1.06c-0.23,0.01-0.46,0.02-0.69,0.02 c-0.24,0-0.48-0.01-0.71-0.03c-3.29-0.15-6.34-1.45-8.69-3.59c-0.35-0.32-0.69-0.65-0.99-1.01c-1.06-1.16-1.93-2.52-2.55-4.02 c-0.64-1.52-0.98-3.09-1.05-4.65c-0.03-0.48-0.02-0.95,0.01-1.42c0.16-3.21,1.43-6.29,3.59-8.67c0.31-0.36,0.65-0.69,1-1 c1.15-1.05,2.5-1.92,4.02-2.55c1.5-0.63,3.06-0.98,4.66-1.06c0.23-0.01,0.46-0.02,0.69-0.02c0.24,0,0.48,0.01,0.71,0.03 c3.29,0.15,6.34,1.45,8.69,3.59c0.35,0.32,0.69,0.65,0.99,1.01c1.06,1.16,1.93,2.52,2.55,4.02c0.63,1.51,0.98,3.08,1.06,4.66 C46.02,31.77,46.02,32.23,45.99,32.7z"/></g></svg>'

    var settingsContMenu       = document.createElement('ul');
    settingsContMenu.className = "ContMenu";
    settingsContMenu.id        = "settingsContMenu";

    var menuElement1           = document.createElement('li');
    menuElement1.className     = "MenuItem";
    menuElement1.id            = "menu-elem-1";
    menuElement1.innerHTML     = "Menu Element 1";
    settingsContMenu.appendChild(menuElement1);

    var menuElement2           = document.createElement('li');
    menuElement2.className     = "MenuItem";
    menuElement2.id            = "menu-elem-2";
    menuElement2.innerHTML     = "Menu Element 2";
    settingsContMenu.appendChild(menuElement2);

    display.appendChild(settingsContMenu);

    var contextMenu            = new ContMenu("settingsContMenu", 0, 0, "settings", false);
    contextMenu.connectElement("menu-elem-1", "menuElement1Callback", true);
    contextMenu.connectElement("menu-elem-2", "menuElement2Callback", true);

}


window.onload = uiContMenuMain;
