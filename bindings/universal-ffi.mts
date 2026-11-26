/**
 * Universal FFI Symbol Descriptor for Bun (bun:ffi), Deno (Deno.dlopen), and Node.js
 * Targets the single shared C11 library: libb8g_sectium.so / b8g_sectium.dll / libb8g_sectium.dylib
 */

export const B8G_ABI_MAGIC_V3 = 0x33564742;

export const DENO_FFI_SYMBOLS = {
  b8g_abi_magic: { parameters: [], result: 'u32' },
  b8g_sectium_pipe_path: { parameters: ['i32', 'buffer', 'usize'], result: 'i32' },
  b8g_system_uri_format: { parameters: ['buffer', 'buffer', 'buffer', 'buffer', 'usize'], result: 'i32' },
  b8g_v11_cas_path: { parameters: ['buffer', 'buffer', 'i32', 'buffer', 'usize'], result: 'i32' },
  b8g_display_ring_init: { parameters: ['pointer'], result: 'i32' },
  b8g_display_ring_push: { parameters: ['pointer', 'u32', 'u32', 'u32', 'u64'], result: 'i32' },
  b8g_display_ring_pop: { parameters: ['pointer', 'pointer'], result: 'i32' },
} as const;

export const BUN_FFI_SYMBOLS = {
  b8g_abi_magic: { args: [], returns: 'u32' },
  b8g_sectium_pipe_path: { args: ['i32', 'ptr', 'u64'], returns: 'i32' },
  b8g_system_uri_format: { args: ['cstring', 'cstring', 'cstring', 'ptr', 'u64'], returns: 'i32' },
  b8g_v11_cas_path: { args: ['cstring', 'cstring', 'i32', 'ptr', 'u64'], returns: 'i32' },
  b8g_display_ring_init: { args: ['ptr'], returns: 'i32' },
  b8g_display_ring_push: { args: ['ptr', 'u32', 'u32', 'u32', 'u64'], returns: 'i32' },
  b8g_display_ring_pop: { args: ['ptr', 'ptr'], returns: 'i32' },
} as const;

export function resolveLibraryFilename(platform: string = process.platform): string {
  if (platform === 'win32') return 'b8g_sectium.dll';
  if (platform === 'darwin') return 'libb8g_sectium.dylib';
  return 'libb8g_sectium.so';
}
