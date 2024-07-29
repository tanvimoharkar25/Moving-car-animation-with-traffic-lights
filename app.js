let car = document.getElementById("car");
let backWheel = document.querySelector(".back-wheel");
let frontWheel = document.querySelector(".front-wheel");
let trafficLight = document.querySelector(".traffic-light");
let lights = trafficLight.querySelectorAll(".light");

let carSpeed = 2.5; // car moving speed
let moving = true;

const lightDurations = [3000, 1000, 5000]; // red, yellow, green durations in milliseconds
let currentLight = 2; // Start with green light

// to move the car
function moveCar() {
  if (moving) {
    let carLeft = parseInt(window.getComputedStyle(car).left, 10);
    car.style.left = carLeft + carSpeed + "px";
    if (carLeft > window.innerWidth) {
      car.style.left = "-100px"; // Reset car position to the left side of the screen
    }
  }
  requestAnimationFrame(moveCar);
}

function pauseWheelRotation() {
  backWheel.style.animationPlayState = "paused";
  frontWheel.style.animationPlayState = "paused";
}

function resumeWheelRotation() {
  backWheel.style.animationPlayState = "running";
  frontWheel.style.animationPlayState = "running";
}

function changeLight() {
  lights[currentLight].classList.remove("active");
  currentLight = (currentLight + 1) % lights.length;
  lights[currentLight].classList.add("active");

  if (lights[currentLight].classList.contains("red")) {
    moving = false;
    pauseWheelRotation();
  } else if (lights[currentLight].classList.contains("green")) {
    moving = true;
    resumeWheelRotation();
  }

  setTimeout(changeLight, lightDurations[currentLight]);
}

// Initialize the traffic light to green
lights[currentLight].classList.add("active");

// Start the traffic light cycle
setTimeout(changeLight, lightDurations[currentLight]);

// Start moving the car
requestAnimationFrame(moveCar);
