import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:5000');
const maxBytes = 10 * 1024 * 1024;
const navy = Color(0xFF083A58);
const ocean = Color(0xFF087BA1);

void main() => runApp(const CoralSenseApp());

class CoralSenseApp extends StatelessWidget {
  const CoralSenseApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'Coral Sense',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: ocean),
      scaffoldBackgroundColor: const Color(0xFFF4FAFC),
      useMaterial3: true,
    ),
    home: const CoralHome(),
  );
}

class CoralHome extends StatefulWidget {
  const CoralHome({super.key});
  @override
  State<CoralHome> createState() => _CoralHomeState();
}

class _CoralHomeState extends State<CoralHome> {
  final picker = ImagePicker();
  XFile? selected;
  Map<String, dynamic>? result;
  String? error;
  bool busy = false;
  int tab = 0;

  Future<void> choose(ImageSource source) async {
    try {
      final file = await picker.pickImage(source: source);
      if (file == null) return;
      final bytes = await file.length();
      final extension = file.name.split('.').last.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp'].contains(extension)) {
        throw const FormatException('Select a JPG, PNG or WebP image.');
      }
      if (bytes > maxBytes) {
        throw const FormatException('Images must be smaller than 10 MB.');
      }
      setState(() { selected = file; result = null; error = null; tab = 1; });
    } catch (e) {
      if (mounted) setState(() => error = e is FormatException ? e.message : 'Could not select image: $e');
    }
  }

  Future<void> analyze() async {
    if (selected == null || busy) return;
    setState(() { busy = true; result = null; error = null; });
    try {
      final request = http.MultipartRequest('POST', Uri.parse('$apiUrl/predict'));
      request.files.add(await http.MultipartFile.fromPath('image', selected!.path));
      final streamed = await request.send().timeout(const Duration(seconds: 120));
      final response = await http.Response.fromStream(streamed);
      final decoded = jsonDecode(response.body);
      if (decoded is! Map<String, dynamic>) throw const FormatException('Unexpected API response.');
      if (response.statusCode != 200) throw Exception(decoded['error'] ?? 'Request failed: HTTP ${response.statusCode}');
      if (!mounted) return;
      setState(() => result = decoded);
    } catch (e) {
      if (mounted) setState(() => error = 'Analysis failed: $e');
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  Widget panel(Widget child) => Card(
    elevation: 0,
    color: Colors.white,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
    child: Padding(padding: const EdgeInsets.all(20), child: child),
  );

  Widget homePage() => ListView(
    padding: const EdgeInsets.all(20),
    children: [
      Container(
        padding: const EdgeInsets.all(26),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [navy, ocean]),
          borderRadius: BorderRadius.circular(28),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Icon(Icons.water, color: Colors.white, size: 42),
          const SizedBox(height: 18),
          const Text('AI reef intelligence', style: TextStyle(color: Color(0xFFC6EFFF))),
          const SizedBox(height: 10),
          const Text('CoralSense\nAI-Powered Reef Monitoring',
            style: TextStyle(color: Colors.white, fontSize: 28, height: 1.2, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          const Text('Capture or upload reef imagery to assess coral presence, condition and marine waste.',
            style: TextStyle(color: Colors.white, height: 1.5)),
          const SizedBox(height: 20),
          FilledButton.icon(onPressed: () => setState(() => tab = 1),
            icon: const Icon(Icons.camera_alt_outlined), label: const Text('Check Coral Health')),
        ]),
      ),
      const SizedBox(height: 16),
      panel(const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('How it works', style: TextStyle(fontSize: 21, fontWeight: FontWeight.bold)),
        SizedBox(height: 12),
        Text('1. Capture or select an underwater image.'),
        SizedBox(height: 8),
        Text('2. Send it securely to the Coral Sense analysis backend.'),
        SizedBox(height: 8),
        Text('3. Review coral presence, health classification and waste detections.'),
      ])),
    ],
  );

  Widget line(String label, String value) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 5),
    child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Expanded(flex: 2, child: Text(label, style: const TextStyle(fontWeight: FontWeight.w600))),
      Expanded(flex: 3, child: Text(value)),
    ]),
  );

  Widget results() {
    final presence = result?['presence'] as Map<String, dynamic>? ?? {};
    final coral = result?['coral'] as Map<String, dynamic>? ?? {};
    final waste = result?['waste'] as Map<String, dynamic>? ?? {};
    final status = (presence['status'] ?? 'unknown').toString();
    final condition = coral['analysed'] == true ? (coral['condition'] ?? 'Unknown').toString() : 'Not analysed';
    final isUncertain = status == 'uncertain';
    return panel(Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('Analysis results', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
      const SizedBox(height: 12),
      Chip(label: Text(isUncertain ? 'Coral presence uncertain' : status == 'not_coral' ? 'Not coral' : 'Coral detected'),
        backgroundColor: isUncertain ? const Color(0xFFFFEDCC) : status == 'coral' ? const Color(0xFFE1F4E8) : const Color(0xFFE8EDF1)),
      line('Presence probability', (presence['confidence_percent'] ?? '—').toString()),
      line('Condition', condition),
      if (coral['analysed'] == true) line('Condition confidence', (coral['confidence_percent'] ?? '—').toString()),
      const SizedBox(height: 8),
      Text((presence['message'] ?? '').toString()),
      const Divider(height: 28),
      const Text('Marine waste', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      Text(waste['detected'] == true ? 'Detected: ${waste['count'] ?? 0} object(s)' : 'No waste detected'),
      if (waste['summary'] is Map)
        ...((waste['summary'] as Map).entries.map((entry) => Text('${entry.key}: ${entry.value}'))),
      const SizedBox(height: 12),
      const Text('Model confidence is not a biological coral-health score.',
        style: TextStyle(fontSize: 12, color: Colors.black54)),
    ]));
  }

  Widget analysisPage() => ListView(
    padding: const EdgeInsets.all(20),
    children: [
      const Text('Check Coral Health', style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: navy)),
      const SizedBox(height: 6),
      const Text('Choose an image to analyse using the existing Coral Sense AI models.'),
      const SizedBox(height: 16),
      panel(Column(children: [
        if (selected != null) ...[
          ClipRRect(borderRadius: BorderRadius.circular(15),
            child: Image.file(File(selected!.path), height: 235, width: double.infinity, fit: BoxFit.cover)),
          const SizedBox(height: 14),
          Text(selected!.name, maxLines: 1, overflow: TextOverflow.ellipsis),
          const SizedBox(height: 14),
        ] else ...[
          const Icon(Icons.add_photo_alternate_outlined, size: 64, color: ocean),
          const Text('Choose a reef image'),
          const SizedBox(height: 12),
        ],
        Wrap(spacing: 10, runSpacing: 10, alignment: WrapAlignment.center, children: [
          OutlinedButton.icon(onPressed: busy ? null : () => choose(ImageSource.camera), icon: const Icon(Icons.camera_alt), label: const Text('Camera')),
          OutlinedButton.icon(onPressed: busy ? null : () => choose(ImageSource.gallery), icon: const Icon(Icons.photo_library), label: const Text('Gallery')),
        ]),
        const SizedBox(height: 14),
        SizedBox(width: double.infinity, child: FilledButton(
          onPressed: selected == null || busy ? null : analyze,
          child: Text(busy ? 'Analysing…' : 'Analyse Coral'),
        )),
        if (busy) const Padding(padding: EdgeInsets.all(14), child: LinearProgressIndicator()),
      ])),
      if (error != null) Padding(padding: const EdgeInsets.only(top: 12),
        child: panel(Text(error!, style: const TextStyle(color: Colors.redAccent)))),
      if (result != null) Padding(padding: const EdgeInsets.only(top: 12), child: results()),
    ],
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Coral Sense'), backgroundColor: const Color(0xFFF4FAFC)),
    body: tab == 0 ? homePage() : analysisPage(),
    bottomNavigationBar: NavigationBar(
      selectedIndex: tab,
      onDestinationSelected: (i) => setState(() => tab = i),
      destinations: const [
        NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
        NavigationDestination(icon: Icon(Icons.science_outlined), selectedIcon: Icon(Icons.science), label: 'Analyse'),
      ],
    ),
  );
}
