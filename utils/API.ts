class API {
  static #SERVER_PATH = "http://localhost:3000";

  // AUTH
  static authLogin() {
    // `${API.#SERVER_PATH}/auth/login`;
  }
  static authRegister() {
    // `${API.#SERVER_PATH}/auth/register`;
  }

  // USER 
  static userUpdatePersonalInfo() {
    // `${API.#SERVER_PATH}//user/personalInformation`;
  }
  static userGetById(id: number) {
    // `${API.#SERVER_PATH}/user/${id}`;
  }
  static userUpdateProfilePhoto() {
    // `${API.#SERVER_PATH}/updateProfilePhoto`;
  }

  // FILE
  static fileGetById(id: number) {
    // `${API.#SERVER_PATH}file/${id}`;
  }
  static fileDeleteById(id: number) {
    // `${API.#SERVER_PATH}/file/${id}`;
  }

  // CAR
  static carGetById(id: number) {
    // `${API.#SERVER_PATH}/car/${id}`;
  }
  static carDeleteById(id: number) {
    // `${API.#SERVER_PATH}/car/${id}`;
  }
  static carCreate() {
    // `${API.#SERVER_PATH}/car`;
  }

  // JOURNEY
  static journeyCreate() {
    // `${API.#SERVER_PATH}/journey`;
  }
  static journeyGetAll() {
    // `${API.#SERVER_PATH}/journey`;
  }
  static journeyGetById(id: number) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static journeyDeleteById(id: number) {
    // `${API.#SERVER_PATH}/journey/${id}`;
  }
  static journeyJoinById(id: number) {
    // `${API.#SERVER_PATH}/journey/joinJourney/${id}`;
  }
};

export default API;