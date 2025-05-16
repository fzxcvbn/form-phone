const deleteBtn = document.getElementById("delete-btn");

const popup = document.getElementById("popup");

const waitCallBtn = document.getElementById("wait-call-btn");

const overlay = document.getElementById("overlay");

const time = document.getElementById("datetime");

const btnDatetime = document.getElementById("btn-datetime");

const btnNoDatetime = document.getElementById("btn-no-datetime");

btnDatetime.addEventListener("click", () => {
  time.style.display = "block";
});

btnNoDatetime.addEventListener("click", () => {
  time.style.display = "none";
});

deleteBtn.addEventListener("click", () => {
    popup.style.display = "block";
    overlay.classList.add("show");
});

document.getElementById('phoneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = this.phone.value;
    if (time.value) {
      const valueTime = time.value;
    } else {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const valueTime = (`Текущее время: ${hours}:${minutes}:${seconds}`)
    }
    
    const bitrixData = {
      domain: '21vcrm.bitrix24.ru',
      userId: '180',
      webhook: '2rdmzc4n8z1zpp6f',
      leadTitle: 'Оставленный с сайта номер телефона'
    };
    fetch(`https://${bitrixData.domain}/rest/${bitrixData.userId}/${bitrixData.webhook}/crm.lead.add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        fields: {
          "TITLE": "Новая заявка",
          "NAME": "Посетитель сайта",
          "PHONE": [{"VALUE": phone, "VALUE_TYPE": "WORK"}],
          "COMMENTS": "Желаемое время: " + valueTime
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('phoneForm').reset();
    });
  });
waitCallBtn.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.classList.remove("show");
});