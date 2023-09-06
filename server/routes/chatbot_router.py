from fastapi import APIRouter, Depends, Request
import requests
# import openai
# from schema.chatbot_schema import ChatbotMessage

router = APIRouter()

flask_ngrok_url = "http://c2cd-34-32-225-166.ngrok-free.app" // example

@router.post("/chatbot")
async def test_route3(request: Request):
    data = await request.json()
    response = requests.post(flask_ngrok_url + "/chatbot", json=data)
    text = response.json()
    return text
