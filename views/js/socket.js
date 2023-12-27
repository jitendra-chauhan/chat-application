const myId = localStorage.getItem("myId");
const token = localStorage.getItem("token");

const socket = io("http://localhost:3001", { query: { token } });

let openchatId = "";
if (!myId) {
  window.location.replace("http://localhost:3001");
}

socket.on("connect", () => {
  socket.emit("req", {
    en: "USER_LIST",
    data: { myId },
  });
  socket.on("res", (data) => {
    console.log("====client data====", data);
    const res = data.data.en;
    const resData = data.data.data;

    switch (res) {
      // get one msg
      case "USER_CHAT": {
        if (resData.data.from === myId) {
          const myMsg =
            "<div class='message parker'>" + resData.data.msg + "</div>";
          $("#chat").append(myMsg);
        } else {
          const frdMsg =
            "<div class='message stark'>" + resData.data.msg + "</div>";
          $("#chat").append(frdMsg);
        }
        break;
      }
      // get all Old msg
      case "GET_CHAT": {
        resData.data.forEach((element) => {
          if (element.from === myId) {
            const myMsg =
              "<div class='message parker'>" + element.msg + "</div>";
            $("#chat").append(myMsg);
          } else {
            const frdMsg =
              "<div class='message stark'>" + element.msg + "</div>";
            $("#chat").append(frdMsg);
          }
        });

        break;
      }
      // get all user data
      case "USER_LIST": {
        $(".contacts").html("");
        const first = "<i class='fas fa-bars fa-2x'></i><h2>Contacts</h2>";
        $(".contacts").append(first);
        resData.data.forEach((element) => {
          let userData =
            "<div class='contact' id=" +
            element._id +
            "> <div class='pic rogers'></div> <div class='badge active'>  </div> <div class='name'>" +
            element.username +
            "</div><div class='hide'>" +
            element._id +
            "</div> </div>";
          if (!element.isOnline)
            userData =
              "<div class='contact' id=" +
              element._id +
              "> <div class='pic rogers'></div> <div class='badge deactive'>  </div> <div class='name'>" +
              element.username +
              "</div><div class='hide'>" +
              element._id +
              "</div> </div>";

          if (element._id !== myId) {
            $(".contacts").append(userData);
            let output = document.getElementById(element._id);
            output.addEventListener("click", () =>
              openChat(element._id, element.username)
            );
          }
        });
        break;
      }
    }
  });
});
socket.on("disconnect", (connect) => {
  window.location.replace("http://localhost:3001");
});

function openChat(userId, name) {
  console.log("calll :: ", userId, name);
  openchatId = userId;
  $("#chat").html("");
  $("#userNameid").html(name);
  document.getElementById("textMessage").value = "";
  socket.emit("req", { en: "GET_CHAT", data: { userId, myId, type: "user" } });
}

// Get the input field
const input = document.getElementById("sendMessage");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();

    const text = document.getElementById("textMessage").value;

    if (text !== "") {
      socket.emit("req", {
        en: "USER_CHAT",
        data: { from: myId, to: openchatId, msg: text },
      });
    }
    document.getElementById("textMessage").value = "";
  }
});

function logOut() {
  socket.disconnect();
  localStorage.setItem("myId", null);
  localStorage.setItem("token", null);

  window.location.replace("http://localhost:3001");
}
