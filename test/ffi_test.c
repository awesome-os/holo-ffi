#include "../include/b8g_sectium_ffi.h"

#include <stdalign.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CHECK(cond)                                                            \
    do {                                                                       \
        if (!(cond)) {                                                         \
            fprintf(stderr, "FAIL: %s:%d: %s\n", __FILE__, __LINE__, #cond);   \
            exit(1);                                                           \
        }                                                                      \
    } while (0)

int main(void) {
    CHECK(alignof(B8gDisplayRing) == 64);
    CHECK(b8g_abi_magic() == 0x33564742U);

    char buf[256];
    CHECK(b8g_sectium_pipe_path(1, buf, sizeof(buf)) > 0);
    CHECK(strcmp(buf, "\\\\.\\pipe\\sectium-dev") == 0);
    CHECK(b8g_sectium_pipe_path(0, buf, sizeof(buf)) > 0);
    CHECK(strcmp(buf, "/tmp/sectium-dev.sock") == 0);

    CHECK(b8g_system_uri_format("local", "desktop", "omarchy-hyprland", buf, sizeof(buf)) > 0);
    CHECK(strcmp(buf, "system://local/desktop/omarchy-hyprland") == 0);
    CHECK(b8g_system_uri_format("rack-01", "terminal", "ttyS0", buf, sizeof(buf)) > 0);
    CHECK(strcmp(buf, "system://rack-01/terminal/ttyS0") == 0);
    CHECK(b8g_system_uri_format("rack-01", "http", "bad", buf, sizeof(buf)) < 0);
    CHECK(b8g_system_uri_format("../bad", "desktop", "ok", buf, sizeof(buf)) < 0);

    const char *sha = "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90";
    CHECK(b8g_v11_cas_path("/var/lib/b8g/cas", sha, 1, buf, sizeof(buf)) > 0);
    CHECK(strstr(buf, "/v11/files/a1/") != NULL);
    CHECK(strstr(buf, "-exec") != NULL);
    CHECK(b8g_v11_cas_path("/var/lib/../bad", sha, 0, buf, sizeof(buf)) < 0);
    CHECK(b8g_v11_cas_path("/var/lib/b8g/cas", "not-hex", 0, buf, sizeof(buf)) < 0);

    B8gDisplayRing ring;
    CHECK(b8g_display_ring_init(&ring) == 0);
    CHECK(b8g_display_ring_push(&ring, 1, 1920, 1080, 0xCAFEBABEULL) == 0);
    B8gDisplayCmd cmd;
    CHECK(b8g_display_ring_pop(&ring, &cmd) == 1);
    CHECK(cmd.opcode == 1 && cmd.width == 1920 && cmd.height == 1080 && cmd.handle == 0xCAFEBABEULL);
    CHECK(b8g_display_ring_pop(&ring, &cmd) == 0);

    printf("PASS: libb8g_sectium C11 FFI unit tests passed (ABI=0x%08X, align=%zu)\n",
           b8g_abi_magic(), alignof(B8gDisplayRing));
    return 0;
}
