export function getLocalStore(item: string) {
  return localStorage.getItem(item);
}

export class Usuario {
  static getNome() {
    return getLocalStore("@nome");
  }

  static getId() {
    return getLocalStore("@id");
  }

  static setId(data: string) {
    localStorage.setItem("@id", data);
  }

  static setToken(data: string) {
    localStorage.setItem("@token", data);
  }

  static setEmail(data: string) {
    localStorage.setItem("@email", data);
  }

  static setNome(data: string) {
    localStorage.setItem("@email", data);
  }
}
