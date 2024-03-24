import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");


function submitForm(evt){
    
}

// Create promise



form.addEventListener("submit", evt => {
    evt.preventDefault();
    const currentDelayMs = parseInt(document.querySelector("input[name=delay]").value, 10);
    const isFulfilled = document.querySelector("input[value=fulfilled]").checked;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isFulfilled) {
            resolve(currentDelayMs);
          } else {
            reject(currentDelayMs);
          }
        }, currentDelayMs);
      });
      
      // Registering promise callbacks
      promise
        .then(value => {
            iziToast.success({
                title: "OK",
                message: `Fulfilled promise in ${value}`,
                position: "topRight",
            });
        }) // "Success! Value passed to resolve function"
        .catch(error => {
            iziToast.error({
                title: "Error",
                message: `Rejected promise in ${error}`,
                position: "topRight",
            });
        })
});

