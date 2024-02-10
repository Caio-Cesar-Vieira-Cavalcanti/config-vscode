import types
from collections.abc import Iterator
from io import StringIO
from typing import IO, Any
from typing_extensions import Self

from django.core.files.utils import FileProxyMixin

class File(FileProxyMixin, IO[Any]):
    DEFAULT_CHUNK_SIZE: Any = ...
    file: IO[Any] = ...
    name: str = ...
    mode: str = ...
    def __init__(self, file: Any, name: str | None = ...) -> None: ...
    def __bool__(self) -> bool: ...
    def __len__(self) -> int: ...
    @property
    def size(self) -> int: ...
    def chunks(self, chunk_size: int | None = ...) -> Iterator[bytes]: ...
    def multiple_chunks(self, chunk_size: int | None = ...) -> bool: ...
    def __iter__(self) -> Iterator[bytes | str]: ...
    def __next__(self) -> bytes | str: ...
    def __enter__(self) -> Self: ...
    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_value: BaseException | None,
        tb: types.TracebackType | None,
    ) -> None: ...
    def open(self, mode: str | None = ...) -> Self: ...
    def close(self) -> None: ...

class ContentFile(File):
    file: StringIO
    size: Any = ...
    def __init__(self, content: bytes | str, name: str | None = ...) -> None: ...
    def write(self, data: str) -> int: ...  # type: ignore[override]

def endswith_cr(line: bytes) -> bool: ...
def endswith_lf(line: bytes | str) -> bool: ...
def equals_lf(line: bytes) -> bool: ...
