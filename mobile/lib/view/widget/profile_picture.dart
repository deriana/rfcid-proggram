import 'dart:io';
import 'package:flutter/material.dart';

class ProfilePictureWidget extends StatelessWidget {
  final String imagePath;

  ProfilePictureWidget({required this.imagePath});

  @override
  Widget build(BuildContext context) {
    File imageFile = File(imagePath); // Path ke file di luar assets

    return ClipOval(
      child: imageFile.existsSync()
          ? Image.file(
              imageFile,  // Menampilkan gambar dari path lokal
              height: 50,
              width: 50,
              fit: BoxFit.cover,
            )
          : Image.asset(
              'assets/default_profile.png', // Menampilkan default gambar jika tidak ada
              height: 50,
              width: 50,
              fit: BoxFit.cover,
            ),
    );
  }
}
