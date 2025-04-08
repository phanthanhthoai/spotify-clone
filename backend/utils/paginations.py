from rest_framework.pagination import PageNumberPagination

class Pagination(PageNumberPagination):
    page_size = 1,
    page_size_query_param = 'size'

    def get_page_size(self, request):
        page_size = request.query_params.get(self.page_size_query_param, 1)

        if page_size is None:
            return 1

        return page_size

    def get_page_number(self, request, paginator):
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number is None:
            return 1
        return int(page_number)

class PaginatedResponse:
    def __init__(self, pagination:Pagination, data:list | None):
        self.pagination = pagination
        self.data = data

    def get_paginated_response(self, serialize_class):
        serialize = serialize_class(self.data, many=True)

        return {
            'list': serialize.data,
            'page': self.pagination.page.number,
            'size': self.pagination.page.paginator.per_page,
            'totalElements': self.pagination.page.paginator.count,
            'totalPages': self.pagination.page.paginator.num_pages
        }