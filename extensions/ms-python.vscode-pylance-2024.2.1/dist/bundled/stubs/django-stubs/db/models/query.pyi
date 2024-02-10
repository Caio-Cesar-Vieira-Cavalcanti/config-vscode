import datetime
from collections.abc import (
    AsyncIterator,
    Collection,
    Iterable,
    Iterator,
    MutableMapping,
    Reversible,
    Sequence,
    Sized,
)
from typing import Any, Generic, TypeVar, overload
from typing_extensions import Self

from django.db import models
from django.db.models import Manager
from django.db.models.base import Model
from django.db.models.expressions import Combinable as Combinable  # noqa: F401
from django.db.models.expressions import F as F
from django.db.models.query_utils import Q as Q  # noqa: F401
from django.db.models.sql.query import Query, RawQuery

_T = TypeVar("_T", bound=models.Model)

class _BaseQuerySet(Generic[_T], Sized):
    model: type[_T]
    query: Query
    def __init__(
        self,
        model: type[models.Model] | None = ...,
        query: Query | None = ...,
        using: str | None = ...,
        hints: dict[str, models.Model] | None = ...,
    ) -> None: ...
    @classmethod
    def as_manager(cls) -> Manager[_T]: ...
    def __len__(self) -> int: ...
    def __bool__(self) -> bool: ...
    def __class_getitem__(cls, item: type[_T]) -> Any: ...
    def __getstate__(self) -> dict[str, Any]: ...
    # Technically, the other QuerySet must be of the same type _T, but _T is covariant
    def __and__(self, other: _BaseQuerySet[_T]) -> Self: ...
    def __or__(self, other: _BaseQuerySet[_T]) -> Self: ...
    def iterator(self, chunk_size: int = ...) -> Iterator[_T]: ...
    async def aiterator(self, chunk_size: int = ...) -> Iterator[_T]: ...
    def aggregate(self, *args: Any, **kwargs: Any) -> dict[str, Any]: ...
    async def aaggregate(self, *args: Any, **kwargs: Any) -> dict[str, Any]: ...
    def get(self, *args: Any, **kwargs: Any) -> _T: ...
    async def aget(self, *args: Any, **kwargs: Any) -> _T: ...
    def create(self, **kwargs: Any) -> _T: ...
    async def acreate(self, **kwargs: Any) -> _T: ...
    def bulk_create(
        self,
        objs: Iterable[_T],
        batch_size: int | None = ...,
        ignore_conflicts: bool = ...,
        update_conflicts: bool | None = ...,
        update_fields: Sequence[str] | None = ...,
        unique_fields: Sequence[str] | None = ...,
    ) -> list[_T]: ...
    async def abulk_create(
        self,
        objs: Iterable[_T],
        batch_size: int | None = ...,
        ignore_conflicts: bool = ...,
        update_conflicts: Sequence[str] | None = ...,
        update_fields: Sequence[str] | None = ...,
        unique_fields: Sequence[str] | None = ...,
    ) -> list[_T]: ...
    def bulk_update(
        self, objs: Iterable[_T], fields: Sequence[str], batch_size: int | None = ...
    ) -> int: ...
    def get_or_create(
        self, defaults: MutableMapping[str, Any] | None = ..., **kwargs: Any
    ) -> tuple[_T, bool]: ...
    async def aget_or_create(
        self, defaults: MutableMapping[str, Any] | None = ..., **kwargs: Any
    ) -> tuple[_T, bool]: ...
    def update_or_create(
        self, defaults: MutableMapping[str, Any] | None = ..., **kwargs: Any
    ) -> tuple[_T, bool]: ...
    async def aupdate_or_create(
        self, defaults: MutableMapping[str, Any] | None = ..., **kwargs: Any
    ) -> tuple[_T, bool]: ...
    def earliest(self, *fields: Any, field_name: Any | None = ...) -> _T: ...
    async def aearliest(self, *fields: Any, field_name: Any | None = ...) -> _T: ...
    def latest(self, *fields: Any, field_name: Any | None = ...) -> _T: ...
    async def alatest(self, *fields: Any, field_name: Any | None = ...) -> _T: ...
    def first(self) -> _T | None: ...
    async def afirst(self) -> _T | None: ...
    def last(self) -> _T | None: ...
    async def alast(self) -> _T | None: ...
    def in_bulk(
        self, id_list: Iterable[Any] = ..., *, field_name: str = ...
    ) -> dict[Any, _T]: ...
    async def ain_bulk(
        self, id_list: Iterable[Any] = ..., *, field_name: str = ...
    ) -> dict[Any, _T]: ...
    def delete(self) -> tuple[int, dict[str, int]]: ...
    async def adelete(self) -> tuple[int, dict[str, int]]: ...
    def update(self, **kwargs: Any) -> int: ...
    async def aupdate(self, **kwargs: Any) -> int: ...
    def exists(self) -> bool: ...
    async def aexists(self) -> bool: ...
    def contains(self, obj: _T) -> bool: ...
    async def acontains(self, obj: _T) -> bool: ...
    def explain(self, *, format: Any | None = ..., **options: Any) -> str: ...
    async def aexplain(self, *, format: Any | None = ..., **options: Any) -> str: ...
    def raw(
        self,
        raw_query: str,
        params: Any = ...,
        translations: dict[str, str] | None = ...,
        using: str | None = ...,
    ) -> RawQuerySet[Any]: ...
    # The type of values may be overridden to be more specific in the mypy plugin, depending on the fields param
    def values(
        self, *fields: str | Combinable, **expressions: Any
    ) -> ValuesQuerySet[_T, dict[str, Any]]: ...
    # The type of values_list may be overridden to be more specific in the mypy plugin, depending on the fields param
    def values_list(
        self, *fields: str | Combinable, flat: bool = ..., named: bool = ...
    ) -> ValuesQuerySet[_T, Any]: ...
    def dates(
        self, field_name: str, kind: str, order: str = ...
    ) -> ValuesQuerySet[_T, datetime.date]: ...
    def datetimes(
        self,
        field_name: str,
        kind: str,
        order: str = ...,
        tzinfo: datetime.tzinfo | None = ...,
    ) -> ValuesQuerySet[_T, datetime.datetime]: ...
    def none(self) -> Self: ...
    def all(self) -> Self: ...
    def filter(self, *args: Any, **kwargs: Any) -> Self: ...
    def exclude(self, *args: Any, **kwargs: Any) -> Self: ...
    def complex_filter(self, filter_obj: Any) -> Self: ...
    def count(self) -> int: ...
    async def acount(self) -> int: ...
    def union(self, *other_qs: Any, all: bool = ...) -> Self: ...
    def intersection(self, *other_qs: Any) -> Self: ...
    def difference(self, *other_qs: Any) -> Self: ...
    def select_for_update(
        self,
        nowait: bool = ...,
        skip_locked: bool = ...,
        of: Sequence[str] = ...,
        no_key: bool = ...,
    ) -> Self: ...
    def select_related(self, *fields: Any) -> Self: ...
    def prefetch_related(self, *lookups: Any) -> Self: ...
    def annotate(self, *args: Any, **kwargs: Any) -> Self: ...
    def alias(self, *args: Any, **kwargs: Any) -> Self: ...
    def order_by(self, *field_names: Any) -> Self: ...
    def distinct(self, *field_names: Any) -> Self: ...
    # extra() return type won't be supported any time soon
    def extra(
        self,
        select: dict[str, Any] | None = ...,
        where: list[str] | None = ...,
        params: list[Any] | None = ...,
        tables: list[str] | None = ...,
        order_by: Sequence[str] | None = ...,
        select_params: Sequence[Any] | None = ...,
    ) -> QuerySet[Any]: ...
    def reverse(self) -> Self: ...
    def defer(self, *fields: Any) -> Self: ...
    def only(self, *fields: Any) -> Self: ...
    def using(self, alias: str | None) -> Self: ...
    @property
    def ordered(self) -> bool: ...
    @property
    def db(self) -> str: ...
    def resolve_expression(self, *args: Any, **kwargs: Any) -> Any: ...

