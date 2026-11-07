# Student Exam Score Predictor

An end-to-end Machine Learning application that predicts student exam performance based on academic and lifestyle-related factors.

The project covers the complete ML workflow, from data preprocessing and model experimentation to building a REST API and integrating it with a web-based frontend.

<p align="center">
  <a href="https://student-exam-score-predictor-fronte.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-Try_ScorePredict-2563EB?style=for-the-badge" />
  </a>
  <a href="https://github.com/Saumik-Yadav/student-exam-score-predictor">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

## Overview

Student Exam Score Predictor estimates a student's expected exam score using information about their academic routine and lifestyle.

The application takes nine input features, processes them through a trained Machine Learning pipeline, and returns a predicted score through a web interface.

### Input Features

| Feature | Description |
|---|---|
| Age | Student's age |
| Course | Academic course |
| Study Hours | Daily study hours |
| Class Attendance | Attendance percentage |
| Sleep Hours | Daily sleeping hours |
| Sleep Quality | Poor, average or good |
| Study Method | Preferred learning method |
| Facility Rating | Available study facilities |
| Exam Difficulty | Perceived exam difficulty |

---

## Tech Stack

| Category | Technologies |
|---|---|
| Language | Python |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib |
| Machine Learning | Scikit-learn, XGBoost |
| Model Optimization | GridSearchCV |
| Backend | FastAPI |
| Data Validation | Pydantic |
| Frontend | HTML, CSS, JavaScript |
| Model Persistence | Joblib |
| Deployment | Vercel, Render |
| Tools | Jupyter Notebook, VS Code, Git, GitHub |

---

## Dataset

The project uses a dataset containing **16,000 student records**.

- Total records: 16,000
- Missing values: None
- Target variable: Exam Score
- Identifier removed during preprocessing: `student_id`

The dataset contains numerical and categorical features related to students' academic routines and lifestyle.

---

## Machine Learning Workflow

### 1. Data Preprocessing

- Explored the dataset and examined its structure.
- Checked for missing values and unnecessary features.
- Removed the `student_id` column.
- Separated numerical and categorical features.

### 2. Feature Encoding & Transformation

Implemented preprocessing using Scikit-learn's `ColumnTransformer`.

**Numerical Features**
- StandardScaler

**Ordinal Categorical Features**
- OrdinalEncoder

**Nominal Categorical Features**
- OneHotEncoder with `drop='first'`

The preprocessing transformations were integrated into Machine Learning pipelines.

### 3. Model Training & Experimentation

Experimented with three regression algorithms:

- Linear Regression
- Random Forest Regressor
- XGBoost Regressor

Hyperparameter tuning was performed for XGBoost using GridSearchCV with 5-fold cross-validation.

### 4. Model Evaluation

The models were evaluated using:

- R² Score
- Mean Absolute Error (MAE)
- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)

---

## Model Performance

The following results were obtained on the test dataset.

| Model | R² Score | MAE | RMSE |
|---|---:|---:|---:|
| Linear Regression | **0.7331** | **7.8620** | **9.7707** |
| Tuned XGBoost | 0.7303 | 7.9051 | 9.8215 |
| Random Forest | 0.6895 | 8.5059 | 10.5380 |

### XGBoost Hyperparameter Tuning

GridSearchCV evaluated 324 parameter combinations using 5-fold cross-validation.

**Best Parameters:**

| Parameter | Value |
|---|---:|
| colsample_bytree | 0.8 |
| learning_rate | 0.1 |
| max_depth | 2 |
| min_child_weight | 3 |
| n_estimators | 300 |
| subsample | 0.8 |

- Best cross-validation R²: 0.72766
- Test R²: 0.73033

### Final Model Selection

Linear Regression was selected as the final model because it achieved slightly better test performance than tuned XGBoost while maintaining a simpler model architecture.

The complete preprocessing and prediction pipeline was saved using Joblib.

---

## Application Architecture

The application consists of three main components:

**1. Frontend — Vercel**

- Collects student information through an interactive form.
- Sends input data to the backend as JSON.
- Displays the predicted exam score.
- Handles loading states and API errors.

**2. Backend — FastAPI**

- Receives prediction requests.
- Validates input using Pydantic.
- Converts the input into a Pandas DataFrame.
- Passes the data through the saved ML pipeline.
- Returns the prediction as a JSON response.

**3. Machine Learning Model**

- Saved using Joblib.
- Includes preprocessing transformations and the trained regression model.
- Loaded by the FastAPI application for inference.

### Prediction Flow

```text
User Input
    |
    v
Frontend (HTML/CSS/JavaScript)
    |
    v
FastAPI REST API
    |
    v
Pydantic Input Validation
    |
    v
Saved ML Pipeline
    |
    v
Predicted Exam Score
    |
    v
JSON Response
    |
    v
Frontend Result Display
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Checks API availability |
| POST | `/predict` | Generates an exam score prediction |

### Example Request

```json
{
    "age": 20,
    "course": "b.tech",
    "study_hours": 5.0,
    "class_attendance": 85.0,
    "sleep_hours": 7.0,
    "sleep_quality": "good",
    "study_method": "self-study",
    "facility_rating": "high",
    "exam_difficulty": "moderate"
}
```

### Example Response

```json
{
    "predicted_score": 76.03
}
```

*The response above is an illustrative example.*

---

## Project Structure

```text
student-exam-score-predictor/
│
├── Backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── about.html
│
├── Exam_Score_Prediction.csv
├── Student_Score_prediction.ipynb
├── student_exam_score_model.pkl
├── requirements.txt
├── .gitignore
└── README.md
```

---

## Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Saumik-Yadav/student-exam-score-predictor.git
```

### 2. Navigate to the Project

```bash
cd student-exam-score-predictor
```

### 3. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate it:

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the Backend

Run from the project root directory:

```bash
uvicorn Backend.main:app --reload
```

### 6. Access API Documentation

Open the following address in your browser:

```text
http://127.0.0.1:8000/docs
```

### 7. Run the Frontend

Open `frontend/index.html` using VS Code Live Server.

The frontend will communicate with the deployed backend API by default. For local backend testing, update the API URL in `frontend/script.js` to:

```javascript
const API_URL = "http://127.0.0.1:8000/predict";
```

---

## Future Improvements

- Experiment with additional regression algorithms.
- Explore further feature engineering techniques.
- Improve model performance through experimentation.
- Enhance the frontend experience.
- Explore additional deployment and monitoring options.

---

## Key Learnings

- Data preprocessing and exploratory data analysis.
- Building end-to-end Scikit-learn pipelines.
- Handling numerical, ordinal and nominal features.
- Regression model training and evaluation.
- Hyperparameter tuning using GridSearchCV.
- Saving and loading ML pipelines using Joblib.
- Developing REST APIs using FastAPI.
- Input validation using Pydantic.
- Connecting a frontend application with an ML backend.
- Deploying an end-to-end Machine Learning application.

---

<p align="center">
  <b>Built with Python, Machine Learning and FastAPI.</b>
  <br><br>
  <i>Learning by building practical applications.</i>
</p>