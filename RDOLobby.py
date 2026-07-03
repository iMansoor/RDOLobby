"""
RDOLobby — Red Dead Online lobby switcher
Backend: Python  |  Frontend: HTML/CSS/JS via pywebview
Launchers: Steam · Epic Games · Rockstar Games
"""

import sys
import os
import base64
import json
import shutil
import subprocess
import tempfile
import time
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

import webview

# ============================================================
#  CONSTANTS
# ============================================================
APP_NAME    = "RDOLobby"
VERSION     = "1.0.6"
GH_OWNER    = "iMansoor"
GH_REPO     = "RDOLobby"

CONFIG_DIR  = Path(os.environ.get("LOCALAPPDATA", Path.home())) / APP_NAME
CONFIG_FILE = CONFIG_DIR / "rdr2_launcher.cfg"
LOG_FILE    = CONFIG_DIR / "update.log"

PROFILE_ROOT = (
    Path(os.environ.get("USERPROFILE", Path.home()))
    / "Documents"
    / "Rockstar Games"
    / "Red Dead Redemption 2"
    / "Profiles"
)

# ============================================================
#  EMBEDDED startup.meta  (Base64 — do not modify)
# ============================================================
STARTUP_META_B64 = (
    "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPENEYXRhRmlsZU1ncl9fQ29u"
    "dGVudHNPZkRhdGFGaWxlWG1sPgogPGRpc2FibGVkRmlsZXMgLz4KIDxpbmNsdWRlZFhtbEZpbGVz"
    "IGl0ZW1UeXBlPSJDRGF0YUZpbGVNZ3JfX0RhdGFGaWxlQXJyYXkiIC8+CiA8aW5jbHVkZWREYXRh"
    "RmlsZXMgLz4KIDxkYXRhRmlsZXMgaXRlbVR5cGU9IkNEYXRhRmlsZU1ncl9fRGF0YUZpbGUiPgog"
    "IDxJdGVtPgogICA8ZmlsZW5hbWU+cGxhdGZvcm06L2RhdGEvY2RpbWFnZXMvc2NhbGVmb3JtX3Bs"
    "YXRmb3JtX3BjLnJwZjwvZmlsZW5hbWU+CiAgIDxmaWxlVHlwZT5SUEZfRklMRTwvZmlsZVR5cGU+"
    "CiAgPC9JdGVtPgogIDxJdGVtPgogICA8ZmlsZW5hbWU+cGxhdGZvcm06L2RhdGEvdWkvdmFsdWVf"
    "Y29udmVyc2lvbi5ycGY8L2ZpbGVuYW1lPgogICA8ZmlsZVR5cGU+UlBGX0ZJTEU8L2ZpbGVUeXBl"
    "PgogIDwvSXRlbT4KICA8SXRlbT4KICAgPGZpbGVuYW1lPnBsYXRmb3JtOi9kYXRhL3VpL3dpZGdl"
    "dHMucnBmPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPlJQRl9GSUxFPC9maWxlVHlwZT4KICA8L0l0"
    "ZW0+CiAgPEl0ZW0+CiAgIDxmaWxlbmFtZT5wbGF0Zm9ybTovdGV4dHVyZXMvdWkvdWlfcGhvdG9f"
    "c3RpY2tlcnMucnBmPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPlJQRl9GSUxFPC9maWxlVHlwZT4K"
    "ICA8L0l0ZW0+CiAgPEl0ZW0+CiAgIDxmaWxlbmFtZT5wbGF0Zm9ybTovdGV4dHVyZXMvdWkvdWlf"
    "cGxhdGZvcm0ucnBmPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPlJQRl9GSUxFPC9maWxlVHlwZT4K"
    "ICA8L0l0ZW0+CiAgPEl0ZW0+CiAgIDxmaWxlbmFtZT5wbGF0Zm9ybTovZGF0YS91aS9zdHlsZXND"
    "YXRhbG9nPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPmFXZWFwb25pemVEaXNwdXRhbnRzPC9maWxl"
    "VHlwZT4gPCEtLSBjb2xsaXNpb24gLS0+CiAgPC9JdGVtPgogIDxJdGVtPgogICA8ZmlsZW5hbWU+"
    "cGxhdGZvcm06L2RhdGEvY2RpbWFnZXMvc2NhbGVmb3JtX2Zyb250ZW5kLnJwZjwvZmlsZW5hbWU+"
    "CiAgIDxmaWxlVHlwZT5SUEZfRklMRV9QUkVfSU5TVEFMTDwvZmlsZVR5cGU+CiAgPC9JdGVtPgog"
    "IDxJdGVtPgogICA8ZmlsZW5hbWU+cGxhdGZvcm06L3RleHR1cmVzL3VpL3VpX3N0YXJ0dXBfdGV4"
    "dHVyZXMucnBmPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPlJQRl9GSUxFPC9maWxlVHlwZT4KICA8"
    "L0l0ZW0+CiAgPEl0ZW0+CiAgIDxmaWxlbmFtZT5wbGF0Zm9ybTovZGF0YS91aS9zdGFydHVwX2Rh"
    "dGEucnBmPC9maWxlbmFtZT4KICAgPGZpbGVUeXBlPlJQRl9GSUxFPC9maWxlVHlwZT4KICA8L0l0"
    "ZW0+CiA8L2RhdGFGaWxlcz4KIDxjb250ZW50Q2hhbmdlU2V0cyBpdGVtVHlwZT0iQ0RhdGFGaWxl"
    "TWdyX19Db250ZW50Q2hhbmdlU2V0IiAvPgogPHBhdGNoRmlsZXMgLz4KPC9DRGF0YUZpbGVNZ3Jf"
    "X0NvbnRlbnRzT2ZEYXRhRmlsZVhtbD4="
)

