/* ============================================================
   RDOLobby — Frontend Logic
   All UI text lives in STRINGS. All game logic lives in Python.
   ============================================================ */

// ── Localization ─────────────────────────────────────────────
const STRINGS = {
  AR: {
    header:         "لوبي ريد ديد اون لاين",
    lang_btn:       "English",
    lbl_settings:   "الإعدادات",
    lbl_status:     "الحالة",
    lbl_update:     "تحديث",
    lbl_path:       "مسار اللعبة:",
    lbl_suffix:     "الرمز الخاص:",
    lbl_steam:      "نسخة ستيم:",
    btn_browse:     "استعراض",
    btn_save:       "حفظ",
    btn_reset:      "مسح",
    btn_update:     "تحديث",
    lbl_solo:       "لوبي خاص",
    lbl_public:     "لوبي عام",
    lbl_mode:       "الوضع",
    lbl_game:       "اللعبة",
    lbl_launcher:   "المشغّل",
    mode_unknown:   "غير معروف",
    mode_solo:      "خاص",
    mode_public:    "عام",
    game_running:   "شغالة",
    game_closed:    "مقفلة",
    opt_story:      "نسخة القصة",
    opt_online:     "نسخة الأونلاين",
    st_ready:       "جاهز",
    st_loaded:      "تم تحميل الإعدادات",
    st_saved:       "تم حفظ الإعدادات",
    st_cleared:     "تم مسح الإعدادات",
    st_path_ok:     "تم اختيار مسار اللعبة",
    st_path_bad:    "تحذير: المسار لا يبدو صحيحًا",
    st_save_fail:   "فشل الحفظ: مسار غير صالح",
    st_path_invalid:"مسار اللعبة غير صالح",
    st_closing:     "جاري إغلاق اللعبة...",
    st_solo_ok:     "تم تطبيق لوبي خاص — جاري التشغيل",
    st_pub_ok:      "تم تطبيق لوبي عام — جاري التشغيل",
    st_launch_err:  "خطأ أثناء التشغيل",
    st_same_mode:   "اللعبة تعمل بالفعل بنفس الوضع",
    st_checking:    "جاري التحقق من التحديث...",
    st_up_to_date:  "أنت على آخر إصدار ({ver})",
    st_new_ver:     "يتوفر تحديث ({tag})",
    st_downloading: "جارٍ تحميل التحديث...",
    st_applying:    "سيتم إغلاق البرنامج لتطبيق التحديث...",
    st_upd_err:     "خطأ في التحديث",
    upd_hint:       "تحديث متاح — {tag}",
    overlay_close:  "جاري إغلاق اللعبة، لحظة...",
    overlay_dl:     "جارٍ تحميل التحديث...",
    msg_bad_path:   "المسار غير صحيح.\nتأكد أن مجلد اللعبة يحتوي على x64\\data.",
    msg_path_warn:  "المسار المختار لا يحتوي على مجلد x64\\data.",
    msg_no_asset:   "ما تم العثور على RDOLobby.exe في الإصدار الأخير.",
    msg_no_release: "ما فيه Release منشور في GitHub.",
    msg_up_to_date: "لا يوجد تحديث جديد.\nأنت على آخر إصدار ({ver}).",
    msg_epic_solo:  "تم تطبيق لوبي خاص ✔\n\nافتح اللعبة يدويًا من Epic Launcher:\nLibrary › Red Dead Redemption 2 › Launch",
    msg_epic_pub:   "تم تطبيق لوبي عام ✔\n\nافتح اللعبة يدويًا من Epic Launcher:\nLibrary › Red Dead Redemption 2 › Launch",
    msg_already_solo: "أنت بالفعل داخل لوبي خاص.",
    msg_already_pub:  "أنت بالفعل داخل لوبي عام.",
    msg_unknown_lnch: "لم يتم التعرف على المشغل. تأكد من صحة مسار اللعبة.",
  },
  EN: {
    header:         "Red Dead Online Lobby",
    lang_btn:       "عربي",
    lbl_settings:   "SETTINGS",
    lbl_status:     "STATUS",
    lbl_update:     "UPDATE",
    lbl_path:       "Game Path:",
    lbl_suffix:     "Private Token:",
    lbl_steam:      "Steam Version:",
    btn_browse:     "Browse",
    btn_save:       "Save",
    btn_reset:      "Clear",
    btn_update:     "Update",
    lbl_solo:       "Solo Lobby",
    lbl_public:     "Public Lobby",
    lbl_mode:       "Mode",
    lbl_game:       "Game",
    lbl_launcher:   "Launcher",
    mode_unknown:   "Unknown",
    mode_solo:      "Solo",
    mode_public:    "Public",
    game_running:   "Running",
    game_closed:    "Closed",
    opt_story:      "Story Mode",
    opt_online:     "Online Mode",
    st_ready:       "Ready",
    st_loaded:      "Settings loaded",
    st_saved:       "Settings saved",
    st_cleared:     "Settings cleared",
    st_path_ok:     "Game path selected",
    st_path_bad:    "Warning: Path looks incorrect",
    st_save_fail:   "Save failed: invalid path",
    st_path_invalid:"Game path is invalid",
    st_closing:     "Closing game...",
    st_solo_ok:     "Solo lobby applied — launching",
    st_pub_ok:      "Public lobby applied — launching",
    st_launch_err:  "Error during launch",
    st_same_mode:   "Game already running in same mode",
    st_checking:    "Checking for update...",
    st_up_to_date:  "You are on the latest version ({ver})",
    st_new_ver:     "Update available ({tag})",
    st_downloading: "Downloading update...",
    st_applying:    "Closing to apply update...",
    st_upd_err:     "Update error",
    upd_hint:       "Update available — {tag}",
    overlay_close:  "Closing game, please wait...",
    overlay_dl:     "Downloading update...",
    msg_bad_path:   "Invalid path.\nEnsure the game folder contains x64\\data.",
    msg_path_warn:  "Selected path does not contain x64\\data.",
    msg_no_asset:   "RDOLobby.exe not found in the latest release.",
    msg_no_release: "No release published on GitHub.",
    msg_up_to_date: "No update available.\nYou are on the latest version ({ver}).",
    msg_epic_solo:  "Solo lobby applied ✔\n\nLaunch the game manually from Epic Launcher:\nLibrary › Red Dead Redemption 2 › Launch",
    msg_epic_pub:   "Public lobby applied ✔\n\nLaunch the game manually from Epic Launcher:\nLibrary › Red Dead Redemption 2 › Launch",
    msg_already_solo: "You are already in a Solo lobby.",
    msg_already_pub:  "You are already in a Public lobby.",
    msg_unknown_lnch: "Launcher not recognized. Check your game path.",
  }
};

