const generate = document.querySelector("#generate");
const download = document.querySelector("#download");
const card = document.querySelector(".card");
const textbox = document.querySelector(".textbox");
const qrImg = document.getElementById("qrImg");

function genQr() {
    
    if(textbox.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: "<p>Please enter a URL to generate the QR code!</p>",
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                content: 'swal-custom-content',
            }
        });

        textbox.style.border = "3px solid black";
        textbox.placeholder = "Please enter a URL here";

        return;
    }
    qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(textbox.value);
    qrImg.style.display = "block";
    card.style.height = "32rem";
    textbox.style.height= "2rem";
    textbox.style.border = ""
    
    // generate.style.marginTop = "70px";
    qrImg.style.marginTop = "50px"
    download.disabled = false;

}

function downloadQr() {
    fetch(qrImg.src)

        .then(response => response.blob())
        .then(blob => {

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QR_Code.png";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        })
        .catch(error => {
            console.error("Error downloading QR code:", error);
        });
}


generate.onclick = genQr;

textbox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        genQr();

    }
})

download.disabled = true;
// downloadButton.addEventListener("click", downloadQrCode);
download.onclick = downloadQr;

textbox.addEventListener('focus', function() {
    textbox.style.border = '';
});