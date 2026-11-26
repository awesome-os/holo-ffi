# Awesome-OS Universal FFI (`awesome-os/holo-ffi`)

Write-once C11 **`B8G_ABI_MAGIC_V3` (`0x33564742`)** shared library (`b8g_sectium.dll` / `libb8g_sectium.so` / `wasm32-wasi`) providing **zero-HTTP** Sectium Display, `system://` host surface URIs, `v11` CAS paths, and 64-byte-aligned `B8gDisplayRing` bindings for:

- **`just-js/lo`** (`bindings/lo/lib/holo/api.js` — `const { holo } = lo.load('holo')` using native **V8 Fast API (`fastcall`)**, linked against our shared **`awesome-os/libv8_monolith` (`V8 15.8`)** with `0 B` duplicated V8!)
- **Bun** (`BUN_FFI_SYMBOLS` for `bun:ffi` `dlopen`)
- **Deno** (`DENO_FFI_SYMBOLS` for `Deno.dlopen`)
- **Node.js** & **C11/Zig/Rust** (`include/b8g_sectium_ffi.h`)

## Build & Test (Zero WSL)

```powershell
# Compile & run C11 unit tests (-Wall -Wextra -Werror)
zig cc -std=c11 -O2 -Wall -Wextra -Werror src/b8g_sectium_ffi.c test/ffi_test.c -o dist/ffi_test.exe
.\dist\ffi_test.exe

# Build shared libraries (Win64 DLL + Linux ELF64 .so + WASI .wasm)
zig cc -std=c11 -O2 -shared -Wall -Wextra -Werror src/b8g_sectium_ffi.c -o dist/b8g_sectium.dll
zig cc -target x86_64-linux-musl -std=c11 -O2 -shared -fPIC -Wall -Wextra -Werror src/b8g_sectium_ffi.c -o dist/libb8g_sectium.so
```
