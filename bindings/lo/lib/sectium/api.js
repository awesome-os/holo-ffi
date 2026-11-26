// Native just-js/lo binding for Awesome-OS Sectium + v11 CAS (zero-HTTP replacement for lo/lib/webui)
const api = {
  abi_magic: {
    parameters: [],
    result: 'u32',
    name: 'b8g_abi_magic',
  },
  sectium_pipe_path: {
    parameters: ['i32', 'buffer', 'u32'],
    pointers: [, 'char*'],
    result: 'i32',
    name: 'b8g_sectium_pipe_path',
  },
  system_uri_format: {
    parameters: ['string', 'string', 'string', 'buffer', 'u32'],
    pointers: ['const char*', 'const char*', 'const char*', 'char*'],
    result: 'i32',
    name: 'b8g_system_uri_format',
  },
  v11_cas_path: {
    parameters: ['string', 'string', 'i32', 'buffer', 'u32'],
    pointers: ['const char*', 'const char*', , 'char*'],
    result: 'i32',
    name: 'b8g_v11_cas_path',
  },
  display_ring_init: {
    parameters: ['pointer'],
    pointers: ['B8gDisplayRing*'],
    result: 'i32',
    name: 'b8g_display_ring_init',
  },
  display_ring_push: {
    parameters: ['pointer', 'u32', 'u32', 'u32', 'u64'],
    pointers: ['B8gDisplayRing*'],
    result: 'i32',
    name: 'b8g_display_ring_push',
  },
  display_ring_pop: {
    parameters: ['pointer', 'pointer'],
    pointers: ['B8gDisplayRing*', 'B8gDisplayCmd*'],
    result: 'i32',
    name: 'b8g_display_ring_pop',
  },
};

const preamble = `#include "b8g_sectium_ffi.h"\n`;
const name = 'sectium';
const libs = ['b8g_sectium'];
const includes = ['include'];

export { name, api, preamble, libs, includes };
