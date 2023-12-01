
import { Planet } from "./Planet";

const celestialBodies: CelestialBody[] = [];
const feedbackDiv = document.getElementById('feedback') as HTMLDivElement;
const summary = document.getElementById('summary') as HTMLDivElement;
const regex = /^[a-zA-Z ]{2,}$/;

document.getElementById('planetForm')!.addEventListener('submit', (e)=> {
  e.preventDefault();

    const nameInput = (document.getElementById('name') as HTMLInputElement).value;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const sizeInput = document.getElementById('size') as HTMLInputElement;
    const waterContentInput = document.getElementById('waterContent') as HTMLInputElement;
  
    try {
      const newPlanet = new Planet(
        nameInput,
          parseFloat(ageInput.value),
          parseFloat(sizeInput.value),
          parseFloat(waterContentInput.value)
      );

      celestialBodies.push(newPlanet);
      
      clearForm();

      showFeedback("Sikeres adatfelvétel", false);
      updateSummary()

  } catch (error) {
    // Külön hibaüzenet minden elemre
    const errors: string[] = [];

    if (!regex.test(nameInput)) {
        errors.push("Érvénytelen név. A név legalább két karakterből kell álljon, és csak angol ABC és szóköz karaktereket tartalmazhat.");
    }

    if (isNaN(parseFloat(ageInput.value)) || parseFloat(ageInput.value) <= 0) {
        errors.push("Érvénytelen életkor. Az életkor pozitív szám kell legyen.");
    }

    if (isNaN(parseFloat(sizeInput.value)) || parseFloat(sizeInput.value) < 1500) {
        errors.push("Érvénytelen méret. A méret legalább 1500 km kell legyen.");
    }

    if (isNaN(parseFloat(waterContentInput.value)) || parseFloat(waterContentInput.value) < 0 || parseFloat(waterContentInput.value) > 100) {
        errors.push("Érvénytelen víztartalom. A víztartalomnak 0 és 100 közötti értéknek kell lennie.");
    }
    showFeedback("Hibás adatok:\n" + errors.join("\n"), true);
   
}

  console.log(celestialBodies);
});

function clearForm() {
  const form = document.getElementById('planetForm') as HTMLFormElement;
  form.reset();
}

function showFeedback(message: string, isError: boolean) {
  feedbackDiv.innerText = message;

  if (isError) {
      feedbackDiv.classList.add('error');
  } else {
      feedbackDiv.classList.remove('error');
  }
}

function updateSummary() {
  const totalPlanets = celestialBodies.length;
  const averageAge = celestialBodies.reduce((sum, planet) => sum + planet.age, 0) / totalPlanets || 0;

  summary.innerHTML = `
      <p>Total Planets: ${totalPlanets}</p>
      <p>Average Age: ${averageAge} years</p>
  `;
}