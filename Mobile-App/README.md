# Coral Sense — Flutter mobile prototype

Native Flutter interface for the existing Coral Sense Flask/YOLO backend. This folder contains Flutter source files, not the generated Android/iOS project scaffolding.

## Setup

1. Install Flutter and Android Studio or Xcode.
2. From the repository root, run:
   ```bash
   flutter create --platforms=android,ios Mobile-App
   cd Mobile-App
   flutter pub get
   ```
3. Start the existing backend from `Web-App/backend` as described in its README.
4. Run Flutter with the backend address:

   **Android emulator:**
   ```bash
   flutter run --dart-define=API_URL=http://10.0.2.2:5000
   ```

   **Physical Android phone (same Wi-Fi as backend host):**
   ```bash
   flutter run --dart-define=API_URL=http://YOUR_MAC_LAN_IP:5000
   ```

   **Deployed backend (recommended for distribution):**
   ```bash
   flutter run --dart-define=API_URL=https://YOUR-HTTPS-API
   ```

   **iOS Simulator:** use `http://127.0.0.1:5000` if the backend runs on the same Mac.

## Platform configuration

- Android requires `<uses-permission android:name="android.permission.INTERNET"/>` in `android/app/src/main/AndroidManifest.xml`. Add camera permission when using the camera.
- For development against an HTTP local API, Android 9+ blocks cleartext by default; prefer HTTPS, or enable cleartext **only** in a development Android manifest.
- iOS requires `NSCameraUsageDescription` and `NSPhotoLibraryUsageDescription` entries in `ios/Runner/Info.plist`. For HTTP local development, use a narrowly scoped ATS exception; use HTTPS for production.
- Camera/gallery functionality needs physical-device and simulator permission testing.
- The backend expects `POST /predict` multipart form data with a file field named `image`, under 10 MB; accepted types are JPG, PNG and WebP.
- The existing API returns `presence`, `coral` and `waste`. The app deliberately distinguishes **uncertain** and **not_coral** from confirmed coral classifications.
- The application needs network access for inference. Offline image queue, history and report export are future milestones.

## Current scope

Prototype includes home screen, camera/gallery picker, upload validation, loading and errors, and coral/waste result summaries. It has not yet been built or run in this environment; test on real devices before providing a demo link.
