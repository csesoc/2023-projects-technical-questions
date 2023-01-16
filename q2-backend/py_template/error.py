from werkzeug.exceptions import HTTPException

class InvalidType(HTTPException):
    code = 400
    message = 'Invalid space entity type'

class InvalidName(HTTPException):
    code  = 400
    message = 'No cowboy has that name'