class QuerySet(_BaseQuerySet[_T], Collection[_T], Reversible[_T], Sized):
    def __iter__(self) -> Iterator[_T]: ...
    def __aiter__(self) -> AsyncIterator[_T]: ...
    def __contains__(self, x: object) -> bool: ...
    @overload
    def __getitem__(self, i: int) -> _T: ...
    @overload
    def __getitem__(self, s: slice) -> Self: ...
    def __reversed__(self) -> Iterator[_T]: ...

_Row = TypeVar("_Row", covariant=True)

class BaseIterable(Sequence[_Row]):
    def __init__(
        self,
        queryset: _BaseQuerySet[Any],
        chunked_fetch: bool = ...,
        chunk_size: int = ...,
    ) -> None: ...
    def __iter__(self) -> Iterator[_Row]: ...
    def __aiter__(self) -> AsyncIterator[_Row]: ...
    def __contains__(self, x: object) -> bool: ...
    def __len__(self) -> int: ...
    @overload
    def __getitem__(self, i: int) -> _Row: ...
    @overload
    def __getitem__(self, s: slice) -> Sequence[_Row]: ...

class ModelIterable(BaseIterable[Model]): ...
class ValuesIterable(BaseIterable[dict[str, Any]]): ...
class ValuesListIterable(BaseIterable[tuple[Any, ...]]): ...
class NamedValuesListIterable(ValuesListIterable): ...

