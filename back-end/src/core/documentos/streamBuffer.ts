import { Readable } from 'stream';

export class StreamBuffer extends Readable {
  constructor(buffer: Buffer) {
    super();

    this.push(buffer);
    this.push(null);
  }
}