# ============================================================
#  GAME LOGIC  (identical to PS1 — do not change behaviour)
# ============================================================

def get_startup_xml_core() -> str:
    text    = base64.b64decode(STARTUP_META_B64).decode("utf-8")
    end_tag = "</CDataFileMgr__ContentsOfDataFileXml>"
    idx     = text.find(end_tag)
    return text if idx < 0 else text[: idx + len(end_tag)]


def ensure_config_dir() -> None:
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)


def load_config() -> dict:
    cfg = {"game_root": "", "suffix": "", "choice": "STEAM_STORY"}
    if CONFIG_FILE.exists():
        lines = CONFIG_FILE.read_text(encoding="utf-8").splitlines()
        if len(lines) >= 1: cfg["game_root"] = lines[0]
        if len(lines) >= 2: cfg["suffix"]    = lines[1]
        if len(lines) >= 3: cfg["choice"]    = lines[2]
    return cfg


def save_config(game_root: str, suffix: str, choice: str) -> None:
    ensure_config_dir()
    CONFIG_FILE.write_bytes("\n".join([game_root, suffix, choice]).encode("utf-8"))


def reset_config() -> None:
    CONFIG_FILE.unlink(missing_ok=True)


def validate_game_path(path: str) -> bool:
    if not path or not path.strip():
        return False
    return (Path(path) / "x64" / "data").exists()


def detect_launcher(game_root: str) -> str:
    if not game_root:
        return "Unknown"
    p = Path(game_root)
    if (
        "\\steamapps\\common\\" in game_root
        or (p / "steam_api64.dll").exists()
        or (p / "steam_api.dll").exists()
    ):
        return "Steam"
    if (p / ".egstore").exists() or "\\Epic Games\\" in game_root:
        return "Epic"
    if (p / "PlayRDR2.exe").exists() or (p / "RDR2.exe").exists():
        return "Rockstar"
    return "Unknown"


def get_startup_meta_state(game_root: str, suffix: str) -> str:
    data_path = Path(game_root) / "x64" / "data"
    if not data_path.exists():
        return "Unknown"
    if not list(data_path.glob("startup.meta*")):
        return "Public"
    main_file = data_path / "startup.meta"
    if not main_file.exists():
        return "Public"
    content = main_file.read_text(encoding="utf-8")
    if not suffix:
        return "Public"
    return "Solo" if content.endswith("</CDataFileMgr__ContentsOfDataFileXml>" + suffix) else "Public"


def apply_mode(mode: str, game_root: str, suffix: str) -> None:
    data_path = Path(game_root) / "x64" / "data"
    if not data_path.exists():
        raise FileNotFoundError("x64\\data path not found.")
    for f in data_path.glob("startup.meta*"):
        f.unlink(missing_ok=True)
    if mode == "Public":
        return
    if not suffix:
        raise ValueError("Private token is empty.")
    content = get_startup_xml_core() + suffix
    (data_path / "startup.meta").write_bytes(content.encode("utf-8"))


