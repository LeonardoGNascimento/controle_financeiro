import * as moment from 'moment';

export class Data {
  static getDate(data?: string) {
    let dataAtual: string | Date = new Date();

    if (data) {
      dataAtual = data;
    }

    return moment(dataAtual).format('Y-MM-D H:m:s');
  }

  static getDateBr(data?: string | Date) {
    let dataAtual: string | Date = new Date();

    if (data) {
      dataAtual = data;
    }

    return moment(dataAtual).format('DD/MM/YYYY HH:mm:s');
  }
}
