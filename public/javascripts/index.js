const submitBtn = document.querySelector('#submitBtn');

const url = document.querySelector("#urlTxt");
const css = document.querySelector("#cssText");
const width = document.querySelector("#widthTxt");
const height = document.querySelector("#heightTxt");
const nonHttp2XX = document.querySelector("#allowNon200Check");

const cssLength = document.querySelector("#cssTextLength");
const resultText = document.querySelector('#resultText');
const resultLength = document.querySelector('#resultLength');
const loader = document.querySelector('.sk-chase');

css.addEventListener('change', () => {
    cssLength.textContent = css.value.length + ' caracteres';
});

submitBtn.addEventListener("click", () => {
    submitBtn.setAttribute('disabled', 'disabled');
    loader.style.display = 'block';

    const options = {
        url: url.value,
        css: btoa(unescape(encodeURIComponent(css.value))),
        width: width.value ? width.value : undefined,
        height: height.value ? height.value : undefined,
        expectHttpOk: nonHttp2XX.checked ? false : undefined
    }

    fetch('/critical', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    })
        .then(result => result.json())
        .then(result => {

            if (result.hasOwnProperty('code')) {
                const code = atob(result.code);
                resultText.value = code;
                resultLength.textContent = code.length + ' caracteres';
            } else {
                resultText.value = result.error;
            }
        })
        .catch(err => {
            console.log(err);
            resultText.value = err.message;
        })
        .finally(() => {
            submitBtn.removeAttribute('disabled');
            loader.style.display = 'none';
        })

});