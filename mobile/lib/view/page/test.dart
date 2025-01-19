import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:gap/gap.dart';

class DetailFood extends StatelessWidget {
  const DetailFood({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children: [
            Positioned(
              top: -320, 
              left: 0,
              right: 0,
              child: Image.asset(
                '../../assets/dashboard_bg.png',
                width: double.infinity, 
                height: 1000, 
              ),
            ),
            Positioned(
              bottom:
                  0, // Menurunkan container ke bawah sehingga sedikit menutupi gambar
              left: 0,
              right: 0,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(24),
                child: Container(
                  color: Colors.white,
                  height: 600, // Menetapkan tinggi dari kontainer utama
                  child: Padding(
                    padding: const EdgeInsets.all(
                        34), // Menambahkan padding di sekitar konten
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Food Title',
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    'Rp. 5.0000,00',
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                              const Gap(5),
                              const Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Icon(Icons.star,
                                      color: Color.fromARGB(255, 255, 153, 0)),
                                  Gap(9),
                                  Text('4,7', style: TextStyle(fontSize: 16))
                                ],
                              ),
                              const Gap(50),
                              const Text(
                                'Keterangan',
                                style: TextStyle(
                                    fontSize: 18,
                                    color: Color.fromARGB(255, 39, 39, 39),
                                    fontWeight: FontWeight.bold),
                              ),
                              const Gap(10),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(const DetailFood());
}
