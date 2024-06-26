document.addEventListener("DOMContentLoaded", async () => {
  let userAccessToken = localStorage.getItem("accessToken");
  let userRefreshToken = localStorage.getItem("refreshToken");
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
    } = userData;
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

  const { telegramId } = await response.json();
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
