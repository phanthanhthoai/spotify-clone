from rest_framework.exceptions import APIException

class NotFoundException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
class ValidationException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
class UnauthorizedException(APIException):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
        
class LogicException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)