// ── App state ─────────────────────────────────────────────────
const App = {
  lang:             "AR",
  updateAvailable:  false,
  latestTag:        "",
  downloadUrl:      "",
  pollTimer:        null,
  updTimer:         null,
  _sbKey:           "st_ready",
  _sbLevel:         "default",
  _sbParams:        null,

  // ── Translation ──
  t(key, params) {
    let s = STRINGS[this.lang][key] ?? key;
    if (params) Object.entries(params).forEach(([k, v]) => s = s.replace(`{${k}}`, v));
    return s;
  },

  // ── Status bar ──
  setStatus(key, level = "default", params) {
    this._sbKey    = key;
    this._sbLevel  = level;
    this._sbParams = params ?? null;
    const msg  = document.getElementById("sb-msg");
    const dot  = document.getElementById("sb-dot");
    const text = this.t(key, params);
    msg.textContent = text;
    msg.className   = "statusbar-msg " + (level === "default" ? "" : level);
    dot.className   = "statusbar-dot " + (level === "default" ? "" : level);
  },

  _reRenderStatus() {
    const msg = document.getElementById("sb-msg");
    const dot = document.getElementById("sb-dot");
    if (!msg) return;
    msg.textContent = this.t(this._sbKey, this._sbParams);
    msg.className   = "statusbar-msg " + (this._sbLevel === "default" ? "" : this._sbLevel);
    dot.className   = "statusbar-dot " + (this._sbLevel === "default" ? "" : this._sbLevel);
  },

  setStatusText(text, level = "default") {
    const msg = document.getElementById("sb-msg");
    const dot = document.getElementById("sb-dot");
    msg.textContent = text;
    msg.className   = "statusbar-msg " + level;
    dot.className   = "statusbar-dot " + level;
  },

  // ── Overlay ──
  showOverlay(msgKey) {
    const el = document.getElementById("overlay");
    document.getElementById("overlay-msg").textContent = this.t(msgKey);
    el.classList.remove("hidden");
    this.setLaunchEnabled(false);
  },

  hideOverlay() {
    document.getElementById("overlay").classList.add("hidden");
    this.setLaunchEnabled(true);
  },

  setLaunchEnabled(enabled) {
    document.getElementById("btn-solo").disabled   = !enabled;
    document.getElementById("btn-public").disabled = !enabled;
  },

  // ── Mode / game state display ──
  updateStatusDisplay(mode, running, launcher) {
    const dotMode  = document.getElementById("dot-mode");
    const valMode  = document.getElementById("val-mode");
    const dotGame  = document.getElementById("dot-game");
    const valGame  = document.getElementById("val-game");
    const valLaunch= document.getElementById("val-launcher");

    if (mode === "Solo") {
      valMode.textContent = this.t("mode_solo");
      dotMode.className   = "dot green";
    } else if (mode === "Public") {
      valMode.textContent = this.t("mode_public");
      dotMode.className   = "dot blue";
    } else {
      valMode.textContent = this.t("mode_unknown");
      dotMode.className   = "dot muted";
    }

    if (running) {
      valGame.textContent = this.t("game_running");
      dotGame.className   = "dot green pulse";
    } else {
      valGame.textContent = this.t("game_closed");
      dotGame.className   = "dot muted";
    }

    if (valLaunch && launcher) valLaunch.textContent = launcher;

    // Steam select: show inline when launcher is Steam
    const isSteam  = launcher === "Steam";
    const steamSel = document.getElementById("cmb-steam");
    if (steamSel) {
      steamSel.style.display = isSteam ? "" : "none";
      steamSel.disabled      = !isSteam;
    }
  },

  // ── Update badge ──
  setUpdateBadge(available, tag) {
    this.updateAvailable = available;
    this.latestTag       = tag;
    const hint = document.getElementById("update-hint");
    if (available && tag) {
      hint.textContent = this.t("upd_hint", { tag });
      hint.classList.remove("hidden");
    } else {
      hint.classList.add("hidden");
    }
  },

  // ── Language ──
  applyLanguage() {
    const isAR = this.lang === "AR";
    document.documentElement.dir  = isAR ? "rtl" : "ltr";
    document.documentElement.lang = isAR ? "ar"  : "en";

    document.getElementById("header-title").textContent    = this.t("header");
    document.getElementById("lang-btn").textContent        = this.t("lang_btn");
    document.getElementById("lbl-settings").textContent    = this.t("lbl_settings");
    document.getElementById("lbl-path").textContent        = this.t("lbl_path");
    document.getElementById("lbl-suffix").textContent      = this.t("lbl_suffix");
    document.getElementById("btn-browse").textContent      = this.t("btn_browse");
    document.getElementById("btn-save").textContent        = this.t("btn_save");
    document.getElementById("btn-reset").textContent       = this.t("btn_reset");
    document.getElementById("lbl-info-mode").textContent   = this.t("lbl_mode");
    document.getElementById("lbl-info-game").textContent   = this.t("lbl_game");
    document.getElementById("lbl-info-launcher").textContent = this.t("lbl_launcher");
    document.getElementById("lbl-update-title").textContent = this.t("lbl_update");
    document.getElementById("btn-update").textContent      = this.t("btn_update");
    document.getElementById("lbl-solo").textContent        = this.t("lbl_solo");
    document.getElementById("lbl-public").textContent      = this.t("lbl_public");
    document.getElementById("opt-story").textContent       = this.t("opt_story");
    document.getElementById("opt-online").textContent      = this.t("opt_online");

    if (this.updateAvailable && this.latestTag)
      this.setUpdateBadge(true, this.latestTag);

    this._reRenderStatus();
  },

  // ── Polling ──
  startPolling() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => this.poll(), 3000);
  },

  async poll() {
    const root   = document.getElementById("txt-path").value;
    const suffix = document.getElementById("txt-suffix").value;
    try {
      const r = await window.pywebview.api.get_status(root, suffix);
      this.updateStatusDisplay(r.mode, r.running, r.launcher);
    } catch (_) {}
  },

  startUpdateTimer() {
    if (this.updTimer) clearInterval(this.updTimer);
    this.updTimer = setInterval(() => this.silentUpdateCheck(), 20 * 60 * 1000);
  },

  async silentUpdateCheck() {
    try {
      const r = await window.pywebview.api.check_update();
      if (r.ok && r.newer) this.setUpdateBadge(true, r.tag);
    } catch (_) {}
  },
};

