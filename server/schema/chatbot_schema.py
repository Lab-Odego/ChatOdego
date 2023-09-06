 from typing import Optional
 from pydantic import BaseModel

 class ChatbotMessage(BaseModel):
     name: Optional[str] = None  # optional value
     chatbot_answer: str         # required value

     class Config:
         orm_mode = True
