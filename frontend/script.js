// ScorePredict frontend behaviour.
// The API URL is local for development. Change it to your deployed API URL before publishing.
const API_URL = "https://scorepredict-api.onrender.com/predict";

const form = document.getElementById("prediction-form");
const predictButton = document.getElementById("predict-button");
const formStatus = document.getElementById("form-status");
const resultCard = document.getElementById("result-card");
const scoreElement = document.getElementById("predicted-score");
const messageElement = document.getElementById("result-message");
const tryAgainButton = document.getElementById("try-again");

// Match the score to a short message. The score is rounded only for display.
function getScoreMessage(score) {
  if (score >= 90) {
    return "Outstanding! Your predicted performance is excellent. Keep up the great work!";
  }
  if (score >= 75) {
    return "Great work! Your predicted performance is strong. Keep building on your habits.";
  }
  if (score >= 60) {
    return "Good effort! You have a solid starting point, with room to improve further.";
  }
  if (score >= 40) {
    return "Keep going! Consistent preparation and small improvements can make a difference.";
  }
  return "Don't lose hope. Treat this as a starting point and focus on building steady study habits.";
}

function setStatus(message, isSuccess = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("success", isSuccess);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Browser validation checks required fields and the min/max values first.
  if (!form.reportValidity()) {
    return;
  }

  // FormData reads the values using each field's name attribute.
  const formData = new FormData(form);

  // Convert numeric inputs from strings into JavaScript numbers.
  const requestData = {
    age: Number(formData.get("age")),
    course: formData.get("course"),
    study_hours: Number(formData.get("study_hours")),
    class_attendance: Number(formData.get("class_attendance")),
    sleep_hours: Number(formData.get("sleep_hours")),
    sleep_quality: formData.get("sleep_quality"),
    study_method: formData.get("study_method"),
    facility_rating: formData.get("facility_rating"),
    exam_difficulty: formData.get("exam_difficulty")
  };

  predictButton.disabled = true;
  predictButton.querySelector(".button-label").textContent = "Predicting...";
  setStatus("Connecting to the prediction service...");
  resultCard.hidden = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    // Read the response body, including error details returned by FastAPI.
    const responseData = await response.json();

    if (!response.ok) {
      const detail = responseData.detail;
      const errorMessage = Array.isArray(detail)
        ? detail.map((item) => item.msg).join(", ")
        : (detail || "The server could not process your request.");
      throw new Error(errorMessage);
    }

    const score = Number(responseData.predicted_score);

    if (!Number.isFinite(score)) {
      throw new Error("The API response did not contain a valid predicted_score.");
    }

    // Keep the displayed result within the expected 0–100 score scale.
    const displayScore = Math.min(100, Math.max(0, score));
    scoreElement.textContent = displayScore.toFixed(1);
    messageElement.textContent = getScoreMessage(displayScore);

    resultCard.hidden = false;
    setStatus("Your prediction is ready.", true);
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    console.error("Prediction request failed:", error);

    if (error instanceof TypeError) {
      setStatus("Could not connect to the API. Make sure your FastAPI server is running and CORS is configured.");
    } else {
      setStatus(error.message || "Something went wrong. Please try again.");
    }
  } finally {
    predictButton.disabled = false;
    predictButton.querySelector(".button-label").textContent = "Predict my score";
  }
});

tryAgainButton.addEventListener("click", () => {
  resultCard.hidden = true;
  document.getElementById("predictor").scrollIntoView({ behavior: "smooth" });
});

// Set the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();
