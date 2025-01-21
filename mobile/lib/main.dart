import 'package:flutter/material.dart';
import 'package:mobile/view/page/splashscreen.dart';
import 'package:mobile/view/page/test.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: Splashscreen());
  }
}
