document.getElementById("form-tigr-contact").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch("/wp-json/tigr/v1/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.querySelector(".form-message");
        if (data.message) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = "green";
            e.target.reset(); // Clear form on success
        } else if (data.code) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = "red";
        }
    })
    .catch(error => {
        const messageDiv = document.querySelector(".form-message");
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    });
}); 