class FlatValuesListIterable(BaseIterable[Any]):
    def __iter__(self) -> Iterator[Any]: ...
    def __aiter__(self) -> AsyncIterator[Any]: ...

class ValuesQuerySet(_BaseQuerySet[_T], Collection[_Row], Sized):
    def __contains__(self, x: object) -> bool: ...
    def __iter__(self) -> Iterator[_Row]: ...
    def __aiter__(self) -> AsyncIterator[_Row]: ...
    @overload
    def __getitem__(self, i: int) -> _Row: ...
    @overload
    def __getitem__(self, s: slice) -> Self: ...
    def iterator(self, chunk_size: int = ...) -> Iterator[_Row]: ...  # type: ignore
    async def aiterator(self, chunk_size: int = ...) -> Iterator[_Row]: ...  # type: ignore
    def get(self, *args: Any, **kwargs: Any) -> _Row: ...  # type: ignore
    async def aget(self, *args: Any, **kwargs: Any) -> _Row: ...  # type: ignore
    def earliest(self, *fields: Any, field_name: Any | None = ...) -> _Row: ...  # type: ignore
    async def aearliest(self, *fields: Any, field_name: Any | None = ...) -> _Row: ...  # type: ignore
    def latest(self, *fields: Any, field_name: Any | None = ...) -> _Row: ...  # type: ignore
    async def alatest(self, *fields: Any, field_name: Any | None = ...) -> _Row: ...  # type: ignore
    def first(self) -> _Row | None: ...  # type: ignore
    async def afirst(self) -> _Row | None: ...  # type: ignore
    def last(self) -> _Row | None: ...  # type: ignore
    async def alast(self) -> _Row | None: ...  # type: ignore

class RawQuerySet(Iterable[_T], Sized):
    query: RawQuery
    def __init__(
        self,
        raw_query: RawQuery | str,
        model: type[models.Model] | None = ...,
        query: Query | None = ...,
        params: tuple[Any] = ...,
        translations: dict[str, str] | None = ...,
        using: str = ...,
        hints: dict[str, models.Model] | None = ...,
    ) -> None: ...
    def __len__(self) -> int: ...
    def __iter__(self) -> Iterator[_T]: ...
    def __aiter__(self) -> AsyncIterator[_T]: ...
    def __bool__(self) -> bool: ...
    @overload
    def __getitem__(self, k: int) -> _T: ...
    @overload
    def __getitem__(self, k: str) -> Any: ...
    @overload
    def __getitem__(self, k: slice) -> RawQuerySet[_T]: ...
    @property
    def columns(self) -> list[str]: ...
    @property
    def db(self) -> str: ...
    def iterator(self) -> Iterator[_T]: ...
    async def aiterator(self) -> Iterator[_T]: ...
    @property
    def model_fields(self) -> dict[str, str]: ...
    def prefetch_related(self, *lookups: Any) -> RawQuerySet[_T]: ...
    def resolve_model_init_order(
        self,
    ) -> tuple[list[str], list[int], list[tuple[str, int]]]: ...
    def using(self, alias: str | None) -> RawQuerySet[_T]: ...

class Prefetch(Generic[_T]):
    prefetch_through: str
    prefetch_to: str
    queryset: QuerySet[_T]
    def __init__(
        self,
        lookup: str,
        queryset: QuerySet[Any] | None = ...,
        to_attr: str | None = ...,
    ) -> None: ...
    def __getstate__(self) -> dict[str, Any]: ...
    def add_prefix(self, prefix: str) -> None: ...
    def get_current_prefetch_to(self, level: int) -> str: ...
    def get_current_to_attr(self, level: int) -> tuple[str, str]: ...
    def get_current_queryset(self, level: int) -> QuerySet[Any] | None: ...

def prefetch_related_objects(
    model_instances: Iterable[models.Model], *related_lookups: str | Prefetch[Any]
) -> None: ...
def get_prefetcher(
    instance: Model, through_attr: str, to_attr: str
) -> tuple[Any, Any, bool, bool]: ...

class InstanceCheckMeta(type): ...
class EmptyQuerySet(metaclass=InstanceCheckMeta): ...