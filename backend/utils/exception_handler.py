from utils.api_response import ApiResponse
from utils.exceptions import LogicException, NotFoundException, ValidationException
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.exceptions import NotAuthenticated

def custom_exception_handler(exc, context):
    if isinstance(exc, NotFoundException):
         return ApiResponse.build(message=str(exc), status=404)
    
    if isinstance(exc, LogicException):
         return ApiResponse.build(message=str(exc), status=400)
    
    if isinstance(exc, (AuthenticationFailed, NotAuthenticated)):
         return ApiResponse.build(message="Unauthorized", status=401)
    
    if isinstance(exc, ValidationException):
         return ApiResponse.build(message=str(exc), status=402)
    
    
    
    return ApiResponse.build(message="Internal server error", status=500, errors=str(exc))