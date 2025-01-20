import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:d_info/d_info.dart';
import 'package:lottie/lottie.dart';
import 'package:mobile/view/page/dashboard.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isPasswordVisible = false; // State untuk kontrol visibilitas password
  String _errorMessage = ''; // Menambahkan pesan error ke UI

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    final String email = _emailController.text;
    final String password = _passwordController.text;

    if (email == "test@gmail.com" && password == "test") {
      DInfo.snackBarSuccess(context, "Login Berhasil!");
      Future.delayed(const Duration(seconds: 1), () {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
        );
      });
    } else {
      setState(() {
        _errorMessage = 'Email atau password salah.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(40.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Lottie.asset('../../assets/lottie/hi.json',
                      width: 300, height: 300),
                ),
                const Gap(16),
                const Text(
                  'Selamat Datang!',
                  style: TextStyle(
                    fontSize: 26,
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Gap(12),
                const Text(
                  'Hadir tepat waktu jadi lebih mudah dan otomatis, Ingat! Kehadiranmu sangat penting.',
                  style: TextStyle(
                    fontSize: 17,
                    color: Color.fromARGB(255, 66, 66, 66),
                  ),
                ),
                const Gap(30),
                MyTextField(
                  hintText: "Email",
                  icon: Icons.email_outlined,
                  hide: false,
                  controller: _emailController,
                ),
                const Gap(16),
                PasswordTextField(
                  hintText: "Password",
                  controller: _passwordController,
                  isVisible: _isPasswordVisible,
                  onToggleVisibility: () {
                    setState(() {
                      _isPasswordVisible = !_isPasswordVisible;
                    });
                  },
                ),
                if (_errorMessage.isNotEmpty) ...[
                  const Gap(8),
                  Text(
                    _errorMessage,
                    style: const TextStyle(
                      color: Colors.red,
                      fontSize: 14.0,
                    ),
                  ),
                ],
                const Gap(24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleLogin,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF26A37),
                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                    ),
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class PasswordTextField extends StatelessWidget {
  final String hintText;
  final TextEditingController controller;
  final bool isVisible;
  final VoidCallback onToggleVisibility;

  const PasswordTextField({
    super.key,
    required this.hintText,
    required this.controller,
    required this.isVisible,
    required this.onToggleVisibility,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 80,
      child: TextField(
        controller: controller,
        obscureText: !isVisible,
        decoration: InputDecoration(
          hintText: hintText,
          filled: false,
          fillColor: Colors.transparent,
          suffixIcon: IconButton(
            icon: Icon(
              isVisible ? Icons.visibility : Icons.visibility_off,
            ),
            onPressed: onToggleVisibility,
          ),
          prefixIcon: const Icon(
            Icons.lock_outline,
            color: Color.fromARGB(255, 158, 158, 158),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(
              color: Color.fromARGB(255, 148, 148, 148),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.grey, width: 2),
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );
  }
}

class MyTextField extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final bool hide;
  final TextEditingController controller;

  const MyTextField({
    super.key,
    required this.hintText,
    required this.icon,
    required this.hide,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: hide,
      decoration: InputDecoration(
        hintText: hintText,
        filled: false,
        fillColor: Colors.transparent,
        prefixIcon: Icon(icon, color: Colors.grey),
        enabledBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.grey, width: 1),
          borderRadius: BorderRadius.circular(8),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.grey, width: 2),
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }
}

void main() {
  runApp(const MaterialApp(home: LoginPage()));
}
