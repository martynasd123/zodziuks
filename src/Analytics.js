
const initPlausible = () => {
    const plausible = document.createElement('script');
    plausible.async = true;
    plausible.type = 'text/javascript';
    plausible.src = "//analitika.zodziuks.lt/js/plausible.js";
    plausible.dataset.domain = "zodziuks.lt";
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(plausible);
}

export default { initPlausible }