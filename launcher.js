window.isMessengerLoaded = false;
window.onMessengerLoad = () => {
    window.isMessengerLoaded = true;
    dispatchEvent(new CustomEvent("messengerLoaded"))
};

window.tryLaunch = params => {
    if (isMessengerLoaded) {
        window.hideSpinner();
        window.launch(params);
    } else {
        setTimeout(() => window.tryLaunch(params), 50);
    }
};

window.doLaunch = (parameters) => {
    if (parameters)
        window.tryLaunch(JSON.stringify(parameters));
};