# RDOLobby

أداة لتشغيل ريد ديد اونلاين في لوبي خاص أو عام — تدعم ستيم وايبيك جيمز وروكستار.

---

## العربية

### ما هي؟

 أداة بسيطة تساعدك على تشغيل ريد ديد أونلاين في لوبي خاص "سولو"، أو الرجوع للوبي العام متى تريد. تكتشف مشغل اللعبه تلقائياً وتتعامل مع الإعدادات دون تدخل منك، وكذلك تقوم الأداة بإصلاح مشكلة كاشف المعادن

### المميزات

- لوبي خاص بضغطة زر
- يكتشف المشغّل تلقائياً (ستيم / ايبيك جيمز / روكستار)
- حل مشكلة كاشف المعادن
- يراقب حالة اللعبة في الوقت الفعلي
- يدعم العربية والإنجليزية
- تحديث تلقائي من GitHub
- مظهر داكن مع واجهة بسيطة

### المتطلبات

- ويندوز 10 أو 11
- لعبة ريد ديد على أي مشغل

### التشغيل

1. حمّل `RDOLobby.exe` من [Releases](../../releases/latest)
2. شغّل الأداة
3. أدخل مسار مجلد اللعبة في المرة الأولى فقط
4. اضغط **لوبي خاص** لتشغيل اللعبة في لوبي خاص

لا تحتاج لتثبيت Python أو أي شيء آخر.

### البناء من المصدر

```bash
pip install -r requirements.txt
pyinstaller RDOLobby.spec
```

الملف الناتج في مجلد `dist/`.

---

## English

### What is it?

RDOLobby is a small tool that lets you launch Red Dead Online into a solo lobby or return to a public one whenever you want. It auto-detects your launcher and handles everything behind the scenes.

### Features

- Solo lobby with one click
- Auto-detects your launcher (Steam / Epic Games / Rockstar)
- Automatically fixes the metal detector bug on every launch
- Watches game state in real time
- Arabic and English UI
- Auto-update from GitHub
- Dark theme, clean layout

### Requirements

- Windows 10 or 11
- Edge WebView2 (built into Windows 11; installed automatically on Windows 10 via system updates)
- Red Dead Redemption 2 (any launcher)

### Usage

1. Download `RDOLobby.exe` from [Releases](../../releases/latest)
2. Run it
3. Set your game folder path on the first launch
4. Hit **Solo Lobby** to start the game in a private session

No Python or anything else needed.

### Build from source

```bash
pip install -r requirements.txt
pyinstaller RDOLobby.spec
```

Output lands in `dist/`.

---

## Launchers

| Launcher | Status |
|---|---|
| Steam | ✓ |
| Epic Games | ✓ |
| Rockstar Games Launcher | ✓ |

---

## License

MIT
