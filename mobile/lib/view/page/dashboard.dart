import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:intl/intl.dart';
import 'package:mobile/view/page/history_item.dart';
import 'package:mobile/view/widget/absent.dart';
import 'package:mobile/view/widget/navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  Future<Map<String, String?>> _getUserInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    String? name = prefs.getString('name');
    String? username = prefs.getString('username');
    String? image = prefs.getString('image');

    return {
      'name': name,
      'username': username,
      'image': image,
    };
  }

  @override
  Widget build(BuildContext context) {
    DateTime now = DateTime.now();
    String currentTimeOfDay = now.hour >= 18 ? 'Malam' : 'Pagi';
    String formattedDate = DateFormat('d').format(now);
    String formattedMonth = DateFormat('MMM').format(now);
    String formattedYear = DateFormat('yyyy').format(now);

    return Scaffold(
      backgroundColor: Colors.white,
      body: ListView(
        padding: EdgeInsets.zero,
        children: [
          Stack(
            children: [
              Container(
                height: 250,
                width: double.infinity,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('../../assets/dashboard_bg.png'),
                    fit: BoxFit.cover,
                    alignment: Alignment.center,
                  ),
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(30),
                    bottomRight: Radius.circular(30),
                  ),
                ),
              ),
            ],
          ),
          Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: FutureBuilder<Map<String, String?>>(
              future: _getUserInfo(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.done) {
                  Map<String, String?> user = snapshot.data ?? {};

                  String name = user['name'] ?? 'Nama';
                  String image = user['image'] ?? 'pf.jpg';

                  return Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            currentTimeOfDay == 'Pagi'
                                ? "Selamat Pagi!"
                                : "Selamat Malam!",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                          Text(
                            name,
                            style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[400]),
                          ),
                        ],
                      ),
                      Spacer(),
                      ClipOval(
                        child: Image.asset(
                          "../../assets/$image", // Gambar profil jika ada
                          height: 50,
                          width: 50,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ],
                  );
                }
                // Jika data belum diambil, tampilkan elemen default (misal, gambar default)
                return Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          "Selamat Pagi!",
                          style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.black),
                        ),
                        Text(
                          "Nama",
                          style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w400,
                              color: Colors.grey[400]),
                        ),
                      ],
                    ),
                    Spacer(),
                    ClipOval(
                      child: Image.asset(
                        "../../assets/pf.jpg",
                        height: 50,
                        width: 50,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
          Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: currentTimeOfDay == 'Pagi'
                    ? Colors.orange
                    : Colors.blueGrey, // Ubah warna sesuai waktu
                borderRadius: BorderRadius.circular(15),
                boxShadow: [
                  BoxShadow(
                    color: const Color.fromARGB(99, 0, 0, 0),
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Hari ini, ${DateFormat('EEEE').format(now)}.',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Icon(
                        currentTimeOfDay == 'Pagi'
                            ? Icons.wb_sunny
                            : Icons.nightlight_round,
                        color: currentTimeOfDay == 'Pagi'
                            ? Colors.yellow
                            : Colors.white,
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildDateInfo('DATE', formattedDate),
                      _buildDateInfo('MONTH', formattedMonth),
                      _buildDateInfo('YEAR', formattedYear),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Gap(20),
          Absent(),
          Gap(20),
          Text("30 Hari Terakhir",
              textAlign: TextAlign.center,
              style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 20)),
          Gap(20),
          HistoryItem(),
        ],
      ),
      bottomNavigationBar: const Navbar(selectedIndex: 0),
    );
  }

  Widget _buildDateInfo(String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 14,
          ),
        ),
        Gap(5),
        SizedBox(
          width: 60,
          height: 20,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8.0),
            ),
            child: Center(
              child: Text(
                value,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 12,
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}
