from typing import Any

from utils.paginations import PaginatedResponse, Pagination

class BaseService:
    model_class: Any = None
    filter_class: Any = None

    def __init__(self):
        super().__init__()

    def list(self, filter, request) -> PaginatedResponse:
        queryset = self.model_class.objects.all()

        filter_set = self.filter_class(filter, queryset)
        filtered_queryset = filter_set.qs

        pagination = Pagination()
        pagination.request = request
        paginated_queryset = pagination.paginate_queryset(filtered_queryset, request)

        return PaginatedResponse(pagination, paginated_queryset)