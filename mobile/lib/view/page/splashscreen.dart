import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/view/page/login.dart';
import 'package:mobile/view/widget/loading.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Splash Art',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const Splashscreen(),
    );
  }
}

class Splashscreen extends StatelessWidget {
  const Splashscreen({super.key});

  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        // ignore: use_build_context_synchronously
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
      );
    });

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            SizedBox(
              width: 200,
              height: 200,
              child: Image(image: AssetImage("../../assets/icon.png")),
            ),
            Gap(20),
            const Text(
              'Present zie',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Gap(50),
            LoadingWidget()
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: EdgeInsets.all(20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              width: 35,
              height: 35,
              child: Image(image: AssetImage("../../assets/smakzie.png")),
            ),
            SizedBox(
              width: 10,
            ),
            Text(
              "SMKN 1 CIANJUR",
              style: TextStyle(fontSize: 16),
            )
          ],
        ),
      ),
    );
  }
}
