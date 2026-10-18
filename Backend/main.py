from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Annotated, Literal
import joblib
import pandas as pd
from fastapi.responses import JSONResponse

model = joblib.load("student_exam_score_model.pkl")
app = FastAPI()
@app.get("/")
def home():
    return {'Message':'Student exam score Prediction API is running!'}

#pydantic 
class UserInput(BaseModel):
    age: Annotated[int,Field(...,gt=0,lt=120,description="age of the student")]
    course: Annotated[Literal['bca','ba','b.sc','b.com','bba','diploma','b.tech'],Field(...,description="course which you are pursuing")]
    study_hours: Annotated[float,Field(...,gt=0,lt=24,description="no of hours student studies in a day")]
    class_attendance: Annotated[float,Field(...,gt=0,lt=100,description="percentage of attendance in the subject")]
    sleep_hours: Annotated[float,Field(...,gt=0,lt=12,description="no of hours student sleeps in a day")]
    sleep_quality: Annotated[Literal['average','poor','good'],Field(...,description="quality of the sleep")]
    study_method: Annotated[Literal['self-study','online videos','coaching','group study','mixed'],Field(...,description="method of study")]
    facility_rating: Annotated[Literal['low','medium','high'],Field(...,description="rate the facility which you have")]
    exam_difficulty: Annotated[Literal['easy','moderate','hard'],Field(...,description="rate the difficulty of exam")]

@app.post("/predict")
def score_prediction(data: UserInput):
    input_df = pd.DataFrame([{
        'age': data.age,
        'course': data.course,
        'study_hours': data.study_hours,
        'class_attendance': data.class_attendance,
        'sleep_hours': data.sleep_hours,
        'sleep_quality': data.sleep_quality,
        'study_method': data.study_method,
        'facility_rating': data.facility_rating,
        'exam_difficulty': data.exam_difficulty
    }])
    prediction = model.predict(input_df)[0]
    return JSONResponse(status_code=200,content={'predicted_score':prediction})