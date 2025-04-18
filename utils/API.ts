class API {
  static #SERVER_PATH = "http://192.168.0.102:3000";

  // AUTH
  static async authLogin(email: string, password: string) {
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
  static async authRegister(email: string, password: string, role: string) {
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
    token: string,
    phoneNum: string,
    name: string,
    surname: string,
    birthDay: string,
    residence: string,
    gender: string,
    role: string,
    driveLicenseUri: string,
    pasportImageUri: string,
  ) {
    const formData = new FormData();

    formData.append("phoneNumber", phoneNum);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("birthDay", birthDay);
    formData.append("city", residence);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("driversLicense", "(none)");
    formData.append("pasportData", "(none)");

    const getBlob = async (uri: string, name: string) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return {
        uri,
        name,
        type: blob.type || "image/jpeg",
      };
    };

    const driveLicenseFile = await getBlob(driveLicenseUri, "driveLicense.jpg");
    const pasportImageFile = await getBlob(pasportImageUri, "pasportImage.jpg");

    formData.append("driversLicenseImage", {
      uri: driveLicenseFile.uri,
      name: driveLicenseFile.name,
      type: driveLicenseFile.type,
    } as any);

    formData.append("pasportImage", {
      uri: pasportImageFile.uri,
      name: pasportImageFile.name,
      type: pasportImageFile.type,
    } as any);

    return fetch(`${API.#SERVER_PATH}/user/personalInformation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((r) => r.json());
  }
  static async userGetById(token: string, id: string) {
    return fetch(`${API.#SERVER_PATH}/user/${id}`, {
      method: "GET",
      headers: {
        'content-type': "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(r => {
      // console.log("Response status:", r.status, r.statusText);
      return r.json();
    });
  }
  static async userUpdateProfilePhoto(token: string, photo: string) {
    const formData = new FormData();

    const getBlob = async (uri: string, name: string) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return {
        uri,
        name,
        type: blob.type || "image/jpeg",
      };
    };

    const profilePhoto = await getBlob(photo, "driveLicense.jpg");

    formData.append("profilePhoto", {
      uri: profilePhoto.uri,
      name: profilePhoto.name,
      type: profilePhoto.type,
    } as any);

    return fetch(`${API.#SERVER_PATH}/user/udateProfilePhoto`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((r) => {
      // console.log("Response status:", r.status);
      return r.json()
    });
  }

  // FILE
  static fileGetById(id: string) {
    return `${API.#SERVER_PATH}/file/${id}?timestamp=${new Date().getTime()}`
  }
  static async fileDeleteById(id: string) {
    // `${API.#SERVER_PATH}/file/${id}`;
  }

  // CAR
  static async getCarsByUserId(token: string, id: string) {
    return fetch(`${API.#SERVER_PATH}/car/carByUserId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      // console.log("Response status:", r.status, r.statusText);
      return r.json()
    });
  }
  static async carGetById(id: string) {
    // `${API.#SERVER_PATH}/car/${id}`;
  }
  static async carDeleteById(token: string, id: string) {
    return fetch(`${API.#SERVER_PATH}/car/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      // console.log("Response status:", r.status, r.statusText);
      return r.json()
    });
  }
  static async carCreate(token: string, make: string, model: string, year: string) {
    return fetch(`${API.#SERVER_PATH}/car`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        make, model, year
      }),
    }).then((r) => {
      // console.log("Response status:", r.status);
      return r.json()
    });
  }

  // JOURNEY
  static async journeyCreate(token: string, data: any) {
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
      // console.log("Response status:", r.status, "Text:", r.statusText);
      return r.json();
    });
  }
  static async journeyGetAll(token: string) {
    return fetch(`${API.#SERVER_PATH}/journey`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      console.log("Response status:", r.status);
      return r.json();
    });
  }
  static async journeyGetById(id: string) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static async journeyDeleteById(token:string, id: string) {
    return fetch(`${API.#SERVER_PATH}/journey/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then((r) => {
      console.log("Response status:", r.status);
      return r.json();
    });
  }
  static async journeyJoinById(id: string) {
    // `${API.#SERVER_PATH}/journey/joinJourney/${id}`;
  }
};

export default API;