// ── Event wiring ─────────────────────────────────────────────

document.getElementById("btn-minimize").addEventListener("click", () =>
  window.pywebview.api.minimize_window()
);
document.getElementById("btn-close").addEventListener("click", () =>
  window.pywebview.api.close_window()
);

document.getElementById("lang-btn").addEventListener("click", () => {
  App.lang = App.lang === "AR" ? "EN" : "AR";
  localStorage.setItem("rdolobby_lang", App.lang);
  App.applyLanguage();
  // Re-render current status labels
  const root   = document.getElementById("txt-path").value;
  const suffix = document.getElementById("txt-suffix").value;
  window.pywebview.api.get_status(root, suffix).then(r =>
    App.updateStatusDisplay(r.mode, r.running, r.launcher)
  );
});

document.getElementById("btn-browse").addEventListener("click", async () => {
  const path = await window.pywebview.api.browse_folder();
  if (!path) return;
  document.getElementById("txt-path").value = path;
  const r = await window.pywebview.api.get_status(path, document.getElementById("txt-suffix").value);
  App.updateStatusDisplay(r.mode, r.running, r.launcher);
  if (r.mode !== "Unknown") {
    App.setStatus("st_path_ok");
  } else {
    App.setStatus("st_path_bad", "warn");
    alert(App.t("msg_path_warn"));
  }
});

