
import os
import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.logger import logger
from pydantic_settings import BaseSettings
from pyngrok import ngrok
from routes import chatbot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Settings(BaseSettings):
    BASE_URL: str = "http://127.0.0.1:8000"
    USE_NGROK: bool = os.environ.get("USE_NGROK", "False") == "True"


settings = Settings()

def init_webhooks(base_url):
    pass

if settings.USE_NGROK:
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else 8000
    public_url = ngrok.connect(port, options={"region": "io"}).public_url
    logger.info("ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))
    settings.BASE_URL = public_url
    init_webhooks(public_url)

# Include a router in an app object
app.include_router(chatbot_router.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
