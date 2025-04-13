from rest_framework.response import Response

#Model dung cho cho toan bo api
class ApiResponse:
     def __init__(self, data=None, errors=None, message=None, status=200):
          self.data = data
          self.errors = errors
          self.message = message
          self.status = status
          
     @classmethod
     def build(cls, data=None, errors=None, message=None, status=200):
          return Response(cls(data=data, errors=errors, message=message, status=status).to_dict(), status=200)
     
     def to_dict(self):
          return {
               'data': self.data,
               'errors': self.errors,
               'message': self.message,
               'status': self.status
          }