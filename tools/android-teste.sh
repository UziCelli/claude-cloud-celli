#!/usr/bin/env bash
# Roda dentro do emulador (.github/workflows/android.yml): instala o APK, abre o app e tira prints.
set -x
adb install -r forca.apk
# Chrome sem as telas de boas-vindas (só no emulador).
adb shell am set-debug-app --persistent com.android.chrome
adb shell "echo 'chrome --disable-fre --no-default-browser-check --no-first-run' > /data/local/tmp/chrome-command-line"
adb logcat -c
adb shell monkey -p br.com.victorcelli.forca -c android.intent.category.LAUNCHER 1
mkdir -p docs/android
for n in 1 2 3 4; do
  sleep 15
  adb exec-out screencap -p > docs/android/$n.png
  adb shell dumpsys activity activities | grep -m1 -E "ResumedActivity" || true
done
adb logcat -d -b crash | tail -40
adb logcat -d | grep -iE "ActivityManager: (Process|Killing)|lowmemorykiller|FATAL" | tail -20
