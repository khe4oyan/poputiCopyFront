import blobUrlToURL from './blobToURL';

class API {
  static #SERVER_PATH = "http://localhost:3001";

  // AUTH
  static async authLogin(email, password) {
    return fetch(`${API.#SERVER_PATH}/auth/login`, {
      method: "POST",
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(r => r.json())
  }
  static async authRegister(email, password, role) {
    return fetch(`${API.#SERVER_PATH}/auth/register`, {
      method: "POST",
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    }).then(r => r.json())
  }

  // USER 
  static async userUpdatePersonalInfo(
    token,
    phoneNum,
    name,
    surname,
    birthDay,
    residence,
    gender,
    driveLicenseUri,
    pasportImageUri,
  ) {
    const formData = new FormData();

    formData.append("phoneNumber", phoneNum);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("birthDay", birthDay);
    formData.append("city", residence);
    formData.append("gender", gender);
    formData.append("driversLicense", "(none)");
    formData.append("pasportData", "(none)");

    const driveLicenseFile = await blobUrlToURL(driveLicenseUri, "driveLicense.jpg");
    const pasportImageFile = await blobUrlToURL(pasportImageUri, "pasportImage.jpg");

    formData.append("driversLicenseImage", driveLicenseFile);
    formData.append("pasportImage", pasportImageFile);

    return fetch(`${API.#SERVER_PATH}/user/personalInformation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((r) => r.json());
  }
  static async userGetById(token, id) {
    return fetch(`${API.#SERVER_PATH}/user/${id}`, {
      method: "GET",
      headers: {
        'content-type': "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(r => {
      return r.json();
    });
  }
  static async userUpdateProfilePhoto(token, photo) {
    const formData = new FormData();
    const photoBlobURL = await blobUrlToURL(photo, "blobUrl.png");
    formData.append("profilePhoto", photoBlobURL);

    return fetch(`${API.#SERVER_PATH}/user/udateProfilePhoto`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((r) => r.json());
  }

  // FILE
  static fileGetById(id) {
    return `${API.#SERVER_PATH}/file/${id}?timestamp=${new Date().getTime()}`
  }
  static async fileDeleteById(id) {
    // `${API.#SERVER_PATH}/file/${id}`;
  }

  // CAR
  static async getCarsByUserId(token, id) {
    return fetch(`${API.#SERVER_PATH}/car/carByUserId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json()
    });
  }
  static async carGetById(token, id) {
    return fetch(`${API.#SERVER_PATH}/car/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json()
    });
  }
  static async carDeleteById(token, id) {
    return fetch(`${API.#SERVER_PATH}/car/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json()
    });
  }

  static async carCreate(token, make, model, year, photos) {
    const formData = new FormData();

    const blobPhotos = [];

    for (let i = 0; i < photos.length; ++i) {
      const carPhoto = await blobUrlToURL(photos[i], `driveLicense_${i}.jpg`);
      blobPhotos.push(carPhoto);
    }

    blobPhotos.forEach((photo) => {
      formData.append("carImages", photo);
    });

    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);

    return fetch(`${API.#SERVER_PATH}/car`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((r) => {
      return r.json()
    });
  }

  // JOURNEY
  static async journeyCreate(token, data) {
    const bodyData = {
      from: data.place.from,
      to: data.place.to,
      date: data.date,
      count: data.price,
      car: data.car,
    };

    return fetch(`${API.#SERVER_PATH}/journey`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    }).then((r) => {
      return r.json();
    });
  }
  static async journeyGetAll(token) {
    return fetch(`${API.#SERVER_PATH}/journey`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json();
    });
  }
  static async journeyGetById(id) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static async journeyDeleteById(token, id) {
    return fetch(`${API.#SERVER_PATH}/journey/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json();
    });
  }
  static async journeyJoinById(token, id) {
    return fetch(`${API.#SERVER_PATH}/journey/joinJourney/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      return r.json();
    });
  }
};

export default API;