
export const initPlausible = () => {
    const plausible = document.createElement('script');
    plausible.async = true;
    plausible.type = 'text/javascript';
    plausible.src = "//analitika.zodziuks.lt/js/plausible.js";
    plausible.dataset.domain = "zodziuks.lt";
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(plausible);
}

export const recordEvent = (eventName, additionalData = {} ) => {
    if(plausible){
        console.debug(`[ANALYTICS] Logging event: ${eventName} with params: ${JSON.stringify(additionalData)}`);
        plausible(eventName, { props: additionalData });
    }else{
        console.error("Plausible is not initialized while recording event: " + eventName);
    }
}

export const EVENT_TYPE = {
    // Logged when user successfully shares their result (mobile only)
    SHARED : "shared",
    // Logged when user copies share text to clipboard (desktop only)
    SHARED_CLIPBOARD : "shared_clipboard",
    // Logged when user successfully guesses the correct word.
    // numGuesses should be appended as an additional metric
    SOLVED : "solved",
    // Logged when user fails to guess the correct word
    FAILED : "failed"
}