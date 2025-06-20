import pydantic as _pydantic

class _UserBase(_pydantic.BaseModel):
    email: str

class UserCreate(_UserBase):
    password: str

    class Config:
        from_attributes = True

class User(_UserBase):
    id: int

    class Config:
        from_attributes = True