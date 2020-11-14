export class Turno{

    constructor(
        public id: string,
        public hora: string,
        public nombre: string,
        public precio: number,
        public fechaId: string,
        public realizado: boolean
    ){}
}