def clean_profile() -> None:
    if not PROFILE_ROOT.exists():
        return
    for profile_dir in PROFILE_ROOT.iterdir():
        if not profile_dir.is_dir():
            continue
        for name in ("cfg.dat", "cloudsavedata.dat", "Player"):
            target = profile_dir / name
            if target.exists():
                if target.is_dir():
                    shutil.rmtree(target, ignore_errors=True)
                else:
                    target.unlink(missing_ok=True)


def is_game_running() -> bool:
    result = subprocess.run(
        ["tasklist", "/FI", "IMAGENAME eq RDR2.exe"],
        capture_output=True, text=True,
        creationflags=subprocess.CREATE_NO_WINDOW
    )
    return "RDR2.exe" in result.stdout


def stop_game_with_cooldown() -> None:
    if not is_game_running():
        return
    subprocess.run(
        ["taskkill", "/F", "/IM", "RDR2.exe"],
        capture_output=True,
        creationflags=subprocess.CREATE_NO_WINDOW
    )
    deadline = time.time() + 120
    while is_game_running() and time.time() < deadline:
        time.sleep(0.5)
    time.sleep(8)


def launch_steam(choice: str) -> None:
    app_id = "1174180" if choice == "STEAM_STORY" else "1404210"
    os.startfile(f"steam://run/{app_id}")


def launch_rockstar(game_root: str) -> None:
    p = Path(game_root)
    for exe in ("PlayRDR2.exe", "RDR2.exe"):
        if (p / exe).exists():
            subprocess.Popen([str(p / exe)])
            return
    raise FileNotFoundError("PlayRDR2.exe or RDR2.exe not found.")


def write_log(msg: str) -> None:
    try:
        ensure_config_dir()
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] {msg}\n")
    except Exception:
        pass


def version_tuple(v: str) -> tuple:
    return tuple(int(x) for x in v.lstrip("v").split("."))


# ============================================================
#  PYTHON ↔ JS  API
# ============================================================

