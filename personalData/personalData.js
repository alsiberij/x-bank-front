if (!localStorage.getItem("accessToken") || !localStorage.getItem("refreshToken")) {
  window.location.href = '/'
}

var widgetLoaded = false

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("deleteTg").addEventListener("click", async () => {
    const response = await fetch("https://x-bank.alsiberij.com/ms-users/v1/telegram", {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при попытке отвязать телеграм");
    }
    if (widgetLoaded) {
        document.getElementById("telegram-login-xbank_lwo_bot").hidden = false
    } else {
        await loadTgWidget();
        widgetLoaded = true
    }
    document.getElementById("deleteTg").hidden = true
    document.getElementById("tg-id").hidden = true
    return false;
  });

  let response = await getUserPersonalData(localStorage.getItem("accessToken"));
  if (!response.ok) {
    let refreshResponse = await fetchRefresh(localStorage.getItem("refreshToken"));
    if (!refreshResponse.ok) {
      window.location.href = "/";
    }
    let resp = await refreshResponse.json();
    localStorage.setItem("accessToken", resp['tokens']['accessToken']);
    localStorage.setItem("refreshToken", resp['tokens']['refreshToken']);
    response = await getUserPersonalData(resp['tokens']['accessToken']);
  }


  const userData = await response.json();
  if (userData) {
    const {personalData} = userData;
    const {
      phoneNumber,
      firstName,
      lastName,
      fathersName,
      dateOfBirth,
      passportId,
      address,
      gender,
      liveInCountry,
    } = personalData;
    document.getElementById("phoneNumber").value = phoneNumber;
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("fathersName").value = fathersName;
    document.getElementById("address").value = address;
    document.getElementById("gender").value = gender;
    document.getElementById("liveInCountry").value = liveInCountry;
    document.getElementById("dateOfBirth").value = dateOfBirth;
    document.getElementById("passportId").value = passportId;
  }

  response = await fetch("https://x-bank.alsiberij.com/ms-users/v1/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  let userata = await response.json();
  console.log(userata)

  const { telegramId, login } = userata;
  if (!login) {
    throw new Error("Логин отсутствует в системе")
  }
  document.getElementById("username").innerText = login
  if (telegramId > 0) {
    document.getElementById("tg-id").value = telegramId;
      document.getElementById("deleteTg").hidden = false
      document.getElementById("tg-id").hidden = false
  } else {
      if (widgetLoaded) {
          document.getElementById("telegram-login-xbank_lwo_bot").hidden = false
      } else {
          await loadTgWidget();
          widgetLoaded = true
      }
    document.getElementById("deleteTg").hidden = true
    document.getElementById("tg-id").hidden = true
  }
});

async function getUserPersonalData(accessToken) {
  return await fetch("https://x-bank.alsiberij.com/ms-users/v1/me/personal-data", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + accessToken,
    },
  });
}

async function fetchRefresh(refreshToken) {
  return await fetch("https://x-bank.alsiberij.com/ms-users/v1/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "refreshToken": refreshToken }),
  });
}

async function fetchLinkTg(user, accessToken) {
  return await fetch("https://x-bank.alsiberij.com/ms-users/v1/telegram", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
    },
    body: JSON.stringify({
      "id": user.id,
      "firstname": user.first_name,
      "lastname": user.last_name,
      "username": user.username,
      "photoUrl": user.photo_url,
      "authDate": user.auth_date,
      "hash": user.hash
    }),
  });
}

async function onTelegramAuth(user) {
    let response = await fetchLinkTg(user, localStorage.getItem("accessToken"));
    if (!response.ok) {
        let resp = await response.json();
        alert(resp)
    }
    document.getElementById("tg-id").value = user.id;
    document.getElementById("telegram-login-xbank_lwo_bot").hidden = true
    document.getElementById("deleteTg").hidden = false
    document.getElementById("tg-id").hidden = false
}

async function loadTgWidget() {
    var script = document.createElement('script');
    script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?22")
    script.setAttribute("data-telegram-login", "xbank_lwo_bot")
    script.setAttribute("data-size", "medium")
    script.setAttribute("data-radius", "5")
    script.setAttribute("data-onauth", "onTelegramAuth(user)")
    script.setAttribute("data-request-access", "write")


    document.getElementById('tgwrap').appendChild(script);
}