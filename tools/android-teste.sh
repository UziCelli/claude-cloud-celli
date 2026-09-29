#!/usr/bin/env bash
# Roda dentro do emulador (.github/workflows/android.yml): instala o APK, abre o app e tira prints.
set -x
adb install -r forca.apk
# Chrome sem as telas de boas-vindas (só no emulador).
adb shell am set-debug-app --persistent com.android.chrome
adb shell "echo 'chrome --disable-fre --no-default-browser-check --no-first-run' > /data/local/tmp/chrome-command-line"
adb shell monkey -p br.com.victorcelli.forca -c android.intent.category.LAUNCHER 1
sleep 30
mkdir -p docs/android
adb exec-out screencap -p > docs/android/1-abrindo.png
sleep 20
adb exec-out screencap -p > docs/android/2-app.png
adb shell dumpsys activity activities | grep -E "ResumedActivity" || true