class Api:
    """All public methods are callable from JavaScript via window.pywebview.api"""

    def __init__(self):
        self._window = None   # set after webview.create_window

    # ---- Window controls ----
    def close_window(self):
        if self._window:
            self._window.destroy()

    def minimize_window(self):
        if self._window:
            self._window.minimize()

    # ---- Init ----
    def get_initial_state(self) -> dict:
        cfg      = load_config()
        launcher = detect_launcher(cfg["game_root"])
        mode     = (
            get_startup_meta_state(cfg["game_root"], cfg["suffix"])
            if validate_game_path(cfg["game_root"]) else "Unknown"
        )
        return {
            "version":   VERSION,
            "game_root": cfg["game_root"],
            "suffix":    cfg["suffix"],
            "choice":    cfg["choice"],
            "launcher":  launcher,
            "mode":      mode,
            "running":   is_game_running(),
        }

    # ---- Folder picker ----
    def browse_folder(self):
        if not self._window:
            return None
        result = self._window.create_file_dialog(webview.FOLDER_DIALOG)
        return result[0] if result else None

    # ---- Live status (polled by JS) ----
    def get_status(self, game_root: str, suffix: str) -> dict:
        running = is_game_running()
        mode    = (
            get_startup_meta_state(game_root, suffix)
            if validate_game_path(game_root) else "Unknown"
        )
        launcher = detect_launcher(game_root)
        return {"running": running, "mode": mode, "launcher": launcher}

    # ---- Config ----
    def save_config_data(self, game_root: str, suffix: str, choice: str) -> dict:
        if not validate_game_path(game_root):
            return {"ok": False, "error": "bad_path"}
        launcher = detect_launcher(game_root)
        save_key = (
            choice      if launcher == "Steam"   else
            "EPIC"      if launcher == "Epic"    else
            "ROCKSTAR"
        )
        save_config(game_root, suffix, save_key)
        return {"ok": True, "launcher": launcher}

    def reset_config_data(self) -> dict:
        reset_config()
        return {"ok": True}

    # ---- Launch (blocking — JS shows loading state while this runs) ----
    def launch_mode(self, mode: str, game_root: str, suffix: str, choice: str) -> dict:
        if not validate_game_path(game_root):
            return {"ok": False, "error": "bad_path"}

        launcher     = detect_launcher(game_root)
        current_mode = get_startup_meta_state(game_root, suffix)
        running      = is_game_running()

        if running and current_mode == mode:
            return {"ok": False, "error": "already_" + mode.lower()}

        if running:
            self._js('App.setStatus("st_closing","info")')
            stop_game_with_cooldown()

        try:
            apply_mode(mode, game_root, suffix)

            if launcher == "Epic":
                return {"ok": True, "action": "epic_manual", "mode": mode}
            elif launcher == "Steam":
                clean_profile()
                launch_steam(choice)
                return {"ok": True, "action": "launched", "mode": mode}
            elif launcher == "Rockstar":
                clean_profile()
                launch_rockstar(game_root)
                return {"ok": True, "action": "launched", "mode": mode}
            else:
                return {"ok": False, "error": "unknown_launcher"}

        except Exception as exc:
            write_log(f"launch error: {exc}")
            return {"ok": False, "error": str(exc)}

    # ---- Update ----
    def check_update(self) -> dict:
        try:
            url = f"https://api.github.com/repos/{GH_OWNER}/{GH_REPO}/releases/latest"
            req = urllib.request.Request(url)
            req.add_header("User-Agent", f"{APP_NAME}/{VERSION}")
            req.add_header("Accept",     "application/vnd.github+json")
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))

            tag = data.get("tag_name", "")
            if not tag:
                return {"ok": False, "error": "no_tag"}

            is_newer = version_tuple(tag) > version_tuple(VERSION)
            if not is_newer:
                return {"ok": True, "newer": False, "current": VERSION}

            assets = data.get("assets", [])
            asset  = next((a for a in assets if a["name"] == "RDOLobby.exe"), None)
            return {
                "ok":           True,
                "newer":        True,
                "tag":          tag,
                "download_url": asset["browser_download_url"] if asset else None,
            }

        except urllib.error.HTTPError as e:
            write_log(f"Update check HTTP error: {e}")
            return {"ok": False, "error": f"http_{e.code}"}
        except Exception as e:
            write_log(f"Update check error: {e}")
            return {"ok": False, "error": str(e)}

    def download_and_apply_update(self, download_url: str) -> dict:
        try:
            tmp_dir  = Path(tempfile.gettempdir())
            new_exe  = tmp_dir / "RDOLobby_new.exe"
            cmd_path = tmp_dir / "RDOLobby_Update.cmd"

            with urllib.request.urlopen(download_url, timeout=60) as resp:
                new_exe.write_bytes(resp.read())

            if not new_exe.exists():
                return {"ok": False, "error": "download_failed"}

            cur_exe = sys.executable if getattr(sys, "frozen", False) else str(Path(sys.argv[0]).resolve())

            cmd = (
                "@echo off\r\n"
                "timeout /t 2 /nobreak >nul\r\n"
                f'copy /y "{new_exe}" "{cur_exe}" >nul\r\n'
                f'start "" "{cur_exe}"\r\n'
                f'del /f /q "{new_exe}" >nul\r\n'
                'del /f /q "%~f0" >nul\r\n'
            )
            cmd_path.write_text(cmd, encoding="ascii")
            subprocess.Popen(["cmd.exe", "/c", str(cmd_path)], creationflags=subprocess.CREATE_NO_WINDOW)

            if self._window:
                self._window.destroy()
            sys.exit(0)

        except Exception as e:
            write_log(f"Update download error: {e}")
            return {"ok": False, "error": str(e)}

    # ---- Internal ----
    def _js(self, script: str) -> None:
        if self._window:
            try:
                self._window.evaluate_js(script)
            except Exception:
                pass


# ============================================================
#  ENTRY POINT
# ============================================================
if __name__ == "__main__":
    if getattr(sys, "frozen", False):
        base_dir = Path(sys._MEIPASS)
    else:
        base_dir = Path(__file__).parent

    html_file = str(base_dir / "ui" / "index.html")

    api = Api()

    window = webview.create_window(
        title             = "RDOLobby",
        url               = html_file,
        js_api            = api,
        width             = 800,
        height            = 555,
        resizable         = False,
        frameless         = True,
        easy_drag         = True,
        background_color  = "#0a0a0f",
    )

    api._window = window
    webview.start(debug=False)
