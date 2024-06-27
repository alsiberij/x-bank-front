document.addEventListener("DOMContentLoaded", async () => {
  let userAccessToken = localStorage.getItem("accessToken");
  let userRefreshToken = localStorage.getItem("refreshToken");
  userAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWU0ZmU1NS0wYzQ4LTQyZjAtYmExNy02Y2EwZDAzYmUwZjEiLCJpYXQiOjE3MTk0NzI5ODQsImV4cCI6MTcxOTQ3MzI4NCwic3ViIjozLCIyZmEiOmZhbHNlLCJpZGYiOnRydWV9.RG9YmmYSkdK6-hJB0_fMXwCOY9kyVJwxaNVU44EDYt1E_HVZOWgXX3mpH-rF91HhwCTrQDzI0E0kYbiILEgj8fU06agXyBcgyl9fXD-nUNzGXSNjNj6ILlXkKSTII68g10ZsVyTNwHkfnQb2puvbYdHYq2H7YWmo-qBwsWYbPsyKGVbkim_sVBgOcqi7AWR4bBITDIXYxMxl4caZNa4JdjgwUv-DQxo45TGzfSGvk_f5PsP-QvY8lzMhJuYoZf36o-Ks35SY1KmpWjSXx7S93IJt274Wc9unf7oYcIZCJpdV_KmJSmu5V2OKb00bVsiClDCcyIeKagRZV1QHzrpQWg"
  if (!userAccessToken || !userRefreshToken) {
    throw new Error("Ошибка авторизации");
  }

  let response = await getUserPersonalData(userAccessToken);
  if (!response.ok) {
    let refreshResponse = await fetchRefresh(userRefreshToken);
    if (!refreshResponse) {
      window.location.href = "/";
    }
    const { accessToken, refreshToken } = await refreshResponse.json();
    userAccessToken = accessToken;
    userRefreshToken = refreshToken;
    localStorage.setItem("accessToken", userAccessToken);
    localStorage.setItem("refreshToken", userRefreshToken);
    response = await getUserPersonalData(userAccessToken);
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
      "Authorization": "Bearer " + userAccessToken,
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
  } else {
    document.getElementById("deleteTg").hidden = true;
    document.getElementById("tg-id").hidden = true;
    document.getElementById("bindTg").hidden = false;
  }
});

document.getElementById("deleteTg").addEventListener("click", async () => {
  let accessToken = localStorage.getItem("accessToken");
  const response = await fetch("https://x-bank.alsiberij.com/ms-users/v1/telegram", {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка при попытке отвязать телеграм");
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
