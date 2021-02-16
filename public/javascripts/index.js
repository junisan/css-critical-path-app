const submitBtn = document.querySelector('#submitBtn');
const url = document.querySelector("#urlTxt");
const css = document.querySelector("#cssText");
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
    fetch('/critical', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url.value,
            css: btoa(unescape(encodeURIComponent(css.value)))
        })
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