document.getElementById("btn-save").addEventListener("click", async () => {
  const root   = document.getElementById("txt-path").value.trim();
  const suffix = document.getElementById("txt-suffix").value;
  const choice = document.getElementById("cmb-steam").value;
  const r = await window.pywebview.api.save_config_data(root, suffix, choice);
  if (r.ok) {
    App.setStatus("st_saved", "success");
    App.updateStatusDisplay(null, null, r.launcher); // refresh steam row
    App.poll();
  } else {
    App.setStatus("st_save_fail", "danger");
    alert(App.t("msg_bad_path"));
  }
});

document.getElementById("btn-reset").addEventListener("click", async () => {
  await window.pywebview.api.reset_config_data();
  document.getElementById("txt-path").value   = "";
  document.getElementById("txt-suffix").value = "";
  document.getElementById("cmb-steam").value  = "STEAM_STORY";
  App.setStatus("st_cleared");
  App.updateStatusDisplay("Unknown", false, "Unknown");
});

document.getElementById("btn-update").addEventListener("click", async () => {
  App.setStatus("st_checking", "info");
  const r = await window.pywebview.api.check_update();

  if (!r.ok) {
    const code = r.error || "";
    if (code === "http_404") {
      App.setStatus("st_upd_err", "warn");
      alert(App.t("msg_no_release"));
    } else {
      App.setStatus("st_upd_err", "danger");
    }
    return;
  }

  if (!r.newer) {
    App.setUpdateBadge(false, "");
    App.setStatus("st_up_to_date", "success", { ver: r.current });
    alert(App.t("msg_up_to_date", { ver: r.current }));
    return;
  }

  App.setUpdateBadge(true, r.tag);
  App.setStatus("st_new_ver", "warn", { tag: r.tag });

  if (!r.download_url) {
    alert(App.t("msg_no_asset"));
    return;
  }

  App.showOverlay("overlay_dl");
  App.setStatus("st_downloading", "info");
  await window.pywebview.api.download_and_apply_update(r.download_url);
  // app exits itself after download
});

async function handleLaunch(mode) {
  const root   = document.getElementById("txt-path").value.trim();
  const suffix = document.getElementById("txt-suffix").value;
  const choice = document.getElementById("cmb-steam").value;

  App.showOverlay("overlay_close");
  const r = await window.pywebview.api.launch_mode(mode, root, suffix, choice);
  App.hideOverlay();

  if (!r.ok) {
    switch (r.error) {
      case "bad_path":
        App.setStatus("st_path_invalid", "danger");
        alert(App.t("msg_bad_path"));
        break;
      case "already_solo":
        App.setStatus("st_same_mode");
        alert(App.t("msg_already_solo"));
        break;
      case "already_public":
        App.setStatus("st_same_mode");
        alert(App.t("msg_already_pub"));
        break;
      case "unknown_launcher":
        App.setStatus("st_launch_err", "danger");
        alert(App.t("msg_unknown_lnch"));
        break;
      default:
        App.setStatus("st_launch_err", "danger");
        alert(r.error || App.t("st_launch_err"));
    }
    return;
  }

  if (r.action === "epic_manual") {
    App.setStatus(mode === "Solo" ? "st_solo_ok" : "st_pub_ok", "success");
    alert(App.t(mode === "Solo" ? "msg_epic_solo" : "msg_epic_pub"));
  } else {
    App.setStatus(mode === "Solo" ? "st_solo_ok" : "st_pub_ok", "success");
  }

  setTimeout(() => App.poll(), 2000);
}

document.getElementById("btn-solo").addEventListener("click",   () => handleLaunch("Solo"));
document.getElementById("btn-public").addEventListener("click", () => handleLaunch("Public"));

// ── Initialise on pywebview ready ────────────────────────────
window.addEventListener("pywebviewready", async () => {
  const state = await window.pywebview.api.get_initial_state();

  document.getElementById("ver-badge").textContent  = "v" + state.version;
  document.getElementById("txt-path").value         = state.game_root;
  document.getElementById("txt-suffix").value       = state.suffix;

  // Select saved steam choice
  const cmb = document.getElementById("cmb-steam");
  const idx  = [...cmb.options].findIndex(o => o.value === state.choice);
  if (idx >= 0) cmb.selectedIndex = idx;

  // Restore saved language preference
  App.lang = localStorage.getItem("rdolobby_lang") || "AR";
  App.applyLanguage();
  App.updateStatusDisplay(state.mode, state.running, state.launcher);
  App.setStatus("st_loaded");
  App.startPolling();
  App.startUpdateTimer();

  // Silent background update check on startup
  App.silentUpdateCheck();
});
