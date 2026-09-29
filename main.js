import Numworks from "upsilon.js";

var calculator = new Numworks();

const originalLog = console.log;

function log_function(...args){
    originalLog.apply(console, args);

    const message = args.map(arg => {
        try {
            return typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg);
        } catch {
            return String(arg);
        }
    }).join(" ");

    const consoleDiv = document.getElementById("console");
    if (consoleDiv) {
        const line = document.createElement("div");
        line.textContent = message;
        consoleDiv.appendChild(line);
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    }
}

async function calculator_connected(){
    console.log("Connected");
    let pinfo = await calculator.getPlatformInfo();
    document.getElementById("version").innerHTML = pinfo.version
    document.getElementById("ext_start").innerHTML = "0x"+pinfo.external.flashStart.toString(16).toUpperCase();
    document.getElementById("ext_end").innerHTML = "0x"+pinfo.external.flashEnd.toString(16).toUpperCase();
    console.log(pinfo);
}

console.log = log_function;

document.getElementById("connect").addEventListener("click", function(){
    calculator.detect(async function() {
            await calculator_connected();
        }, function(error) {
            alert("Error : " + error);
        });
})

navigator.usb.addEventListener("disconnect", function(e) {
  calculator.onUnexpectedDisconnect(e, function() {
  });
});