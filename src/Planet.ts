export class Planet implements CelestialBody {
    constructor(
        public name: string, 
        public age: number,
        public size: number,
        public waterContent: number) {
            if (!this.isValidName(name) || age <= 0 || size < 1500 || waterContent < 0 || waterContent > 100) {
                throw new Error("Invalid planet parameters");
            }
        }
    
        public isValidName(name: string): boolean {
            const regex = /^[a-zA-Z ]{2,}$/;
            return regex.test(name);
        }
    
}

   