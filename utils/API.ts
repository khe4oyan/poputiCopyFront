class API {
  static #SERVER_PATH = "http://localhost:3000";

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
    })
    .then(r => r.json())
  }

  // USER 
  static async userUpdatePersonalInfo() {
    // `${API.#SERVER_PATH}//user/personalInformation`;
  }
  static async userGetById(id: number) {
    // `${API.#SERVER_PATH}/user/${id}`;
  }
  static async userUpdateProfilePhoto() {
    // `${API.#SERVER_PATH}/updateProfilePhoto`;
  }

  // FILE
  static async fileGetById(id: number) {
    // `${API.#SERVER_PATH}file/${id}`;
  }
  static async fileDeleteById(id: number) {
    // `${API.#SERVER_PATH}/file/${id}`;
  }

  // CAR
  static async carGetById(id: number) {
    // `${API.#SERVER_PATH}/car/${id}`;
  }
  static async carDeleteById(id: number) {
    // `${API.#SERVER_PATH}/car/${id}`;
  }
  static async carCreate() {
    // `${API.#SERVER_PATH}/car`;
  }

  // JOURNEY
  static async journeyCreate() {
    // `${API.#SERVER_PATH}/journey`;
  }
  static async journeyGetAll() {
    // `${API.#SERVER_PATH}/journey`;
  }
  static async journeyGetById(id: number) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static async journeyDeleteById(id: number) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static async journeyJoinById(id: number) {
    // `${API.#SERVER_PATH}/journey/joinJourney/${id}`;
  }
};

export default API;