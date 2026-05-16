from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Carbon Next.js FastAPI Template", description="API for the template")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    token: str
    user: dict

class DashboardDataItem(BaseModel):
    id: str
    name: str
    status: str
    metric: int

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Backend"}

@app.post("/api/auth/login", response_model=UserResponse)
def login(user: UserLogin):
    # Mock authentication
    if user.username == "admin" and user.password == "password":
        return {
            "token": "mock-jwt-token-12345",
            "user": {"username": "admin", "role": "administrator"}
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/dashboard/data", response_model=List[DashboardDataItem])
def get_dashboard_data():
    # Mock dashboard data
    return [
        {"id": "1", "name": "Project Alpha", "status": "Active", "metric": 85},
        {"id": "2", "name": "Project Beta", "status": "Pending", "metric": 42},
        {"id": "3", "name": "Project Gamma", "status": "Completed", "metric": 100},
        {"id": "4", "name": "Project Delta", "status": "Failed", "metric": 12},
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
